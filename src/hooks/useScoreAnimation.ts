import { useEffect, useRef, useState } from 'react'

export function useScoreAnimation (score: number, totalQuestions: number) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const progressRef = useRef<SVGPathElement>(null)

  const getColorBasedOnScore = (score: number) => {
    if (score < 50) return 'url(#gradientRed)'
    if (score < 79) return 'url(#gradientYellow)'
    return 'url(#gradientGreen)'
  }

  const calculateArc = (currentPercentage: number) => {
    const radius = 90
    const arcAngle = 227
    const totalCircumference = (arcAngle / 360) * (2 * Math.PI * radius)
    const strokeDashoffset = totalCircumference * (1 - currentPercentage / 100)

    return {
      strokeDasharray: `${totalCircumference}`,
      strokeDashoffset: strokeDashoffset
    }
  }

  useEffect(() => {
    const duration = 1000
    const startTime = Date.now()
    const easeOutQuad = (t: number) => t * (2 - t)

    const animateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = easeOutQuad(progress)

      if (progressRef.current) {
        const { strokeDasharray } = calculateArc(100)
        progressRef.current.style.strokeDasharray = strokeDasharray
        progressRef.current.style.strokeDashoffset = calculateArc(
          percentage * easedProgress
        ).strokeDashoffset.toString()
      }

      if (progress < 1) {
        setAnimatedPercentage(Math.round(percentage * easedProgress))
        requestAnimationFrame(animateCount)
      } else {
        setAnimatedPercentage(percentage)
      }
    }

    requestAnimationFrame(animateCount)
  }, [percentage])

  return {
    animatedPercentage,
    percentage,
    progressRef,
    calculateArc,
    getColorBasedOnScore
  }
}
