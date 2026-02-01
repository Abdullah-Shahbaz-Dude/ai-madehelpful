import type { FC } from "react";
import { Link } from "react-router-dom";

const Hero: FC = () => {
  return (
    <header className="relative pt-20 pb-24 overflow-hidden hero-gradient ">
      <div className="max-w-7xl   mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        <div className="inline-flex items-center px-4 py-2 rounded-ful  dark:bg-blue-900/30 text-primary text-sm font-semibold mb-8 border border-blue-100 dark:border-blue-800/50">
          <span className="material-icons-outlined text-sm mr-2">
            auto_awesome
          </span>
          Practical AI for Real Work
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Practical AI Real <span className="text-blue-500">Workflows</span>
          <br />
          Usable Results
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
          Learn how to use AI tools the right way with real prompts,
          step-by-step tutorials, and complete automation workflows you can
          actually apply.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/prompts"
            className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center"
          >
            Explore Prompts{" "}
            <span className="material-icons-outlined ml-2">arrow_forward</span>
          </Link>
          <Link
            to="/videos"
            className="w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center shadow-sm"
          >
            <span className="material-icons-outlined mr-2">play_circle</span>{" "}
            Latest Video
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Hero;
