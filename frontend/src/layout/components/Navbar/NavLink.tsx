import { Link } from "react-router";
import { cn } from "@/lib/utils"

export interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  activeClassName?: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const NavLink = ({ 
  href, 
  label, 
  className,
  activeClassName,
  isActive = false,
}: NavLinkProps) => {
  return (
    <Link
      className={cn(
        "transition-all duration-300 ease-in-out text-muted-foreground hover:text-foreground text-sm font-medium",
        isActive && "text-foreground",
        activeClassName,
        className
      )}
      to={href}
    >
      {label}
    </Link>
  );
};

