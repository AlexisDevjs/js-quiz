import { useEffect, useRef, useState } from 'react'

interface ScoreScreenProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export function ScoreScreen ({
  score,
  totalQuestions,
  onRestart
}: ScoreScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const progressRef = useRef<SVGPathElement>(null)

  const getColorBasedOnScore = (score: number) => {
    if (score < 50) return 'url(#gradientRed)' // red-500
    if (score < 80) return 'url(#gradient)' // existing gradient
    return 'url(#gradientGreen)' // green-500
  }

  // Calculate the arc path
  const calculateArc = (currentPercentage: number) => {
    const radius = 90
    const circumference = radius * Math.PI
    const strokeDashoffset
      = circumference - (currentPercentage / 100) * circumference
    return {
      strokeDasharray: circumference,
      strokeDashoffset: strokeDashoffset
    }
  }

  useEffect(() => {
    // Get the total length of the path for the animation
    if (progressRef.current) {
      const length = progressRef.current.getTotalLength()
      progressRef.current.style.strokeDasharray = `${length}`
      progressRef.current.style.strokeDashoffset = `${length}`
    }

    // Animate the percentage counter
    const duration = 1000 // 1 second
    const startTime = Date.now()
    const easeOutQuad = (t: number) => t * (2 - t)

    const animateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = easeOutQuad(progress)

      if (progress < 1) {
        setAnimatedPercentage(Math.round(percentage * easedProgress))
        requestAnimationFrame(animateCount)
      } else {
        setAnimatedPercentage(percentage)
      }
    }

    requestAnimationFrame(animateCount)
  }, [percentage])

  return (
    <article className='shadow-xl rounded-md border border-gray-200 text-center w-full max-w-[400px] mx-auto p-6'>
      <div className='relative mt-4 p-2'>
        <svg className='w-full' viewBox='-20 -50 230 158'>
          <path
            d='M 10 100 A 90 90 0 1 1 175 100'
            fill='none'
            stroke='#e2e8f0'
            strokeWidth='15'
            strokeLinecap='round'
          />
          <path
            ref={progressRef}
            d='M 10 100 A 90 90 0 1 1 175 100'
            fill='none'
            stroke={getColorBasedOnScore(percentage)}
            strokeWidth='15'
            strokeLinecap='round'
            className='transition-all duration-1000 ease-out'
            style={{
              strokeDasharray: calculateArc(100).strokeDasharray,
              strokeDashoffset:
                calculateArc(animatedPercentage).strokeDashoffset
            }}
          />
          <defs>
            <linearGradient id='gradientRed' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#ef4444' />
              <stop offset='100%' stopColor='#ff0000' />
            </linearGradient>
            <linearGradient
              id='gradientViolet'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop offset='0%' stopColor='#8b5cf6' />
              <stop offset='100%' stopColor='#3b82f6' />
            </linearGradient>
            <linearGradient
              id='gradientGreen'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop offset='0%' stopColor='#22bf5c' />
              <stop offset='100%' stopColor='#14de5f' />
            </linearGradient>

            <path
              id='textPath'
              d='M -4 102 A 105.5 101 0 1 1 188 104'
              fill='none'
            />
          </defs>
          <text fontSize='12' fill='#94a3b8'>
            <textPath href='#textPath' startOffset='0%'>
              MAL
            </textPath>
          </text>
          <text fontSize='12' fill='#94a3b8'>
            <textPath href='#textPath' startOffset='50%' textAnchor='middle'>
              GENIAL
            </textPath>
          </text>
          <text fontSize='12' fill='#94a3b8'>
            <textPath href='#textPath' startOffset='100%' textAnchor='end'>
              EXCELENTE
            </textPath>
          </text>
        </svg>
        {/* Score */}
        <div className='absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
          <div className='relative'>
            <div className='text-5xl font-bold'>{animatedPercentage}</div>
            <div className='text-sm text-gray-500'>/100</div>
            <svg className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32'>
              <circle
                cx='64'
                cy='64'
                r='60'
                fill='none'
                stroke='#e2e8f0'
                strokeWidth='2'
              />
            </svg>
          </div>
          <div className='mt-10 text-lg font-semibold'>
            {score} / {totalQuestions} aciertos
          </div>
        </div>
      </div>

      <div className='text-center mb-8 mt-22'>
        <span className='text-sm text-blue-500 font-medium rounded-full'>
          NIVEL DE ACIERTOS
        </span>
        <h2 className='text-2xl font-bold mt-3 mb-2'>
          {percentage >= 90
            ? '¡Desempeño Sobresaliente!'
            : percentage >= 70
              ? '¡Muy buen trabajo!'
              : percentage >= 50
                ? '¡Buen esfuerzo!'
                : '¡Sigue practicando!'}
        </h2>
        <p className='text-gray-500 text-sm'>
          {percentage >= 90
            ? '¡Has dominado los conceptos modernos de JavaScript!'
            : percentage >= 70
              ? '¡Tienes un gran conocimiento de JavaScript!'
              : percentage >= 50
                ? '¡Vas por buen camino, sigue así!'
                : '¡Sigue aprendiendo y mejorarás pronto!'}
        </p>
      </div>

      <div className='space-y-3'>
        <button
          type='button'
          onClick={onRestart}
          className='w-full bg-primary hover:bg-primary-200 hover:cursor-pointer py-2 rounded-md ring ring-black/50'
        >
          Intentar de nuevo
        </button>
        <button
          type='button'
          className='w-full hover:cursor-pointer py-2 ring ring-gray-300 rounded-md'
        >
          Salir
        </button>
      </div>
    </article>
  )
}
