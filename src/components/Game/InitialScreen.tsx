import Header from '../Header'

interface InitialScreenProps {
  onStartGame: () => void
}

export default function InitialScreen ({ onStartGame }: InitialScreenProps) {
  return (
    <div className='flex flex-col gap-4'>
      <Header />
      <button
        type='button'
        onClick={onStartGame}
        className='w-full sm:max-w-[315px] rounded py-2 text-center font-bold text-black text-base bg-gradient-to-r from-[#fce75e] via-[#f5e05a] to-[#F0DB4F] ring-1 ring-black/50 hover:scale-105 transition-transform duration-300 ease-out active:scale-95 hover:cursor-pointer'
      >
        <span className='transform-none'>Iniciar Test</span>
      </button>
    </div>
  )
}
