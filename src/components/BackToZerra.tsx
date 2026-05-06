import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackToZerra = () => (
  <Link
    to="/our-work"
    aria-label="Back to Zerra"
    className="group fixed left-4 top-4 z-[9999] flex h-11 w-11 items-center overflow-hidden rounded-full border border-white/10 bg-black/75 text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-[width,background-color,border-color] duration-200 ease-out hover:w-[8.25rem] hover:border-white/20 hover:bg-black/90 focus-visible:w-[8.25rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
  >
    <span className="flex h-11 w-11 shrink-0 items-center justify-center">
      <ArrowLeft size={17} strokeWidth={2.4} />
    </span>
    <span className="whitespace-nowrap pr-4 text-xl font-bold tracking-tight opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
      ZERRA<span className="text-gradient-gold">.</span>
    </span>
  </Link>
);

export default BackToZerra;
