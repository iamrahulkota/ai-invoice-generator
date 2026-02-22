import { memo } from "react";
import { Button } from "@/components/ui/button"
import { NavLink } from "./NavLink";
import { Heart } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/common/animated-theme-toggler";
import { useNavigate } from "react-router";

export interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: 'Documentation',
    href: '/dashboard',
  },
  {
    label: 'Newsletters',
    href: '/newsletters',
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const handleLoginButton = () => {
    navigate('/login');
  };


  return (
    <div className="w-full container-home sticky top-0 z-50 py-2.5 px-4 md:px-6 lg:px-8 bg-background">
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center gap-6">
          <Heart className="size-6" />
          <nav className="flex items-center justify-center gap-2 md:gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                label={item.label}
              />
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
            <AnimatedThemeToggler duration={600} />
            <Button variant="default" size="sm" onClick={handleLoginButton}>
              Login
            </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(Navbar);
