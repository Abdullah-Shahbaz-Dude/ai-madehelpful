import { useEffect, useState } from "react";
import type { FC } from "react";

const NOTEBOOKLM_LIBRARY = [
  {
    title: "Use Case 1: Weekly Synthesis: Review One Subject in 15 Minutes",
    prompts: [
      {
        title: "Step 1: Big Picture Summary",
        text: "Summarize the key concepts covered across all uploaded sources this week and identify the two or three most important ideas I need to understand deeply before the next lecture.",
      },
      {
        title: "Step 2: Find Connections and Contradictions",
        text: "Are there any points where the journal article contradicts or adds nuance to what was covered in the lecture slides?",
      },
      {
        title: "Step 3: Self Check Questions",
        text: "Based on all uploaded sources, give me five questions I should be able to answer confidently after this week. Include at least one question that requires me to connect ideas from both the lecture and the journal article.",
      },
    ],
  },
  {
    title: "Use Case 2: Active Learning: Flashcards, Quizzes, Mind Maps",
    prompts: [
      {
        title: "Generate Custom Flashcards",
        text: "Generate 10 flashcards on [YOUR TOPIC]. Format as Question on the front and Answer on the back. Keep answers under 20 words.",
      },
      {
        title: "Export for Anki or Quizlet",
        text: "Export these flashcards in CSV format compatible with Anki and Quizlet. Add a third column for Difficulty Level: Easy, Medium, or Hard.",
      },
      {
        title: "Comparison Table",
        text: "Create a comparison table on [TOPIC A] vs [TOPIC B] showing [criteria like causes, cures, role of government, advantages, disadvantages].",
      },
    ],
  },
  {
    title: "Use Case 3: Multimedia Magic: Audio and Video Overviews",
    prompts: [
      {
        title: "Beginner Friendly Audio",
        text: "Explain this like I am a complete beginner. (Use this as a custom instruction when generating Audio Overview from the Studio panel)",
      },
      {
        title: "Viva Ready Audio",
        text: "Make this perfect for my FYP viva. Clear, step by step, professional tone. (Use this as a custom instruction when generating Audio Overview)",
      },
    ],
  },
  {
    title: "Use Case 4: Concept Mastery: Understand Any Difficult Topic",
    prompts: [
      {
        title: "Break It Down",
        text: "Explain [DIFFICULT CONCEPT] to a beginner. Use only my uploaded sources. Start with a real world analogy, then show the formula, then walk through a worked example step by step.",
      },
    ],
  },
  {
    title: "Use Case 5: Textbook and Lecture Note Processor",
    prompts: [
      {
        title: "Transform Raw Notes into Study Guide",
        text: "You are a university professor. Transform my raw notes into a structured study guide. Include: core concepts, key terminology, concept relationships, real world applications, common misconceptions, memory aids, and five self test questions at the end.",
      },
      {
        title: "Break Down Textbook Chapter",
        text: "Break down this textbook chapter into digestible sections. Identify the three hardest concepts and provide simplified explanations for each.",
      },
      {
        title: "Targeted Exam Questions from Pages",
        text: "Create 15 exam questions covering only pages 45 to 70 of this textbook.",
      },
    ],
  },
  {
    title: "Use Case 6: Research and Writing Support",
    prompts: [
      {
        title: "Synthesis Table",
        text: "Make a synthesis table of all these papers showing: author, methodology, key finding, and limitations.",
      },
      {
        title: "Essay Outline",
        text: "Give me a detailed essay outline on [YOUR TOPIC] including sections on challenges, policy frameworks, technological barriers, and case studies.",
      },
    ],
  },
  {
    title: "Use Case 7: Build a Literature Review in One Hour",
    prompts: [
      {
        title: "Chronological Synthesis Table",
        text: "Generate a synthesis table showing how the research findings and policy recommendations across these papers have changed from the earliest to the most recent publication. Use these columns: Author and Year, Main Argument, Key Finding, Policy Recommendation.",
      },
      {
        title: "Research Gaps and Contradictions",
        text: "What are the main research gaps, contradictions between authors, and suggested future directions across all uploaded papers?",
      },
      {
        title: "Opposing Arguments",
        text: "Which two or three papers have the most directly opposing arguments? Summarize the core disagreement in plain language.",
      },
      {
        title: "Generate Research Questions",
        text: "Based on these gaps, suggest three research questions that directly address what is missing.",
      },
    ],
  },
  {
    title: "Use Case 8: Exam Question Predictor",
    prompts: [
      {
        title: "Predict Exam Questions",
        text: "Based only on the syllabus, past paper patterns, and my notes, predict 20 likely exam questions. Include a mix of MCQs, short answers, and one long question. Provide complete model answers.",
      },
      {
        title: "Convert to Quiz",
        text: "Convert the predicted questions into a quiz so I can self-test. (Or use the Quiz button in Studio panel)",
      },
    ],
  },
  {
    title: "Use Case 9: Grammar and Clarity Checker",
    prompts: [
      {
        title: "Fix and Compare",
        text: "Check this paragraph for grammar and clarity. Preserve my original meaning. Show a side by side comparison and explain each major change in one sentence.",
      },
      {
        title: "Apply Professor Feedback",
        text: "My professor said [paste feedback here]. Fix my writing specifically to address what the professor mentioned.",
      },
    ],
  },
  {
    title: "Use Case 10: Citation and Reference Formatter",
    prompts: [
      {
        title: "Format and Validate References",
        text: "Convert these references into APA 7th edition format. Validate capitalisation, journal italics, volume and issue numbers, page numbers, and DOI. Flag any missing fields.",
      },
      {
        title: "Multi Format Comparison",
        text: "Now convert the same list to MLA 9 and Chicago notes bibliography format. Show all three side by side for comparison.",
      },
    ],
  },
  {
    title: "Use Case 11: Research Paper Structure Builder",
    prompts: [
      {
        title: "Literature Review Outline",
        text: "Based only on my uploaded sources, build me a detailed literature review outline for a 3000 word paper on [YOUR TOPIC]. Include sections, three to four key points per section drawn from the papers, and suggested word counts for each section.",
      },
    ],
  },
  {
    title: "Use Case 12: Debug Your Code Without Copying Solutions",
    prompts: [
      {
        title: "Guided Debugging",
        text: "This Python function returns incorrect results. Explain the bug step by step WITHOUT writing the complete solution. Guide me on how to fix it so I actually understand it.",
      },
    ],
  },
  {
    title: "Use Case 13: Lab Reports and Data Analysis",
    prompts: [
      {
        title: "Analyze Data Trends",
        text: "Analyze the trends and patterns in the lab data and identify any anomalies.",
      },
      {
        title: "Choose Statistical Test",
        text: "Which statistical test should I use for this type of data and why?",
      },
      {
        title: "Draft Discussion Section",
        text: "Draft the discussion section with proper citations to the theory in my uploaded protocol.",
      },
      {
        title: "Rubric Check",
        text: "Does my discussion draft address all the rubric criteria? What is missing?",
      },
    ],
  },
  {
    title: "Use Case 14: Language Barrier Breaker",
    prompts: [
      {
        title: "Simplify and Translate Key Terms",
        text: "Explain Section 2 of this paper in simple English. For the five most technical terms in that section, provide a brief Arabic and Urdu translation alongside the English explanation.",
      },
      {
        title: "Bilingual Flashcards",
        text: "Make bilingual flashcards. English term on the front, [YOUR LANGUAGE] plus a simple English explanation on the back.",
      },
    ],
  },
  {
    title: "Use Case 15: Group Project Supercharger",
    prompts: [
      {
        title: "Unified Project Brief",
        text: "Combine all our uploaded sources into one clean project brief with a unified argument.",
      },
      {
        title: "Debate Points",
        text: "Generate strong debate points for both sides of our central question using all uploaded materials.",
      },
      {
        title: "Slide Deck Outline",
        text: "Create a complete slide deck using everything we uploaded, organised logically.",
      },
    ],
  },
  {
    title: "Use Case 16: Presentation and Viva Dominator",
    prompts: [
      {
        title: "Predict Committee Questions",
        text: "Generate 20 tough questions my thesis committee might ask about my methodology and findings. Include strong sample answers for each.",
      },
      {
        title: "Find Weak Points",
        text: "What are the three weakest arguments in my thesis? How should I defend them?",
      },
      {
        title: "Compare with Strong Theses",
        text: "How does my methodology compare to these? Where is it stronger and where does it fall short?",
      },
    ],
  },
  {
    title: "Use Case 17: Internship and Job Prep Machine",
    prompts: [
      {
        title: "Tailored Cover Letter",
        text: "Write a tailored cover letter that matches my CV to this specific job description. Highlight my most relevant skills and experiences.",
      },
      {
        title: "Mock Interview Questions",
        text: "Give me 15 realistic mock interview questions based on my CV and this job description. Include strong sample answers for each.",
      },
      {
        title: "30 Day Skill Up Plan",
        text: "Build me a practical 30 day skill up plan to make me more competitive for this role.",
      },
    ],
  },
  {
    title: "Use Case 18: Burnout Proof Weekly Planner",
    prompts: [
      {
        title: "Personalized Weekly Schedule",
        text: "Build me a realistic weekly study schedule. Prioritize my weakest subjects. Work around my evening energy dip.",
      },
    ],
  },
] as const;

const NotebookLMPrompts: FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(
        () => setCopiedId((prev) => (prev === id ? null : prev)),
        1200,
      );
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.title = "NotebookLM Prompt Library - Ai made helpful";
    return () => {
      document.title = "Ai made helpful | Practical AI Workflows";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-background-dark pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-primary mb-6">
            <span className="material-icons-outlined text-[14px] mr-1">
              library_books
            </span>
            Prompt Library
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
            NotebookLM <span className="text-primary">Prompt Library</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            18 ready-to-use prompt sets for university students.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {NOTEBOOKLM_LIBRARY.map((useCase, idx) => (
            <details
              key={useCase.title}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
            >
              <summary className="list-none cursor-pointer select-none px-6 py-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-bold text-slate-900 dark:text-white">
                    {useCase.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {useCase.prompts.length} prompt
                    {useCase.prompts.length === 1 ? "" : "s"}
                  </p>
                </div>
                <span className="material-icons-outlined text-slate-400 group-open:rotate-180 transition-transform mt-0.5">
                  expand_more
                </span>
              </summary>

              <div className="px-6 pb-6">
                <div className="space-y-4">
                  {useCase.prompts.map((p, pIdx) => {
                    const id = `notebooklm-${idx}-${pIdx}`;
                    const isCopied = copiedId === id;

                    return (
                      <div
                        key={p.title}
                        className="border border-slate-200 dark:border-slate-700 rounded-2xl p-5 bg-slate-900/[0.03] dark:bg-slate-950/40 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 mb-2">
                              Prompt
                            </span>
                            <h3 className="font-bold text-slate-900 dark:text-white">
                              {p.title}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(p.text, id)}
                            className={
                              isCopied
                                ? "shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold"
                                : "shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:border-primary transition-colors"
                            }
                            aria-label="Copy prompt"
                          >
                            <span className="material-icons-outlined text-[16px]">
                              {isCopied ? "check" : "content_copy"}
                            </span>
                            {isCopied ? "Copied" : "Copy"}
                          </button>
                        </div>

                        <p className="text-sm text-slate-800 dark:text-slate-200 mt-3 leading-relaxed whitespace-pre-wrap font-mono">
                          {p.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </details>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotebookLMPrompts;
