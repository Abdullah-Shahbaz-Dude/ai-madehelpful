import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header: FC = () => {
  const location = useLocation()

  const navLinkClass = (path: string) =>
    location.pathname === path
      ? 'px-4 py-1.5 text-sm font-medium bg-white dark:bg-slate-700 shadow-sm rounded-full text-primary'
      : 'px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors'

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold tracking-tight text-primary">Ai made</span>
            <span className="text-2xl font-medium text-slate-400">usefull</span>
          </Link>
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-2 py-1 space-x-1">
            <Link to="/" className={navLinkClass('/')}>
              Home
            </Link>
            <Link to="/prompts" className={navLinkClass('/prompts')}>
              Prompts
            </Link>
            <Link to="/learn" className={navLinkClass('/learn')}>
              Tutorials
            </Link>
            <Link to="/videos" className={navLinkClass('/videos')}>
              Videos
            </Link>
            <Link to="/resources" className={navLinkClass('/resources')}>
              Resources
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/prompts"
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-slate-200 dark:shadow-none"
            >
              Explore Prompts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
