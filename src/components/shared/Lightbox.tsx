"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { itemNumbers, useItemLabel } from "./GalleryTile";
import { useScrollLock } from "./hooks";

/**
 * Full-size viewer for photos and videos.
 * - Escape / × to close, ← → and swipe to switch; focus trapped inside and returned on close.
 * - Photos and videos are shown whole (object-contain), limited to the screen height.
 * - Videos never autoplay; they stop when the viewer closes or switches to another item.
 */
export function Lightbox({
  items,
  index,
  onChange,
  onClose,
}: {
  items: GalleryItem[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const label = useItemLabel();
  const numbers = useMemo(() => itemNumbers(items), [items]);
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const total = items.length;

  useScrollLock(open);

  // remember the opener, move focus in; give it back on close
  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      const el = returnTo.current;
      if (el && document.contains(el)) el.focus({ preventScroll: true });
    };
  }, [open]);

  // stop the video when switching items or closing (the element is also unmounted)
  useEffect(() => {
    const video = videoRef.current;
    // a detached element could otherwise keep playing sound in some browsers
    return () => video?.pause();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      // arrows inside the video controls seek the video instead of switching items
      const inVideo = document.activeElement instanceof HTMLVideoElement;
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight" && total > 1 && !inVideo) {
        onChange((index + 1) % total);
      } else if (event.key === "ArrowLeft" && total > 1 && !inVideo) {
        onChange((index - 1 + total) % total);
      } else if (event.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button, video");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (!dialogRef.current?.contains(document.activeElement)) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, total, onChange, onClose]);

  if (index === null || !items[index]) return null;
  const item = items[index];
  const prev = () => onChange((index - 1 + total) % total);
  const next = () => onChange((index + 1) % total);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.dialog}
      className="lightbox"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onTouchStart={(event) => (touchX.current = event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchX.current === null || total < 2) return;
        const dx = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
      }}
    >
      <div className="lightbox__top">
        <p className="lightbox__counter" aria-live="polite">
          {t.gallery.counter(index + 1, total)}
        </p>
        <button ref={closeRef} type="button" className="lightbox__btn" onClick={onClose} aria-label={t.gallery.close}>
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div className="lightbox__stage" onClick={(event) => event.target === event.currentTarget && onClose()}>
        {item.kind === "image" ? (
          <div className="relative h-full w-full">
            <Image key={item.src} src={item.src} alt={label(item, numbers[index])} fill sizes="100vw" className="object-contain" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center" onClick={(event) => event.target === event.currentTarget && onClose()}>
            <video
              key={item.src}
              ref={videoRef}
              className="lightbox__video"
              controls
              playsInline
              preload="metadata"
              poster={item.poster ?? undefined}
              aria-label={label(item, numbers[index])}
            >
              <source src={item.poster ? item.src : `${item.src}#t=0.1`} type={item.type} />
            </video>
          </div>
        )}
      </div>

      {total > 1 && (
        <div className="lightbox__nav">
          <button type="button" className="lightbox__btn" onClick={prev} aria-label={t.gallery.prev}>
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
          <button type="button" className="lightbox__btn" onClick={next} aria-label={t.gallery.next}>
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>,
    document.body,
  );
}
