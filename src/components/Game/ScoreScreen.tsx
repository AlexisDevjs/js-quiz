import { useQuizStore } from '../../zustand/useQuizStore'
import { useScoreAnimation } from '../../hooks/useScoreAnimation'
import { ScoreRingIcon } from '../icons'
import { motion } from 'motion/react'

export function ScoreScreen () {
  const score = useQuizStore((state) => state.score)
  const restartQuiz = useQuizStore((state) => state.restartQuiz)
  const quitGame = useQuizStore((state) => state.quitGame)
  const totalQuestions = useQuizStore((state) => state.questions).length

  const {
    percentage,
    progressRef,
    animatedPercentage,
    calculateArc,
    getColorBasedOnScore
  } = useScoreAnimation(score, totalQuestions)

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.5 }
      }}
      style={{ transformOrigin: 'center' }}
      className='shadow-xl rounded-md border border-gray-200 text-center w-full max-w-[370px] mx-auto p-6 dark:bg-gray-800 dark:border-gray-600'
    >
      <div className='relative'>
        <ProgressScore
          progressRef={progressRef}
          getColorBasedOnScore={getColorBasedOnScore}
          percentage={percentage}
          calculateArc={calculateArc}
          animatedPercentage={animatedPercentage}
        />
        <div className='absolute top-[68%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
          <div className='relative'>
            <span
              className={`block mt-1 ${
                animatedPercentage === 100 ? 'text-4xl' : 'text-[40px]'
              } leading-8 font-bold dark:text-white`}
            >
              {animatedPercentage}
            </span>
            <span className='block text-base text-gray-500 dark:text-gray-200'>
              /100
            </span>
          </div>
          <ScoreRingIcon />
        </div>
      </div>

      <section className='text-center mt-7'>
        <span className='text-sm text-blue-500 bg-blue-100/75 dark:bg-blue-400 py-1 px-4 font-semibold rounded-full dark:text-white'>
          {score} / {totalQuestions} aciertos
        </span>
        <h2 className='text-2xl font-bold mt-5 mb-2 dark:text-white'>
          {percentage >= 90
            ? '¡Desempeño Sobresaliente!'
            : percentage >= 70
              ? '¡Muy buen trabajo!'
              : percentage >= 50
                ? '¡Buen esfuerzo!'
                : '¡Sigue practicando!'}
        </h2>
        <p className='text-gray-500 text-[15px] dark:text-gray-200'>
          {percentage >= 90
            ? '¡Has dominado los conceptos modernos de JavaScript!'
            : percentage >= 70
              ? '¡Tienes un gran conocimiento de JavaScript!'
              : percentage >= 50
                ? '¡Vas por buen camino, sigue así!'
                : '¡Sigue aprendiendo y mejorarás pronto!'}
        </p>
      </section>

      <div className='space-y-3 mt-3'>
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
          className='w-full hover:cursor-pointer py-2 ring ring-gray-300 rounded-md hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-500 dark:ring-gray-400 dark:text-white'
        >
          Salir
        </button>
      </div>
    </motion.article>
  )
}

interface ProgressScoreProps {
  progressRef: React.RefObject<SVGPathElement | null>
  getColorBasedOnScore: (score: number) => string
  percentage: number
  calculateArc: (currentPercentage: number) => {
    strokeDasharray: string
    strokeDashoffset: number
  }
  animatedPercentage: number
}

function ProgressScore ({
  progressRef,
  getColorBasedOnScore,
  percentage,
  calculateArc,
  animatedPercentage
}: ProgressScoreProps) {
  return (
    <svg className='w-full aspect-video' viewBox='-22 -50 229 160'>
      <path
        d='M 25 100 A 80 80 0 1 1 160 100'
        fill='none'
        stroke='#e2e8f0'
        strokeWidth='17'
        strokeLinecap='round'
      />
      <path
        ref={progressRef}
        d='M 25 100 A 80 80 0 1 1 160 100'
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
        <linearGradient id='gradientYellow' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor='#facc15' />
          <stop offset='50%' stopColor='#fde047' />
          <stop offset='100%' stopColor='#fef08a' />
        </linearGradient>
        <linearGradient id='gradientGreen' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor='#1cb454' />
          <stop offset='50%' stopColor='#22c55e' />
          <stop offset='100%' stopColor='#36d26f' />
        </linearGradient>
        <path id='textPath' d='M 7 100 A 96 94 0 1 1 177 100' fill='none' />
      </defs>
      <text
        fontSize='17'
        className='fill-slate-400 dark:fill-white'
        vectorEffect='non-scaling-stroke'
      >
        <textPath href='#textPath' startOffset='5%'>
          BAJO
        </textPath>
      </text>
      <text
        fontSize='17'
        className='fill-slate-400 dark:fill-white'
        vectorEffect='non-scaling-stroke'
      >
        <textPath href='#textPath' startOffset='50%' textAnchor='middle'>
          ACEPTABLE
        </textPath>
      </text>
      <text
        fontSize='17'
        className='fill-slate-400 dark:fill-white'
        vectorEffect='non-scaling-stroke'
      >
        <textPath href='#textPath' startOffset='99%' textAnchor='end'>
          EXCELENTE
        </textPath>
      </text>
    </svg>
  )
}
