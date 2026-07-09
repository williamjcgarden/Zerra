import { Phone } from "lucide-react";
import { SITE } from "../site";

export function MobileCallBar() {
  return (
    <a
      href={SITE.phoneHref}
      className="lg:hidden fixed bottom-4 left-4 right-4 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-4 text-base font-semibold text-brand-foreground shadow-elegant ring-1 ring-black/5"
    >
      <Phone className="h-5 w-5" strokeWidth={2.5} />
      Call {SITE.phoneDisplay}
    </a>
  );
}
