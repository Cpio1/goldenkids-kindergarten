"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryVideo } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";

/**
 * The «About» video (public/images/main-page2.*): native controls, starts only when the visitor presses play.
 * - Shown whole (object-contain) at its real proportions and never taller than the screen allows.
 * - The <video> element is created only when the section approaches the viewport, so nothing is downloaded
 *   on page load; even then only metadata and the preview frame are fetched (`preload="metadata"`).
 * - The box is sized from the file's dimensions (read at build time), so the page doesn't jump.
 */
export function AboutVideo({ video, className, compact = false }: { video: GalleryVideo; className?: string; compact?: boolean }) {
  const { t } = useLanguage();
  const boxRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ratio = video.width && video.height ? video.width / video.height : 16 / 9;
  // width = the largest that keeps both the column width and the height limit (--video-max-h)
  const size: React.CSSProperties = { aspectRatio: ratio, width: `min(100%, calc(var(--video-max-h) * ${ratio.toFixed(4)}))` };

  return (
    <div className={cn("about-video photo-ring relative", compact && "about-video--compact", className)}>
      <div ref={boxRef} className="about-video__box" style={size}>
        {near && (
          <video
            className="about-video__el"
            controls
            playsInline
            preload="metadata"
            poster={video.poster ?? undefined}
            aria-label={t.about.videoLabel}
          >
            {/* without a poster, #t=0.1 lets the browser show a real frame of the video as the preview */}
            <source src={video.poster ? video.src : `${video.src}#t=0.1`} type={video.type} />
          </video>
        )}
      </div>
    </div>
  );
}
