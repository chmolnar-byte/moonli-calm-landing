import { Moon, Apple, Play } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Moon className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            MOONLI
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Apple className="w-4 h-4" />
            App Store
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Play className="w-4 h-4" />
            Google Play
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
