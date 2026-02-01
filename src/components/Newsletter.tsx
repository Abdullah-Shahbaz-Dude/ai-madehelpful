import type { FC } from "react";

const Newsletter: FC = () => {
  return (
    <section className="mb-32 ">
      <div className="bg-blue-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 relative z-10">
          Stay Updated with Practical AI
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
          Get new prompts, tutorials, and automation workflows delivered as
          they&apos;re published.
        </p>
        <form
          className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 relative z-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-primary focus:border-primary text-lg"
          />
          <button
            type="submit"
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl"
          >
            Subscribe
          </button>
        </form>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 relative z-10">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
