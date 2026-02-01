import type { FC } from 'react'

const tools = [
  { name: 'ChatGPT', icon: 'smart_toy', bg: 'bg-emerald-500', shadow: 'shadow-emerald-500/20' },
  { name: 'Midjourney', icon: 'palette', bg: 'bg-slate-800', shadow: 'shadow-slate-800/20' },
  { name: 'Zapier', icon: 'bolt', bg: 'bg-orange-500', shadow: 'shadow-orange-500/20' },
  { name: 'Claude', icon: 'auto_fix_high', bg: 'bg-orange-600', shadow: 'shadow-orange-600/20' },
  { name: 'GitHub Copilot', icon: 'terminal', bg: 'bg-indigo-600', shadow: 'shadow-indigo-600/20' },
  { name: 'Notion AI', icon: 'edit_note', bg: 'bg-slate-900', shadow: 'shadow-slate-900/20' },
]

const ToolsCovered: FC = () => {
  return (
    <section className="mb-32 text-center">
      <h2 className="text-2xl font-bold mb-12 text-slate-400 dark:text-slate-300 uppercase tracking-[0.2em]">
        Tools We Cover & Teach
      </h2>
      <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-60 hover:opacity-100 transition-opacity">
        {tools.map((tool) => (
          <div key={tool.name} className="flex flex-col items-center">
            <div
              className={`w-16 h-16 ${tool.bg} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg ${tool.shadow}`}
            >
              <span className="material-icons-outlined text-3xl">{tool.icon}</span>
            </div>
            <span className="font-bold text-sm">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ToolsCovered
