import type { FC, ReactNode } from 'react'
import Header from './Header'
import Newsletter from './Newsletter'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />
      {children}
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Layout
