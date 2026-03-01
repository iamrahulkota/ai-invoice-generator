import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
export default function MenuComp({
  item,
  menuOptions,
  disableMenu,
}: {
  item: any;
  menuOptions: {
    label: string;
    icon: string;
    onClick: (item: any) => void;
    className?: string;
    disable?: boolean;
  }[];
  disableMenu?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = (option: any, e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (option?.disable) return;
    option.onClick(item);
    setIsOpen(false);
  };

  const isDisabled = () => {
    if (disableMenu) return true;
    return menuOptions.every((option) => option.disable);
  };

  if (!menuOptions || menuOptions.length === 0) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild disabled={isDisabled()}>
        <EllipsisVertical className={cn("h-4 w-4")} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        {menuOptions.map((option: any) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.label}
              onClick={(e) => handleOnClick(option, e)}
              className={cn(
                "cursor-pointer",
                option.className,
                option?.disable && "cursor-not-allowed opacity-50",
              )}
              id={`menu-item-${item?.id}-${option?.id}`}
            >
              <Icon className="mr-0.5 h-4 w-4" />
              {option.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
