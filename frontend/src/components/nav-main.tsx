import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router"
import { cn } from "@/lib/utils"
import { Lock } from "lucide-react"

export function NavMain({
  items,
  activeModule,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    key: string
    locked?: boolean
  }[]
  activeModule: string
}) {

  const navigate = useNavigate();
  const handleClickButton = (key: string) => {
    navigate(items.find(item => item.key === key)?.url ?? '/dashboard');
  }


  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton 
                tooltip={item.title} 
                onClick={() => handleClickButton(item.key)} 
                disabled={item.locked}
                // isActive={activeModule === item.key}
                className={cn(activeModule === item.key && 'bg-foreground text-background hover:bg-foreground hover:text-background')}
              >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.locked && <span className="text-xs text-muted-foreground">(coming soon)</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
