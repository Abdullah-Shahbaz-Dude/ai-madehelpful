import { useEffect, useState } from 'react'
import type { FC } from 'react'

const FILTERS = ['All', 'Marketing', 'Coding', 'Writing', 'Image Generation', 'Productivity'] as const

const PROMPTS_DATA = [
  {
    tool: 'ChatGPT',
    toolClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    title: 'SEO Blog Post Generator',
    description:
      '"Write a comprehensive, SEO-optimized blog post about [TOPIC]. Include a catchy title, meta description, and use H2 and H3 headers. Focus on the keyword [KEYWORD] and maintain a professional..."',
    tags: ['#Marketing', '#Writing'],
    updated: 'Updated 2 days ago',
  },
  {
    tool: 'Midjourney',
    toolClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    title: 'Photorealistic Portrait',
    description:
      '"Cinematic portrait of a [SUBJECT], 8k resolution, highly detailed, dramatic lighting, shot on 35mm lens, f/1.8, bokeh background --ar 16:9 --v 6.0"',
    descriptionItalic: true,
    tags: ['#Creative', '#Design'],
    updated: 'Updated 1 week ago',
  },
  {
    tool: 'Claude',
    toolClass: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    title: 'Code Refactoring Assistant',
    description:
      '"Review the following code for performance improvements and readability. Suggest specific refactoring changes and explain why they are better. Code: [PASTE CODE]"',
    tags: ['#Development', '#Coding'],
    updated: 'Updated 3 days ago',
  },
  {
    tool: 'Generic',
    toolClass: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    title: 'Cold Outreach Script',
    description:
      '"Draft a 3-step cold email sequence for a SaaS product targeting [PERSONA]. Keep it short, focus on solving [PAIN POINT], and include a clear call to action..."',
    tags: ['#Sales', '#Copywriting'],
    updated: 'Updated 5 days ago',
  },
  {
    tool: 'ChatGPT',
    toolClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    title: 'Technical Concept Simplifier',
    description:
      '"Explain [COMPLEX CONCEPT] like I\'m five. Use a simple analogy and avoid technical jargon. Ensure the core principle remains accurate while simplifying the delivery..."',
    tags: ['#Education', '#Learning'],
    updated: 'Updated 1 day ago',
  },
  {
    tool: 'Claude',
    toolClass: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    title: 'YouTube Video Scripting',
    description:
      '"Create a script for a 10-minute YouTube video about [TOPIC]. Include a hook, detailed body sections with B-roll suggestions, and a CTA at the end. Tone should be..."',
    tags: ['#Video', '#Social'],
    updated: 'Updated 4 hours ago',
  },
]

const SUPPORTED_TOOLS = [
  { name: 'ChatGPT', icon: 'bolt', bg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600' },
  { name: 'Midjourney', icon: 'palette', bg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600' },
  { name: 'Claude', icon: 'psychology', bg: 'bg-orange-100 dark:bg-orange-900/30', iconColor: 'text-orange-600' },
  { name: 'GitHub Copilot', icon: 'code', bg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600' },
  { name: 'Zapier AI', icon: 'auto_fix_high', bg: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600' },
  { name: 'Notion AI', icon: 'description', bg: 'bg-slate-200 dark:bg-slate-700', iconColor: 'text-slate-600 dark:text-slate-400' },
]

const Prompts: FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  useEffect(() => {
    document.title = 'Prompt Library - Ai made usefull'
    return () => {
      document.title = 'Ai made usefull | Practical AI Workflows'
    }
  }, [])

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-background-dark pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-primary mb-6">
            <span className="material-icons-outlined text-[14px] mr-1">auto_awesome</span>
            2,400+ Verified Prompts
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Prompt <span className="text-primary">Library</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Unlock the full potential of AI with our curated collection of production-ready prompts
            for ChatGPT, Midjourney, Claude, and more.
          </p>
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-icons-outlined text-slate-400">search</span>
            </div>
            <input
              type="text"
              placeholder="Search prompts for 'SEO', 'Email marketing', 'Python'..."
              className="block w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-xl shadow-blue-500/5 dark:shadow-none bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary text-lg text-slate-900 dark:text-white placeholder:text-slate-500"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={
                  activeFilter === filter
                    ? 'px-4 py-2 rounded-full border border-primary bg-primary text-white text-sm font-medium transition-all'
                    : 'px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-primary transition-all'
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main: prompt cards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROMPTS_DATA.map((prompt) => (
            <div
              key={prompt.title}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${prompt.toolClass}`}
                  >
                    {prompt.tool}
                  </span>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-primary transition-colors p-1"
                    aria-label="Copy prompt"
                  >
                    <span className="material-icons-outlined">content_copy</span>
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-slate-900 dark:text-white">
                  {prompt.title}
                </h3>
                <p
                  className={`text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed ${
                    prompt.descriptionItalic ? 'italic' : ''
                  }`}
                >
                  {prompt.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-500">{prompt.updated}</span>
                <button
                  type="button"
                  className="text-primary text-sm font-semibold inline-flex items-center group/btn hover:underline"
                >
                  Details{' '}
                  <span className="material-icons-outlined text-[18px] ml-1 group-hover/btn:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button
            type="button"
            className="px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-semibold hover:border-primary transition-colors inline-flex items-center text-slate-900 dark:text-white"
          >
            Load More Prompts
            <span className="material-icons-outlined ml-2">expand_more</span>
          </button>
        </div>
      </main>

      {/* Supported AI Tools */}
      <section className="py-20 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-12 text-slate-900 dark:text-white">
            Supported AI Tools
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
            {SUPPORTED_TOOLS.map((tool) => (
              <div key={tool.name} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 ${tool.bg} rounded-xl flex items-center justify-center mb-2`}
                >
                  <span className={`material-icons-outlined ${tool.iconColor}`}>{tool.icon}</span>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Prompts
