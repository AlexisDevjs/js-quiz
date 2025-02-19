import { useEffect, useRef, useState } from 'react'
import { useQuizStore } from '../../zustand/useQuizStore'

export function ScoreScreen () {
  const score = useQuizStore((state) => state.score)
  const restartQuiz = useQuizStore((state) => state.restartQuiz)
  const quitGame = useQuizStore((state) => state.quitGame)
  const totalQuestions = useQuizStore((state) => state.questions).length

  const percentage = Math.round((score / totalQuestions) * 100)
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const progressRef = useRef<SVGPathElement>(null)

  const getColorBasedOnScore = (score: number) => {
    if (score < 69) return 'url(#gradientRed)'
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

  return (
    <article className='shadow-xl rounded-md border border-gray-200 text-center w-full max-w-sm mx-auto p-6'>
      <div className='relative'>
        <svg className='w-full' viewBox='-22 -50 229 160'>
          <path
            d='M 10 100 A 90 90 0 1 1 175 100'
            fill='none'
            stroke='#e2e8f0'
            strokeWidth='17'
            strokeLinecap='round'
          />
          <path
            ref={progressRef}
            d='M 10 100 A 90 90 0 1 1 175 100'
            fill='none'
            stroke={getColorBasedOnScore(percentage)}
            strokeWidth='17'
            strokeLinecap='round'
            className='transition-all duration-1000 ease-out'
            style={calculateArc(animatedPercentage)}
          />
          <defs>
            <linearGradient id='gradientRed' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#e63535' />
              <stop offset='50%' stopColor='#ef4444' />
              <stop offset='100%' stopColor='#f45a5a' />
            </linearGradient>
            <linearGradient
              id='gradientYellow'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop offset='0%' stopColor='#facc15' />
              <stop offset='50%' stopColor='#fde047' />
              <stop offset='100%' stopColor='#fef08a' />
            </linearGradient>
            <linearGradient
              id='gradientGreen'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop offset='0%' stopColor='#1cb454' />
              <stop offset='50%' stopColor='#22c55e' />
              <stop offset='100%' stopColor='#36d26f' />
            </linearGradient>
            <path
              id='textPath'
              d='M -4 102 A 105.5 101.5 0 1 1 188  104'
              fill='none'
            />
          </defs>
          <text fontSize='12' fill='#94a3b8'>
            <textPath href='#textPath' startOffset='8%'>
              MAL
            </textPath>
          </text>
          <text fontSize='12' fill='#94a3b8'>
            <textPath href='#textPath' startOffset='50%' textAnchor='middle'>
              GENIAL
            </textPath>
          </text>
          <text fontSize='12' fill='#94a3b8'>
            <textPath href='#textPath' startOffset='95%' textAnchor='end'>
              EXCELENTE
            </textPath>
          </text>
        </svg>
        <div className='absolute top-[69%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
          <div className='relative'>
            <span className='text-5xl font-bold'>{animatedPercentage}</span>
            <span className='block text-base text-gray-500'>/100</span>
          </div>
          <svg
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40'
            viewBox='0 0 200 200'
          >
            <defs>
              <linearGradient
                id='ringGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='0%' stopColor='#8b5cf6' stopOpacity={0.2} />
                <stop offset='50%' stopColor='#3b82f6' stopOpacity={0.2} />
                <stop offset='100%' stopColor='#60a5fa' stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <circle
              cx='100'
              cy='100'
              r='82'
              fill='none'
              stroke='url(#ringGradient)'
              strokeWidth='12'
            />
          </svg>
        </div>
      </div>

      <section className='text-center mt-8 mb-5'>
        <span className='text-sm text-blue-500 bg-blue-100/75 py-1 px-4 font-medium rounded-full'>
          NIVEL DE ACIERTOS
        </span>
        <span className='block mt-4 text-lg font-semibold'>
          {score} / {totalQuestions} aciertos
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
        <p className='text-gray-500 text-[15px]'>
          {percentage >= 90
            ? '¡Has dominado los conceptos modernos de JavaScript!'
            : percentage >= 70
              ? '¡Tienes un gran conocimiento de JavaScript!'
              : percentage >= 50
                ? '¡Vas por buen camino, sigue así!'
                : '¡Sigue aprendiendo y mejorarás pronto!'}
        </p>
      </section>

      <div className='space-y-3'>
        <button
          type='button'
          onClick={restartQuiz}
          className='w-full bg-primary hover:bg-primary-200 hover:cursor-pointer py-2 rounded-md ring ring-black/50'
        >
          Intentar de nuevo
        </button>
        <button
          type='button'
          onClick={quitGame}
          className='w-full hover:cursor-pointer py-2 ring ring-gray-300 rounded-md hover:bg-gray-100'
        >
          Salir
        </button>
      </div>
    </article>
  )
}
