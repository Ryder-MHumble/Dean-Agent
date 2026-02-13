"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Construction } from "lucide-react"

interface PlaceholderPageProps {
  moduleName: string
  pageName: string
  description?: string
}

export default function PlaceholderPage({
  moduleName,
  pageName,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="shadow-card max-w-md w-full">
        <CardContent className="p-8 text-center space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 mx-auto">
            <Construction className="h-7 w-7 text-blue-500" />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              {moduleName}
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              {pageName}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            开发中，敬请期待
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
