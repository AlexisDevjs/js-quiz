import { GithubIcon } from './icons'
import { ToggleTheme } from './ToggleTheme'

export default function Navbar () {
  return (
    <nav className='flex justify-center items-center py-2 px-6 gap-5 rounded-full ring-1 ring-gray-300 dark:ring-gray-500 mb-10'>
      <a
        href='https://github.com/AlexisDevjs/js-quiz'
        target='_blank'
        rel='noreferrer noopener'
        aria-label='Github'
        title='Github'
      >
        <GithubIcon />
      </a>
      <ToggleTheme />
    </nav>
  )
}
