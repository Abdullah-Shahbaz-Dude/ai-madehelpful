import type { FC } from 'react'
import { Link } from 'react-router-dom'

const prompts = [
  {
    tool: 'ChatGPT',
    toolClass: 'bg-blue-50 dark:bg-blue-900/30 text-primary',
    title: 'SEO Blog Post Generator',
    description:
      'Write a comprehensive, SEO-optimized blog post about [TOPIC]. Include a catchy title, meta description, and use H2 and H3 headers.',
    tags: ['#Marketing', '#Writing'],
  },
  {
    tool: 'Midjourney',
    toolClass: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    title: 'Cinematic Portrait Pro',
    description:
      'Cinematic portrait of a [SUBJECT], 8k resolution, highly detailed, dramatic lighting, shot on 35mm lens, f/1.8, bokeh background --ar 16:9',
    tags: ['#Art', '#Creative'],
  },
  {
    tool: 'Claude',
    toolClass: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    title: 'Code Refactoring Assistant',
    description:
      'Review the following code for performance improvements and readability. Suggest specific refactoring changes and explain why.',
    tags: ['#Development', '#Coding'],
  },
]

const PopularPrompts: FC = () => {
  return (
    <section className="mb-32 bg-slate-50 dark:bg-slate-800/50 -mx-4 px-4 py-20 sm:mx-0 sm:px-10 rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-extrabold mb-4">Popular Prompts</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Tested and verified prompts to help you get the best results instantly.
          </p>
        </div>
        <Link
          to="/prompts"
          className="mt-6 md:mt-0 text-primary font-semibold flex items-center hover:underline"
        >
          View Library <span className="material-icons-outlined ml-1">chevron_right</span>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {prompts.map((prompt) => (
          <div
            key={prompt.title}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all relative"
          >
            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-3 py-1 text-xs font-bold rounded-lg ${prompt.toolClass}`}
              >
                {prompt.tool}
              </span>
              <button type="button" className="text-slate-400 hover:text-primary" aria-label="Copy prompt">
                <span className="material-icons-outlined">content_copy</span>
              </button>
            </div>
            <h4 className="text-lg font-bold mb-3">{prompt.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-3">
              {prompt.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-slate-400 dark:text-slate-500 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularPrompts
