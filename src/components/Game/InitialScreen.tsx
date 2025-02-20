import type { RefProp } from '../../../types'
import { useQuizStore } from '../../zustand/useQuizStore'
import Header from '../Header'
import { motion } from 'motion/react'

function InitialScreen ({ ref }: RefProp<HTMLDivElement>) {
  const startGame = useQuizStore((state) => state.startGame)

  return (
    <div ref={ref} className='flex flex-col gap-6'>
      <Header />
      <motion.button
        type='button'
        onClick={startGame}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          boxShadow: '0px 0px 10px rgba(255, 223, 0, 0.7)',
          scale: 1.05
        }}
        className='group w-full sm:max-w-[315px] rounded py-2 text-center text-black text-base bg-gradient-to-r from-[#fce75e] via-[#f5e05a] to-[#F0DB4F] ring-1 ring-black/50 transition-transform duration-300 ease-out active:scale-95 hover:cursor-pointer'
      >
        <span>Iniciar Test</span>
      </motion.button>
    </div>
  )
}

export const AnimatedInitialScreen = motion.create(InitialScreen)
