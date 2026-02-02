import { useEffect, useState } from "react";
import type { FC } from "react";

const FILTERS = ["All", "Templates", "PDFs", "Guides"] as const;

const RESOURCES_DATA = [
  {
    type: "PDF" as const,
    typeClass:
      "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    icon: "file_download",
    badge: "FREE DOWNLOAD",
    title: "The Ultimate Prompt Engineering Cheatsheet",
    description:
      "PDF guide covering zero-shot, few-shot, and chain-of-thought prompting techniques.",
    ctaLabel: "Download PDF",
    ctaPrimary: false,
  },
  {
    type: "Template" as const,
    typeClass: "bg-blue-50 dark:bg-blue-900/20 text-primary",
    icon: "auto_fix_high",
    badge: "TEMPLATE",
    title: "Content Repurposing Workflow",
    description:
      "Zapier automation template to turn one YouTube video into a blog post, tweets, and newsletter.",
    ctaLabel: "Get Template",
    ctaPrimary: true,
  },
  {
    type: "Template" as const,
    typeClass:
      "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
    icon: "link",
    badge: "TEMPLATE",
    title: "Zapier: Email to Notion",
    description:
      "Connect Gmail to Notion with ChatGPT in the middle. Capture starred emails and store summaries in your workspace.",
    ctaLabel: "Get Template",
    ctaPrimary: true,
  },
  {
    type: "Guide" as const,
    typeClass:
      "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    icon: "description",
    badge: "GUIDE",
    title: "Email Summarizer v2.0",
    description:
      "Ready-to-use prompt for ChatGPT to summarize emails and extract action items. Use with Zapier or manually.",
    ctaLabel: "View Guide",
    ctaPrimary: false,
  },
  {
    type: "Guide" as const,
    typeClass: "bg-blue-50 dark:bg-blue-900/20 text-primary",
    icon: "layers",
    badge: "GUIDE",
    title: "JSON Templates",
    description:
      "Structured data templates for consistent AI outputs across multiple platforms.",
    ctaLabel: "View Guide",
    ctaPrimary: false,
  },
  {
    type: "Guide" as const,
    typeClass: "bg-blue-50 dark:bg-blue-900/20 text-primary",
    icon: "account_tree",
    badge: "GUIDE",
    title: "Automation Blueprints",
    description:
      "Visual guides for connecting multiple AI tools in a single automated chain.",
    ctaLabel: "View Guide",
    ctaPrimary: false,
  },
];

const Resources: FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    document.title = "Resources - Ai made helpful";
    return () => {
      document.title = "Ai made helpful | Practical AI Workflows";
    };
  }, []);

  const filteredResources =
    activeFilter === "All"
      ? RESOURCES_DATA
      : RESOURCES_DATA.filter((r) => {
          if (activeFilter === "Templates") return r.type === "Template";
          if (activeFilter === "PDFs") return r.type === "PDF";
          if (activeFilter === "Guides") return r.type === "Guide";
          return true;
        });

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-background-dark pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-primary mb-6">
            <span className="material-icons-outlined text-[14px] mr-1">
              folder
            </span>
            Templates & Guides
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Resources <span className="text-primary">Library</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Free automation templates, PDF guides, and blueprints to level up
            your AI workflows.
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

      {/* Resource cards grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div
              key={resource.title}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="material-icons-outlined text-slate-400">
                  {resource.icon}
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded ${resource.typeClass}`}
                >
                  {resource.badge}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                {resource.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">
                {resource.description}
              </p>
              <button
                type="button"
                className={
                  resource.ctaPrimary
                    ? "w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                    : "w-full py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-900 dark:text-white"
                }
              >
                {resource.ctaLabel}
              </button>
            </div>
          ))}
        </div>
        {filteredResources.length === 0 && (
          <p className="text-center text-slate-500 dark:text-slate-400 py-12">
            No resources in this category yet.
          </p>
        )}
      </main>
    </div>
  );
};

export default Resources;
