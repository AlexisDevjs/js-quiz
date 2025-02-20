import { JavaScriptIcon } from './icons'

export default function Header () {
  return (
    <header className='flex justify-center items-center gap-3'>
      <JavaScriptIcon className='ring-1 ring-black/75 transition-all duration-300 size-8 hover:drop-shadow-[0_0_10px_#f0db4f] dark:hover:drop-shadow-[0_0_5px_#c8c3a8]' />
      <h1 className='text-3xl sm:text-4xl font-semibold font-Geist dark:text-white'>
        JavaScript Quiz
      </h1>
    </header>
  )
}
