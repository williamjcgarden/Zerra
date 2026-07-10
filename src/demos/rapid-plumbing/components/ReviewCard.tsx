import { Star } from "lucide-react";

export function ReviewCard({ name, source, quote }: { name: string; source: string; quote: string }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-surface p-6 shadow-card ring-1 ring-border">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-2">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div className="font-display text-sm font-semibold text-ink">{name}</div>
        <div className="text-xs text-muted-foreground">{source}</div>
      </figcaption>
    </figure>
  );
}
