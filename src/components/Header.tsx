import { JavaScriptIcon } from './icons'

export default function Header () {
  return (
    <header className='flex justify-center items-center gap-3'>
      <JavaScriptIcon className='ring-1 ring-black/75 size-8 hover:drop-shadow-[0_0_5px_#c8bf93] dark:hover:drop-shadow-[0_0_5px_#c8c3a8]' />
      <h1 className='text-3xl sm:text-4xl font-lato'>JavaScript Quiz</h1>
    </header>
  )
}
