"use client"

import HomeBriefingPage from "@/components/pages/home-briefing"

interface HomeModuleProps {
  onNavigate?: (page: string) => void
}

export default function HomeModule({ onNavigate }: HomeModuleProps) {
  return <HomeBriefingPage onNavigate={onNavigate} />
}
