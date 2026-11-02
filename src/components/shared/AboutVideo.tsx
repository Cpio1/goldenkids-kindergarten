"use client";

import type { GalleryVideo } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";

/**
 * The «About» video (public/images/main-page2.*): native controls, starts only when the visitor presses play,
 * loads metadata only. Shown whole (object-contain) and never taller than the screen allows.
 */
export function AboutVideo({ video, className, compact = false }: { video: GalleryVideo; className?: string; compact?: boolean }) {
  const { t } = useLanguage();
  return (
    <div className={cn("about-video photo-ring relative", className)}>
      <video
        className={cn("about-video__el", compact && "about-video__el--compact")}
        controls
        playsInline
        preload="metadata"
        poster={video.poster ?? undefined}
        aria-label={t.about.videoLabel}
      >
        {/* without a poster, #t=0.1 lets the browser show a real frame of the video as the preview */}
        <source src={video.poster ? video.src : `${video.src}#t=0.1`} type={video.type} />
      </video>
    </div>
  );
}
