import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";

type VideoItem = {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
};

type VideosResponse = {
  videos: VideoItem[];
  nextPageToken: string | null;
};

const LatestVideo: FC = () => {
  const [video, setVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch("/api/youtube/videos?maxResults=1", {
          signal: controller.signal,
        });
        const contentType = res.headers.get("content-type") || "";
        if (!res.ok) return;
        if (!contentType.includes("application/json")) return;
        const json = (await res.json()) as VideosResponse;
        setVideo(json.videos[0] ?? null);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setVideo(null);
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  return (
    <section className="mb-32 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 block">
          New on YouTube
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
          {video?.title || "Latest from the channel"}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          {video?.description ||
            "Watch the newest upload from the AIMadeUseful YouTube channel."}
        </p>
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider">
            Resources mentioned
          </h3>
          <a
            href="#"
            className="flex items-center p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary transition-colors"
          >
            <span className="material-icons-outlined text-primary mr-3">
              file_download
            </span>
            <span className="font-medium">
              Zapier Template: Email to Notion
            </span>
          </a>
          <a
            href="#"
            className="flex items-center p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary transition-colors"
          >
            <span className="material-icons-outlined text-primary mr-3">
              description
            </span>
            <span className="font-medium">Prompt: Email Summarizer v2</span>
          </a>
        </div>
      </div>
      <Link
        to={video ? `/videos/${video.videoId}` : "/videos"}
        className="relative group cursor-pointer block"
      >
        <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {video?.thumbnailUrl ? (
            <img
              alt="Video thumbnail"
              className="w-full h-full object-cover aspect-video"
              src={video.thumbnailUrl}
            />
          ) : (
            <div className="w-full aspect-video bg-slate-900" />
          )}
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center group-hover:bg-slate-900/20 transition-all">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
              <span className="material-icons-outlined text-primary text-4xl">
                play_arrow
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default LatestVideo;
