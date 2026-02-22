import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"

type HeroSectionProps = {
  className?: string
  heroImage: string
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: string
  showGradientImage?: boolean
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      heroImage,
      title = "AI-Powered Invoicing, Made Effortless",
      subtitle = {
        regular: "AI-Powered Invoicing, ",
        gradient: "Made Effortless",
      },
      description = "Let our AI create invoices from simple text, generate payment reminders, and provide smart insights to help you manage your finances.",
      showGradientImage = true,
    },
    ref
  ) => {
    return (
      <section
        className={cn(
          "relative w-full overflow-hidden bg-dashed px-4 py-16  sm:px-16 sm:py-24 md:py-32 lg:py-40", //min-h-screen
          className
        )}
        ref={ref}
      >
        {showGradientImage && (
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute inset-0 -z-10 h-full w-full"
          initial={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <img
            alt="Hero Background"
            className="pointer-events-none absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 select-none opacity-70 dark:opacity-100"
            src={heroImage}
          />
        </motion.div>
        )}

        <div className="mx-auto flex flex-col items-center justify-center gap-8">
          <Badge variant="outline">
            <Link to={`/`} className="flex items-center gap-1 px-2 py-0.5 group">
              <span>{title}</span>
              <ChevronRight className="size-4 transition-transform group-hover:-rotate-12" />
            </Link>
          </Badge>

          <div className="flex flex-col gap-4">
            <h1 className="max-w-3xl text-center font-regular text-5xl tracking-tight md:text-7xl">
              {subtitle.regular}
              <br />
              {subtitle.gradient}
            </h1>
            <p className="max-w-2xl text-center text-lg text-muted-foreground tracking-tight leading-relaxed md:text-xl">
              {description}
            </p>
          </div>

          <div className="flex flex-row gap-3">
            <Button
              asChild
              className="group gap-2 bg-muted/70 shadow-none"
              variant="outline"
            >
              <Link to="/contact">
                Get in touch
                <Mail className="size-4 transition-transform group-hover:-rotate-12" />
              </Link>
            </Button>

            <Button asChild className="group gap-2">
              <Link to={"/"}>
                Sign up
                <ChevronRight className="size-4 transition-transform group-hover:-rotate-12" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }
)

HeroSection.displayName = "HeroSection"

export { HeroSection }