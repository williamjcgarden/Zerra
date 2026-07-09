import {
  Wrench, Flame, HardHat, Hammer, Search, Waves, Video, Droplets,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Wrench, Flame, HardHat, Hammer, Search, Waves, Video, PipetteIcon: Droplets,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Wrench;
  return <Icon className={className} strokeWidth={1.8} />;
}