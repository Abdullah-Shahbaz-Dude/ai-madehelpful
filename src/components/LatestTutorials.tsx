import type { FC } from 'react'

const tutorials = [
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUFuLVyKpgSwiz6yY_wysnq3_2t43Xlw4zANhY_9jTtRaBtpvLcfloQyM5WPAHhKxhG7kqnTpIwfaCTc_Kae5eLG_ArQ_whjqXuU49t6xFPR9T93IWmwYlik7T7HcwXIL_XmiXhYs1RmiwFCB4UyutNvIltKkLCFXlMCqkiOKuIy3pCmLUC2Ps3eN_BEgR0jCKTknplBI3uVGJLho1FonlOtfiDM43B3I_0lebkrVgnX3CBlhWsn0rxAzIIVIeTts0XL2tbhM8F1U4',
    alt: 'Midjourney guide',
    level: 'Beginner',
    levelClass: 'text-primary',
    title: 'Getting Started with Midjourney v6',
    description:
      "A complete beginner's guide to generating stunning images with the latest version of Midjourney.",
    readTime: '15 min read',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmJsDELlKnXWu0ALoxP4-Pb_KkWzOVqiusc0hRQc2piJ3xODlpQJ5VdClQTysiOUz6-MjnyvI0KSEjF55_ytKqEd3Uc3DOHPZlHHdLC1WxCjOVOlqagWVDy26hj3WAJwa_GjFdHZ5q3ckxH125UjU3zaNBVy6FGGdTdV-1yhGw6UKHUnXeL7VXAuF6syqEm-qe6YHCEl8OCnwc8iBCfx3UREqbGO6jzdabvJmb8-yiiH5o2fK6McL5xmJIeCRUY43N7Rr999h-uVwP',
    alt: 'Custom GPT guide',
    level: 'Intermediate',
    levelClass: 'text-emerald-500',
    title: 'Build a Custom GPT for Your Business',
    description:
      'Learn how to upload your own data and create a specialized AI assistant for your company.',
    readTime: '22 min read',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaGeWVQsw7VUhssOpDSm8iRcx5BNe2b_bqxG1PSLOlhsQIUumYw2cIAayYwOVNHHI4yyU9sajxzcwZhAv23PxhnjLN4QGYVff117oHXVLKGWi8UXsE6YqzjeTfraK7t1qGtjFcXkaCpIyAWxjzxW2msD1sds0qD_QIz7RuSrkmqJ5ZAe5JF9QXAExN7yx-iNM7v6KXtaLzja09Bbpb9ExooKGQr73uCN29YTSfWaSpYIx90Vf5pLtbNvqbKRHEEbqVD4IgLPRP6fxw',
    alt: 'Automation guide',
    level: 'Advanced',
    levelClass: 'text-red-500',
    title: 'AI Automation with Zapier',
    description:
      'Connect ChatGPT to Gmail and Slack to automate your daily communication workflow.',
    readTime: '35 min read',
  },
]

const LatestTutorials: FC = () => {
  return (
    <section className="mb-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold mb-4">Latest Tutorials</h2>
        <p className="text-slate-500 dark:text-slate-400">Step-by-step guides to master new skills</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.title}
            className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all"
          >
            <div className="aspect-video overflow-hidden">
              <img
                alt={tutorial.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={tutorial.image}
              />
            </div>
            <div className="p-6">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${tutorial.levelClass} mb-2 block`}
              >
                {tutorial.level}
              </span>
              <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {tutorial.title}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{tutorial.description}</p>
              <div className="flex items-center text-xs font-medium text-slate-400">
                <span className="material-icons-outlined text-sm mr-1">schedule</span>{' '}
                {tutorial.readTime}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LatestTutorials
