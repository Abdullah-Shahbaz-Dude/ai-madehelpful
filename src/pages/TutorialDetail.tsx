import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { FC } from 'react'

const VIDEO_THUMBNAIL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCP9em-BUcNaexgsarKp9W0ZXpWw_WWV7AYV9DNPPNSUd0Xnt1AR234a89B8Zow1zqZVnYN1TbFsXS5HbUsqfMMH3VRiMUO-vn624Ilgf1uACqQOKIttGxZqFOVuzeVYpBKQDoX4e_n96xQoCzcdrkJ6V1jxoU75G9mQjYjQSFoLi2e1OdWzuyyWA7Z_-PwL1bc7j5mcPiYiJ1sIT2TfEmxrtmk6nWP0TMjcMdMPIKJtaUNl9DSmEiVJewzT1oNbdnC-6ml_z3vojHz'

const ZAPIER_LOGO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ2PoCDqDZy2eSgC5DI37ZHZBvPzwx3K6TpdoH_1sVQmI9tmevZqTEu5_lbulNy9bjgBDYQZq87PKMTwupd5RmtgdEfVjcJeH8FVAibsFFxl1q-0NxjQe5_rNo5-zXtfcqcki3UbVVUgXwmM7v0VTEUOD3hRuPXzb7Q1hEjQgMavXpn0K1J8uoIIA1EwRxX2oUR_mdtmGaIaq9_O6Q-kRmaKWP6rVfn_pSm-UmrJZnRmMkpcVCv02i9N2CkDiB-K5D_z4hCgMAw6za'

const INSTRUCTOR_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAXW9I3lIiViCyHyi27li6zE2-H9YGs4hZM0HMtYsDI7R1PJNNNVrI_gFowwrk_aF0cGykV3_fwUiXjvYlBDEkB3ou-awmUSn2vtGo7mIrbO8tv81wGCAkl2UdIS_yNpuGGy2kiYmWfaJmIBpni7VH8iKuobOYnvtMGdrt5lDJyeJNfEF2KzcgnvVz7F-8PdyBAT8NgkiUR_IfgikrEh9yKFQ8qoJ4FojGeetGxwFYWMxaTNOf2lCyGUSx2CXPzJIyOge9iVmY9nd5q'

const MORE_LIKE_THIS = [
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIwr59byWs6dewqJ8ggA_496NyaI-h2oqd0X_nBJy84kdILZGVw9uNT2o_iCHqCMmTR8G2Zfy7ScOO71kHy3lGFHX_M0LjVsxs6KPQl_6dHYNWoWf6BvuOlUzjxUznYB8QZRjaCmxJ7iuOEUfVhfuYAul4TTzKWW5r1htJpweG7kkAY_xvrPaC0oTVwpxHyXFnJgalbVgYGGolzbehQkNckk0qanPSKkKoxzEZvvSYPWOYreb4bgpW_tZmDhJOPPwLhHTrfiDn3K5a',
    level: 'Beginner',
    title: 'Getting Started with Midjourney v6',
    description: 'Learn the fundamentals of prompt architecture for high-quality image generation.',
    duration: '12 min',
    views: '2.4k views',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASkMEzne9aAyMgeZ16J5RAdpjr1tzHOW6CRGEgij7ZyVqA6R9rBd7ZJViBPxlP0mTOMCsLARjxxx_-BLObkS0l16ycwRt0mqWgkhVctj5zyroGJaPNTjXTwkE-y2kRTl8FChoS-vmL5eUxsnlWHp6u6wY7YnUps7UVwupTXOITzKP2W6y03V6X4jHRjN2T-R-ZT8PEduHH5v33-AMIgNnDwLTfd0eYAJFXUGZfyeKvfXJW2JoJMm3YfhLQtrs7UaS8mVVc2u2bNHON',
    level: 'Intermediate',
    title: 'Build a Custom GPT for Your Business',
    description: 'How to upload your own knowledge base and create a specialized AI assistant.',
    duration: '24 min',
    views: '5.1k views',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDoijr163yUeFCSjfA1lQu6UMpd4OeGxspGfvu1R-EZIJuXE_Cp4Zc2PVC43rPvVV3Q-lgN-BSBQYeCmMtAEUD2UYD7f23HimcN6WanjD7eQ0nbY4f-B8C0N4ThYx3oKDxw_LpSmkEb9t93av4-2yRZ6BHL6M_eBmAbsdAejT-7-HLLJptq_W7yXDW01_pV4CDkM3MjdBJJin5gvvgekTIRtr_gctq7WMtfNEKR2hGfEJgd77qAp2Bm-VaT57a67xRlvMnECWXCqWxN',
    level: 'Advanced',
    title: 'AI Coding Assistant Mastery',
    description: 'Leveraging GitHub Copilot and Claude for enterprise-level software dev.',
    duration: '45 min',
    views: '1.8k views',
  },
]

const LESSONS = [
  { time: '00:00', title: 'Introduction to AI Automation', description: 'Why personal automation is the next big skill.' },
  { time: '02:45', title: 'Setting up your Zapier Trigger', description: 'How to capture incoming data from Gmail.' },
  { time: '08:12', title: 'Prompt Engineering for Extraction', description: 'Creating the system prompt for ChatGPT.', active: true },
  { time: '14:50', title: 'Connecting Notion as a Sink', description: 'Finalizing the data storage in your workspace.' },
]

const TutorialDetail: FC = () => {
  useEffect(() => {
    document.title = 'Tutorial Detail - Ai made usefull'
    return () => {
      document.title = 'Ai made usefull | Practical AI Workflows'
    }
  }, [])

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            <span className="material-icons-outlined text-sm mr-1">bolt</span>
            Automation Workflow
          </span>
          <div className="flex items-center text-slate-400 text-sm">
            <Link to="/learn" className="hover:underline">
              Tutorials
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-600 dark:text-slate-300">
              Automate Your Daily Workflow with ChatGPT & Zapier
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-4xl mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Automate Your Daily Workflow with <span className="text-primary">ChatGPT & Zapier</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            In this video, we break down exactly how to connect ChatGPT to your email and project
            management tools to save 5+ hours a week. No coding required.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Video block */}
            <div className="aspect-video relative rounded-2xl overflow-hidden bg-black shadow-2xl group border border-slate-200 dark:border-slate-800">
              <img
                alt="Video thumbnail preview"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                src={VIDEO_THUMBNAIL}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  className="w-20 h-20 bg-primary/90 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl backdrop-blur-sm"
                  aria-label="Play video"
                >
                  <span className="material-icons-outlined text-4xl leading-none pl-1">
                    play_arrow
                  </span>
                </button>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white/90">
                <span className="text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  18:42 Duration
                </span>
                <div className="flex gap-4">
                  <button type="button" className="hover:text-white" aria-label="Subtitles">
                    <span className="material-icons-outlined">closed_caption</span>
                  </button>
                  <button type="button" className="hover:text-white" aria-label="Settings">
                    <span className="material-icons-outlined">settings</span>
                  </button>
                  <button type="button" className="hover:text-white" aria-label="Fullscreen">
                    <span className="material-icons-outlined">fullscreen</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lesson Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-icons-outlined text-primary">list_alt</span>
                Lesson Overview
              </h2>
              <div className="space-y-4">
                {LESSONS.map((lesson) => (
                  <div
                    key={lesson.time}
                    className={`flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800/50 transition-all cursor-pointer group ${
                      lesson.active
                        ? 'border-l-4 border-l-primary bg-white dark:bg-slate-800/50'
                        : ''
                    }`}
                  >
                    <span className="text-xs font-bold text-primary bg-primary/10 w-12 text-center py-1 rounded-md shrink-0">
                      {lesson.time}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-bold group-hover:text-primary transition-colors ${
                          lesson.active ? 'text-primary' : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{lesson.description}</p>
                    </div>
                    {lesson.active && (
                      <span className="material-icons-outlined text-primary text-sm shrink-0">
                        equalizer
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Step-by-Step Written Guide */}
            <section className="text-slate-700 dark:text-slate-300">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                Step-by-Step Written Guide
              </h2>
              <p className="mb-6">
                If you prefer to follow along at your own pace, here&apos;s the summary of the
                workflow we built today. This setup uses ChatGPT as an &quot;intelligent
                filter&quot; for your inbox.
              </p>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                1. Create the Gmail Trigger
              </h3>
              <p className="mb-6">
                Navigate to Zapier and create a new Zap. Choose <strong>Gmail</strong> as the app
                and <strong>New Starred Email</strong> as the trigger. This allows you to manually
                control which emails get processed by the AI.
              </p>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                2. Configure the ChatGPT Action
              </h3>
              <p className="mb-4">
                Select the <strong>ChatGPT</strong> app and the <strong>Conversation</strong>{' '}
                action. For the user message, pass in the body of the email. For the system prompt,
                use the one provided in the resources section below.
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl border-l-4 border-primary my-6">
                <p className="font-bold mb-2 text-slate-900 dark:text-white">Pro Tip:</p>
                <p className="text-sm m-0">
                  Always use the &apos;gpt-4&apos; model for data extraction tasks. It is
                  significantly better at following JSON schemas than the &apos;gpt-3.5&apos; model.
                </p>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                3. Map to Notion
              </h3>
              <p>
                Add a final step for <strong>Notion</strong>. Use the &apos;Create Database
                Item&apos; action and map the summary and action items generated by ChatGPT into
                their respective columns.
              </p>
            </section>
          </div>

          {/* Right column - sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Resources card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-icons-outlined text-primary">link</span>
                Resources Mentioned
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <img alt="Zapier logo" className="w-5 h-5" src={ZAPIER_LOGO} />
                  </div>
                  <div className="flex-1 overflow-hidden min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Template
                    </p>
                    <p className="text-sm font-bold truncate">Zapier: Email to Notion</p>
                  </div>
                  <button
                    type="button"
                    className="text-primary hover:bg-primary/10 p-1 rounded shrink-0"
                    aria-label="Open in new"
                  >
                    <span className="material-icons-outlined">open_in_new</span>
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                    <span className="material-icons-outlined">description</span>
                  </div>
                  <div className="flex-1 overflow-hidden min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Prompt
                    </p>
                    <p className="text-sm font-bold truncate">Email Summarizer v2.0</p>
                  </div>
                  <button
                    type="button"
                    className="text-primary hover:bg-primary/10 p-1 rounded shrink-0"
                    aria-label="Copy"
                  >
                    <span className="material-icons-outlined">content_copy</span>
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    <span className="material-icons-outlined">download</span>
                  </div>
                  <div className="flex-1 overflow-hidden min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Cheat Sheet
                    </p>
                    <p className="text-sm font-bold truncate">Prompt Engineering PDF</p>
                  </div>
                  <button
                    type="button"
                    className="text-primary hover:bg-primary/10 p-1 rounded shrink-0"
                    aria-label="Download"
                  >
                    <span className="material-icons-outlined">file_download</span>
                  </button>
                </div>
              </div>
              <hr className="my-6 border-slate-200 dark:border-slate-800" />
              <div className="flex items-center gap-4">
                <img
                  alt="Instructor"
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                  src={INSTRUCTOR_AVATAR}
                />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Alex Rivera</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    AI Automation Expert
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Follow Instructor
              </button>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-primary rounded-2xl p-6 text-white shadow-lg">
              <h4 className="font-bold text-lg mb-2">Get New Workflows</h4>
              <p className="text-sm text-blue-100 mb-4">
                Join 12,000+ people getting weekly practical AI tutorials.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-blue-700/50 border border-blue-400/50 rounded-xl px-4 py-2 text-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                />
                <button
                  type="button"
                  className="w-full bg-white text-primary font-bold py-2 rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                  Join Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* More Like This */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20 mt-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                More Like This
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Level up your skills with related tutorials
              </p>
            </div>
            <Link
              to="/learn"
              className="text-primary font-bold hover:underline flex items-center gap-1"
            >
              View all <span className="material-icons-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MORE_LIKE_THIS.map((item) => (
              <Link
                key={item.title}
                to="/learn"
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group cursor-pointer shadow-sm hover:shadow-xl transition-all block"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    alt="Tutorial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={item.image}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {item.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <span className="material-icons-outlined text-sm">schedule</span>
                    {item.duration}
                    <span className="mx-1">•</span>
                    <span className="material-icons-outlined text-sm">visibility</span>
                    {item.views}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TutorialDetail
