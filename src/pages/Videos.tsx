import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";

const FILTERS = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Automation",
] as const;

const VIDEO_THUMBNAIL_MAIN =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCP9em-BUcNaexgsarKp9W0ZXpWw_WWV7AYV9DNPPNSUd0Xnt1AR234a89B8Zow1zqZVnYN1TbFsXS5HbUsqfMMH3VRiMUO-vn624Ilgf1uACqQOKIttGxZqFOVuzeVYpBKQDoX4e_n96xQoCzcdrkJ6V1jxoU75G9mQjYjQSFoLi2e1OdWzuyyWA7Z_-PwL1bc7j5mcPiYiJ1sIT2TfEmxrtmk6nWP0TMjcMdMPIKJtaUNl9DSmEiVJewzT1oNbdnC-6ml_z3vojHz";

const TUTORIALS = [
  {
    slug: "automate-daily-workflow-chatgpt-zapier",
    image: VIDEO_THUMBNAIL_MAIN,
    level: "Automation",
    levelClass:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    title: "Automate Your Daily Workflow with ChatGPT & Zapier",
    description:
      "In this video, we break down exactly how to connect ChatGPT to your email and project management tools to save 5+ hours a week. No coding required.",
    duration: "18 min",
    views: "12k views",
  },
  {
    slug: "getting-started-midjourney-v6",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIwr59byWs6dewqJ8ggA_496NyaI-h2oqd0X_nBJy84kdILZGVw9uNT2o_iCHqCMmTR8G2Zfy7ScOO71kHy3lGFHX_M0LjVsxs6KPQl_6dHYNWoWf6BvuOlUzjxUznYB8QZRjaCmxJ7iuOEUfVhfuYAul4TTzKWW5r1htJpweG7kkAY_xvrPaC0oTVwpxHyXFnJgalbVgYGGolzbehQkNckk0qanPSKkKoxzEZvvSYPWOYreb4bgpW_tZmDhJOPPwLhHTrfiDn3K5a",
    level: "Beginner",
    levelClass:
      "bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300",
    title: "Getting Started with Midjourney v6",
    description:
      "Learn the fundamentals of prompt architecture for high-quality image generation.",
    duration: "12 min",
    views: "2.4k views",
  },
  {
    slug: "build-custom-gpt-business",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASkMEzne9aAyMgeZ16J5RAdpjr1tzHOW6CRGEgij7ZyVqA6R9rBd7ZJViBPxlP0mTOMCsLARjxxx_-BLObkS0l16ycwRt0mqWgkhVctj5zyroGJaPNTjXTwkE-y2kRTl8FChoS-vmL5eUxsnlWHp6u6wY7YnUps7UVwupTXOITzKP2W6y03V6X4jHRjN2T-R-ZT8PEduHH5v33-AMIgNnDwLTfd0eYAJFXUGZfyeKvfXJW2JoJMm3YfhLQtrs7UaS8mVVc2u2bNHON",
    level: "Intermediate",
    levelClass:
      "bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300",
    title: "Build a Custom GPT for Your Business",
    description:
      "How to upload your own knowledge base and create a specialized AI assistant.",
    duration: "24 min",
    views: "5.1k views",
  },
  {
    slug: "ai-coding-assistant-mastery",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoijr163yUeFCSjfA1lQu6UMpd4OeGxspGfvu1R-EZIJuXE_Cp4Zc2PVC43rPvVV3Q-lgN-BSBQYeCmMtAEUD2UYD7f23HimcN6WanjD7eQ0nbY4f-B8C0N4ThYx3oKDxw_LpSmkEb9t93av4-2yRZ6BHL6M_eBmAbsdAejT-7-HLLJptq_W7yXDW01_pV4CDkM3MjdBJJin5gvvgekTIRtr_gctq7WMtfNEKR2hGfEJgd77qAp2Bm-VaT57a67xRlvMnECWXCqWxN",
    level: "Advanced",
    levelClass:
      "bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300",
    title: "AI Coding Assistant Mastery",
    description:
      "Leveraging GitHub Copilot and Claude for enterprise-level software dev.",
    duration: "45 min",
    views: "1.8k views",
  },
];

const Videos: FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    document.title = "Videos - Ai made helpful";
    return () => {
      document.title = "Ai made helpful | Practical AI Workflows";
    };
  }, []);

  const filteredTutorials =
    activeFilter === "All"
      ? TUTORIALS
      : TUTORIALS.filter(
          (t) => t.level.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-background-dark pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-primary mb-6">
            <span className="material-icons-outlined text-[14px] mr-1">
              video_library
            </span>
            Video Library
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Videos <span className="text-primary">Library</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Step-by-step video tutorials to master AI tools. From beginner to
            advanced workflows.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={
                  activeFilter === filter
                    ? "px-4 py-2 rounded-full border border-primary bg-primary text-white text-sm font-medium transition-all"
                    : "px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-primary transition-all"
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video cards grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial) => (
            <Link
              key={tutorial.slug}
              to={`/learn/${tutorial.slug}`}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={tutorial.image}
                />
                <div
                  className={`absolute top-3 left-3 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tutorial.levelClass}`}
                >
                  {tutorial.level}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 text-slate-900 dark:text-white">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                  {tutorial.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <span className="material-icons-outlined text-sm">
                    schedule
                  </span>
                  {tutorial.duration}
                  <span className="mx-1">•</span>
                  <span className="material-icons-outlined text-sm">
                    visibility
                  </span>
                  {tutorial.views}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filteredTutorials.length === 0 && (
          <p className="text-center text-slate-500 dark:text-slate-400 py-12">
            No videos in this category yet.
          </p>
        )}
      </main>
    </div>
  );
};

export default Videos;
