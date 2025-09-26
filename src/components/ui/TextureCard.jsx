import React from "react";
import { cn } from "@/lib/utils";

// A highly-styled, nested-border card with gradient background and glass-friendly borders
export const TextureCardStyled = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // outer frame
        "rounded-[24px] border border-white/60 dark:border-stone-950/60",
        // gradient background (light/dark)
        "bg-gradient-to-b from-neutral-100 to-white/70 dark:from-neutral-800 dark:to-neutral-900",
        className
      )}
      {...props}
    >
      {/* Nested structure for aesthetic borders */}
      <div className="rounded-[23px] border border-black/10 dark:border-neutral-900/80">
        <div className="rounded-[22px] border border-white/50 dark:border-neutral-950">
          <div className="rounded-[21px] border border-neutral-950/20 dark:border-neutral-900/70">
            {/* Inner content wrapper */}
            <div className="w-full rounded-[20px] border border-white/50 text-neutral-500 dark:border-neutral-700/50">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);
TextureCardStyled.displayName = "TextureCardStyled";

// Theme-aware variant that uses CSS radius token with a fallback and glasscn color aliases when available
export const TextureCard = React.forwardRef(
  ({ className, children, variant = "texture", ...props }, ref) => {
    if (variant === "glass") {
      // Glassmorphic variant: subtle translucent layers with backdrop blur
      return (
        <div
          ref={ref}
          className={cn(
            // radius using token; default is set in :root
            "rounded-[calc(var(--radius))]",
            // outer frame: light translucent border and background with blur
            "border border-white/20 dark:border-white/10 bg-white/10 dark:bg-neutral-900/20 backdrop-blur-xl backdrop-saturate-150",
            // soft shadow for lift
            "shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
            className
          )}
          {...props}
        >
          <div className="rounded-[calc(var(--radius)-1px)] border border-white/15 dark:border-white/5">
            <div className="rounded-[calc(var(--radius)-2px)] border border-white/10 dark:border-white/5">
              <div className="rounded-[calc(var(--radius)-3px)] border border-white/10">
                <div
                  className={cn(
                    // inner surface: subtle gradient and an extra inner border to catch light
                    "w-full rounded-[calc(var(--radius)-4px)] border border-white/15",
                    // gradient tuned for light/dark glass
                    "bg-gradient-to-b from-white/10 to-white/5 dark:from-white/5 dark:to-white/[0.03]",
                    // readable default text color in both themes
                    "text-neutral-800 dark:text-neutral-200"
                  )}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default textured variant
    return (
      <div
        ref={ref}
        className={cn(
          // fallback radius and border
          "rounded-lg border border-white/60 dark:border-neutral-800/30",
          // prefer design token radius if present
          "rounded-[calc(var(--radius))]",
          className
        )}
        {...props}
      >
        <div className="rounded-[calc(var(--radius)-1px)] border border-black/10 dark:border-neutral-900/80">
          <div className="rounded-[calc(var(--radius)-2px)] border border-white/50 dark:border-neutral-950">
            <div className="rounded-[calc(var(--radius)-3px)] border border-neutral-950/20 dark:border-neutral-900/70">
              <div className="w-full rounded-[calc(var(--radius)-4px)] border border-white/50 bg-gradient-to-b from-[var(--card)] to-[var(--secondary)] text-neutral-500 dark:border-neutral-700/50">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
TextureCard.displayName = "TextureCard";

export const TextureCardHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("first:pt-6 last:pb-6", className)}
      {...props}
    />
  )
);
TextureCardHeader.displayName = "TextureCardHeader";

export const TextureCardTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "pl-2 text-lg font-semibold leading-tight text-neutral-900 dark:text-neutral-100",
        className
      )}
      {...props}
    />
  )
);
TextureCardTitle.displayName = "TextureCardTitle";

export const TextureCardDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "pl-2 text-sm text-neutral-600 dark:text-neutral-400",
        className
      )}
      {...props}
    />
  )
);
TextureCardDescription.displayName = "TextureCardDescription";

export const TextureCardContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
  )
);
TextureCardContent.displayName = "TextureCardContent";

export const TextureCardFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-2 px-6 py-4",
        className
      )}
      {...props}
    />
  )
);
TextureCardFooter.displayName = "TextureCardFooter";

export const TextureSeparator = () => (
  <div className="relative h-0">
    <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-50 dark:bg-neutral-950" />
    <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-300/50 dark:bg-neutral-700/50" />
  </div>
);

export default TextureCard;
