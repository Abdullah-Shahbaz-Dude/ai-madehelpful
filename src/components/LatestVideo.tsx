import type { FC } from 'react'
import { Link } from 'react-router-dom'

const VIDEO_THUMBNAIL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDyE-vQPDbDcVyHtaSoiTmrrIaoQe0ScnNP1dwRa9OXvA_o7jUDcTTeZ1XBw8j5bcrMHTf-NEoy1obTB65_C2oUZq6Fx6wGn7DMMw13yo2EsN8fWiaEk5BfhyUi5-4YsLV2KFswwAy_iZmS8fNCCWsbxViecRTkrbWPCnKp2mShKSKu45EDCYPshgPQzqHvCxii5TSvKR9OjCkApAEiXAQEfBHquuISaU4BF-Q8HBNSMseYtUAePh1_25KPbt_X9-YkkY9Y47wTkJeq'

const LatestVideo: FC = () => {
  return (
    <section className="mb-32 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 block">
          New on YouTube
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
          Automate Your Daily Workflow with ChatGPT & Zapier
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          In this video, we break down exactly how to connect ChatGPT to your email and project management tools to save 5+ hours a week. No coding required.
        </p>
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider">
            Resources mentioned
          </h3>
          <a
            href="#"
            className="flex items-center p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary transition-colors"
          >
            <span className="material-icons-outlined text-primary mr-3">file_download</span>
            <span className="font-medium">Zapier Template: Email to Notion</span>
          </a>
          <a
            href="#"
            className="flex items-center p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary transition-colors"
          >
            <span className="material-icons-outlined text-primary mr-3">description</span>
            <span className="font-medium">Prompt: Email Summarizer v2</span>
          </a>
        </div>
      </div>
      <Link
        to="/learn/automate-daily-workflow-chatgpt-zapier"
        className="relative group cursor-pointer block"
      >
        <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            alt="Video thumbnail"
            className="w-full h-full object-cover aspect-video"
            src={VIDEO_THUMBNAIL}
          />
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center group-hover:bg-slate-900/20 transition-all">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
              <span className="material-icons-outlined text-primary text-4xl">play_arrow</span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}

export default LatestVideo
