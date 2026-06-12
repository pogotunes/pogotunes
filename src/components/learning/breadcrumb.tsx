"use client"

import { Fragment } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-media-query"

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const isMobile = useIsMobile()
  const displayItems = isMobile ? items.slice(-2) : items

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center gap-1.5 text-sm font-nunito",
        "overflow-x-auto scrollbar-hide",
        className
      )}
      aria-label="Breadcrumb"
    >
      {isMobile && items.length > 2 && (
        <span className="text-white/40 px-1">...</span>
      )}

      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1

        return (
          <Fragment key={item.label}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5",
                    "text-white/50 hover:text-white transition-colors duration-200",
                    "truncate max-w-[200px]"
                  )}
                >
                  {item.icon ? (
                    <span className="shrink-0">{item.icon}</span>
                  ) : index === 0 ? (
                    <Home className="w-4 h-4 shrink-0" />
                  ) : null}
                  <span className="truncate">{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    "flex items-center gap-1.5 text-white font-semibold",
                    "truncate max-w-[200px]"
                  )}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span className="truncate">{item.label}</span>
                </span>
              )}
            </motion.div>

            {!isLast && (
              <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />
            )}
          </Fragment>
        )
      })}
    </motion.nav>
  )
}
