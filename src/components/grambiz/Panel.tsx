import type { ReactNode } from "react";

export function Panel({
  title,
  badge,
  children,
  className = "",
}: {
  title?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel-light rounded-2xl p-4 ${className}`}>
      {(title || badge) && (
        <div className="mb-3 flex items-center justify-between gap-2">
          {title && <h2 className="font-display text-[16px] tracking-wide text-sign">{title}</h2>}
          {badge}
        </div>
      )}
      {children}
    </section>
  );
}
