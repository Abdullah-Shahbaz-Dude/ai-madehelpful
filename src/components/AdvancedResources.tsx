import type { FC } from 'react'
import { Link } from 'react-router-dom'

const AdvancedResources: FC = () => {
  return (
    <section className="grid lg:grid-cols-2 gap-16 items-start mb-32">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Advanced Workflows Resources</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
          Take your AI skills to the next level with our curated collection of advanced automation
          templates, custom GPT configurations, and workflow diagrams.
        </p>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="material-icons-outlined text-primary">layers</span>
            </div>
            <div>
              <h4 className="font-bold text-lg">JSON Templates</h4>
              <p className="text-slate-500 dark:text-slate-400">
                Structured data templates for consistent AI outputs across multiple platforms.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="material-icons-outlined text-primary">account_tree</span>
            </div>
            <div>
              <h4 className="font-bold text-lg">Automation Blueprints</h4>
              <p className="text-slate-500 dark:text-slate-400">
                Visual guides for connecting multiple AI tools in a single automated chain.
              </p>
            </div>
          </div>
        </div>
        <Link
          to="/resources"
          className="mt-10 flex items-center font-bold text-primary group"
        >
          Explore All Resources{' '}
          <span className="material-icons-outlined ml-2 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="material-icons-outlined text-slate-400">file_download</span>
            <span className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 text-[10px] font-bold rounded">
              FREE DOWNLOAD
            </span>
          </div>
          <h4 className="font-bold mb-2">The Ultimate Prompt Engineering Cheatsheet</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            PDF guide covering zero-shot, few-shot, and chain-of-thought prompting techniques.
          </p>
          <button
            type="button"
            className="w-full py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Download PDF
          </button>
        </div>
        <div className="bg-blue-50 dark:bg-slate-800 border-2 border-primary/20 dark:border-primary/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="material-icons-outlined text-primary">auto_fix_high</span>
            <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded">
              TEMPLATE
            </span>
          </div>
          <h4 className="font-bold mb-2">Content Repurposing Workflow</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Zapier automation template to turn one YouTube video into a blog post, tweets, and
            newsletter.
          </p>
          <button
            type="button"
            className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            Get Template
          </button>
        </div>
      </div>
    </section>
  )
}

export default AdvancedResources
