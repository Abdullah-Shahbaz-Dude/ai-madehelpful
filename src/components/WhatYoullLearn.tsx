import type { FC } from 'react'

const cards = [
  {
    icon: 'grid_view',
    title: 'AI Prompts',
    description:
      'Copy-paste ready prompts for ChatGPT, Claude, and Midjourney that deliver consistent results.',
  },
  {
    icon: 'video_library',
    title: 'Video Tutorials',
    description:
      'Step-by-step video guides walking you through complex workflows and new tools.',
  },
  {
    icon: 'settings_input_component',
    title: 'Automation',
    description:
      'Learn how to chain AI tools together to automate repetitive tasks in your business.',
  },
  {
    icon: 'rate_review',
    title: 'Tool Reviews',
    description:
      "Honest, no-hype reviews of the latest AI tools to help you decide what's worth your time.",
  },
]

const WhatYoullLearn: FC = () => {
  return (
    <section className="mb-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">What You&apos;ll Learn</h2>
        <p className="text-slate-500 dark:text-slate-400">Everything you need to become an AI power user</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl hover:shadow-xl transition-all border-b-4 border-b-primary/40"
          >
            <span className="material-icons-outlined text-primary text-3xl mb-4">{card.icon}</span>
            <h3 className="text-xl font-bold mb-3">{card.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhatYoullLearn
