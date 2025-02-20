import { useQuizStore } from '../../zustand/useQuizStore'
import Header from '../Header'
import { motion } from 'motion/react'

export function InitialScreen () {
  const startGame = useQuizStore((state) => state.startGame)

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0 }}
      className='flex flex-col gap-6 justify-center items-center max-w-sm text-pretty'
    >
      <Header />
      <p className='text-center text-base max-w-[315px] my-1 text-gray-800 dark:text-gray-200'>
        ¿Eres un experto en JavaScript? Pon a prueba
        tus conocimientos en este entretenido quiz interactivo.
      </p>
      <motion.button
        type='button'
        onClick={startGame}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          boxShadow: '0px 0px 10px rgba(255, 223, 0, 0.7)',
          backgroundColor: '#F0DB4F'
        }}
        className='group w-full max-w-[273px] sm:max-w-[315px] rounded py-2 text-center text-black text-base bg-gradient-to-r from-[#fce75e] via-[#f5e05a] to-[#F0DB4F] ring-1 ring-black/50 transition-transform duration-300 ease-out active:scale-95 hover:cursor-pointer'
      >
        <span>Iniciar Test</span>
      </motion.button>
    </motion.div>
  )
}
