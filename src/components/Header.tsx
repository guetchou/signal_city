import { MapPin, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import UserGuide from "./UserGuide";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MenuContent = () => (
    <div className="flex flex-col space-y-4">
      <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
        Mon profil
      </Link>
      <Button className="w-full">
        Signaler un incident
      </Button>
    </div>
  );

  return (
    <header className="bg-primary py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-white" />
          <h1 className="text-xl font-bold text-white">SignalCity</h1>
        </Link>
        
        {isMobile ? (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <MenuContent />
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-4">
            <UserGuide />
            <ThemeToggle />
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="text-white">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button className="bg-secondary hover:bg-secondary/90 text-white">
              Signaler un incident
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}