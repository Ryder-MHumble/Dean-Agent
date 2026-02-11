"use client"

import { useEffect, useRef, useState } from "react"
import { useMotionValue, useSpring, useInView } from "framer-motion"

interface UseAnimatedNumberOptions {
  duration?: number
  delay?: number
  decimals?: number
}

export function useAnimatedNumber(
  target: number,
  options: UseAnimatedNumberOptions = {}
) {
  const { duration = 1.2, delay = 0, decimals = 0 } = options
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })
  const [display, setDisplay] = useState("0")

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    stiffness: 80,
    damping: 20,
    duration: duration * 1000,
  })

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(target)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, target, motionValue, delay])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(latest.toFixed(decimals))
    })
    return unsubscribe
  }, [springValue, decimals])

  return { ref, display, isInView }
}
