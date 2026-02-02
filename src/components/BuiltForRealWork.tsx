import type { FC } from "react";

const items = [
  {
    title: "Practical First",
    subtitle:
      "Every video and guide is based on real use cases, not abstract examples.",
  },
  {
    title: "Prompts You Can Reuse",
    subtitle:
      "All prompts used in demonstrations are available, structured, and ready to copy.",
  },
  {
    title: "Step-by-Step Workflows",
    subtitle:
      "Complex automations are broken down into simple, repeatable steps.",
  },
  {
    title: "Beginner-Friendly, Scalable",
    subtitle: "Clear enough for beginners, useful enough for professionals.",
  },
];

const BuiltForRealWork: FC = () => {
  return (
    <section className="grid lg:grid-cols-2 gap-16 items-center mb-32 bg-slate-900 dark:bg-slate-950 text-white p-12 md:p-20 rounded-[3rem]">
      <div>
        <h2 className="text-4xl font-extrabold mb-8">
          Built for Real Work Not AI Hype
        </h2>
        <p className="text-lg text-slate-400 leading-relaxed mb-10">
          Ai made helpful is focused on showing how AI tools actually fit into
          daily work. No buzzwords. No theory-only explanations. Every tutorial
          prompt and workflow is demonstrated in real scenarios so you can apply
          it immediately.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-white/5 rounded-2xl">
            <h5 className="text-2xl font-bold mb-1">500+</h5>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
              Verified Prompts
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl">
            <h5 className="text-2xl font-bold mb-1">50k+</h5>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
              Active Students
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`border-l-4 pl-6 ${
              index === 0 ? "border-primary" : "border-primary/40"
            }`}
          >
            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
            <p className="text-slate-400 text-sm">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuiltForRealWork;
