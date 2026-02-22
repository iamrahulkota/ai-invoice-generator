import { cn } from "@/lib/utils";
import React from "react";

interface SeparatorProps {
  className?: string;
}

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="container relative mx-auto">
        <div className={cn("border-border border-dashed sm:border-y")}>
          {children}
        </div>
      </div>
    </section>
  );
};

const Separator = ({ className }: SeparatorProps) => {
  return (
    <Section>
        <div className={cn("h-8 bg-dashed", className)} />
    </Section>
  );
};

Separator.displayName = "Separator";

export { Separator };
