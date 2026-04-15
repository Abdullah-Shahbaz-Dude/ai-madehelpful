import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { FC } from "react";

type VideoResponse = {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  channelTitle: string;
  thumbnailUrl?: string;
  durationLabel?: string;
  viewCount?: number;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatViews(views: number | undefined) {
  if (views === undefined) return undefined;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views} views`;
}

const VideoDetail: FC = () => {
  const { videoId } = useParams();
  const [data, setData] = useState<VideoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  const embedUrl = useMemo(() => {
    if (!videoId) return "";
    const url = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("rel", "0");
    return url.toString();
  }, [videoId]);

  useEffect(() => {
    setPlaying(false);
  }, [videoId]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      if (!videoId) {
        setError("Missing video id");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/youtube/video?id=${encodeURIComponent(videoId)}`,
          { signal: controller.signal },
        );
        const contentType = res.headers.get("content-type") || "";
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(
            body?.error || `Failed to load video (${res.status})`,
          );
        }
        if (!contentType.includes("application/json")) {
          throw new Error(
            "API did not return JSON. For local testing, run `vercel dev` (Vercel functions) instead of only `npm run dev`.",
          );
        }
        const json = (await res.json()) as VideoResponse;
        setData(json);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Failed to load video");
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    void load();

    return () => controller.abort();
  }, [videoId]);

  useEffect(() => {
    document.title = loading
      ? "Video - Ai made helpful"
      : data?.title
        ? `${data.title} - Ai made helpful`
        : "Video - Ai made helpful";

    return () => {
      document.title = "Ai made helpful | Practical AI Workflows";
    };
  }, [data?.title, loading]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            <span className="material-icons-outlined text-sm mr-1">
              video_library
            </span>
            YouTube
          </span>
          <div className="flex items-center text-slate-400 text-sm">
            <Link to="/videos" className="hover:underline">
              Videos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-600 dark:text-slate-300">
              {loading ? "Loading…" : data?.title || "Video"}
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <p className="font-bold text-slate-900 dark:text-white mb-1">
              Couldn’t load this video
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {error}
            </p>
            <Link
              to="/videos"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold"
            >
              <span className="material-icons-outlined text-base">
                arrow_back
              </span>
              Back to videos
            </Link>
          </div>
        )}

        {!error && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="aspect-video relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-200 dark:border-slate-800">
                {!playing && (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="absolute inset-0 w-full h-full"
                    aria-label="Play video"
                  >
                    {data?.thumbnailUrl ? (
                      <img
                        alt="Video thumbnail preview"
                        className="w-full h-full object-cover opacity-90"
                        src={data.thumbnailUrl}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary/90 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl backdrop-blur-sm">
                        <span className="material-icons-outlined text-4xl leading-none pl-1">
                          play_arrow
                        </span>
                      </div>
                    </div>
                  </button>
                )}

                {playing && videoId && (
                  <iframe
                    title={data?.title || "YouTube video"}
                    className="absolute inset-0 w-full h-full"
                    src={embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-slate-900 dark:text-white">
                  {loading ? "Loading…" : data?.title || ""}
                </h1>

                {!loading && (
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    {data?.publishedAt ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="material-icons-outlined text-base">
                          event
                        </span>
                        {formatDate(data.publishedAt)}
                      </span>
                    ) : null}
                    {data?.durationLabel ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="material-icons-outlined text-base">
                          schedule
                        </span>
                        {data.durationLabel}
                      </span>
                    ) : null}
                    {data?.viewCount !== undefined ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="material-icons-outlined text-base">
                          visibility
                        </span>
                        {formatViews(data.viewCount)}
                      </span>
                    ) : null}
                  </div>
                )}

                {!loading && data?.description ? (
                  <p className="mt-6 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {data.description}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                  <span className="material-icons-outlined text-primary">
                    open_in_new
                  </span>
                  Open on YouTube
                </h3>
                <a
                  href={
                    videoId ? `https://www.youtube.com/watch?v=${videoId}` : "#"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Watch on YouTube
                  <span className="material-icons-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoDetail;
