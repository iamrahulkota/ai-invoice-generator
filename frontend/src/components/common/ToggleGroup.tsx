import * as React from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { LayoutGrid, TableOfContents } from "lucide-react"
import { cn } from "@/lib/utils"

const defaultButtons = [
  { key: "grid", icon: <LayoutGrid className="h-4 w-4" /> },
  { key: "list", icon: <TableOfContents className="h-4 w-4" /> },
]

interface ToggleGroupProps {
  alignment: string
  handleAlignment: (value: string) => void
  buttons?: {
    key: string
    icon: React.ReactNode
  }[]
}

export default function ViewToggleGroup({
  alignment,
  handleAlignment,
  buttons = defaultButtons,
}: ToggleGroupProps) {
  return (
    <ToggleGroup
      type="single"
      value={alignment}
      onValueChange={(value) => {
        if (value) handleAlignment(value)
      }}
      className="bg-background rounded-lg p-1"
    >
      {buttons.map((button, index) => (
        <ToggleGroupItem
          key={button.key}
          value={button.key}
          className={cn(
            "h-8 w-8",
            index === 0 && "rounded-l-lg",
            index === buttons.length - 1 && "rounded-r-lg"
          )}
        >
          {button.icon}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}