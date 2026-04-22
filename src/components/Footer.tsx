import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-4 relative z-10">
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Zerra Studios. All rights reserved.
        </p>

        <a
          href="https://instagram.com/zerrastudios"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Instagram className="w-4 h-4" />
          Instagram
        </a>

        <div className="flex gap-6 items-center">
          <a href="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
