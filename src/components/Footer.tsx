import type { FC } from 'react'
import { Link } from 'react-router-dom'

const Footer: FC = () => {
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
  }

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-extrabold tracking-tight text-primary">Ai made</span>
              <span className="text-2xl font-medium text-slate-400">usefull</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs mb-8">
              Practical AI tutorials, prompts, and workflows for real work. Helping you master the
              AI revolution.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all"
                aria-label="Website"
              >
                <span className="material-icons-outlined text-sm">public</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all"
                aria-label="Email"
              >
                <span className="material-icons-outlined text-sm">alternate_email</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all"
                aria-label="YouTube"
              >
                <span className="material-icons-outlined text-sm">play_arrow</span>
              </a>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-6">Learn</h5>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/learn" className="hover:text-primary transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-primary transition-colors">
                  Video Library
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-primary transition-colors">
                  AI Glossary
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Prompts</h5>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/prompts" className="hover:text-primary transition-colors">
                  Prompt Library
                </Link>
              </li>
              <li>
                <Link to="/prompts" className="hover:text-primary transition-colors">
                  Premium Prompts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2024 Ai made usefull. All rights reserved.
          </p>
          <button
            type="button"
            onClick={toggleDark}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            aria-label="Toggle dark mode"
          >
            <span className="material-icons-outlined text-sm">dark_mode</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
