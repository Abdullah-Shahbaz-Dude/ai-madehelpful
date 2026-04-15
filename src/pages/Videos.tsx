import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";

type VideoItem = {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl?: string;
  durationLabel?: string;
  viewCount?: number;
};

type VideosResponse = {
  videos: VideoItem[];
  nextPageToken: string | null;
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

const Videos: FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<"new" | "old" | "views">("new");

  useEffect(() => {
    document.title = "Videos - Ai made helpful";
    return () => {
      document.title = "Ai made helpful | Practical AI Workflows";
    };
  }, []);

  async function fetchVideos(params: { pageToken?: string; append: boolean }) {
    const { pageToken, append } = params;
    if (append) setLoadingMore(true);
    else setLoading(true);

    setError(null);

    try {
      const url = new URL("/api/youtube/videos", window.location.origin);
      url.searchParams.set("maxResults", "24");
      if (pageToken) url.searchParams.set("pageToken", pageToken);

      const res = await fetch(url.toString());
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error || `Failed to load videos (${res.status})`);
      }

      if (!contentType.includes("application/json")) {
        throw new Error(
          "API did not return JSON. For local testing, run `vercel dev` (Vercel functions) instead of only `npm run dev`.",
        );
      }

      const json = (await res.json()) as VideosResponse;
      setVideos((prev) => (append ? [...prev, ...json.videos] : json.videos));
      setNextPageToken(json.nextPageToken);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load videos");
      if (!append) setVideos([]);
    } finally {
      if (append) setLoadingMore(false);
      else setLoading(false);
    }
  }

  useEffect(() => {
    void fetchVideos({ append: false });
  }, []);

  const filteredVideos = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? videos.filter(
          (v) =>
            v.title.toLowerCase().includes(q) ||
            v.description.toLowerCase().includes(q),
        )
      : videos;

    const sorted = [...base];

    sorted.sort((a, b) => {
      if (sort === "views") {
        const av = a.viewCount ?? -1;
        const bv = b.viewCount ?? -1;
        if (bv !== av) return bv - av;
      }

      const at = new Date(a.publishedAt).getTime();
      const bt = new Date(b.publishedAt).getTime();
      if (Number.isNaN(at) || Number.isNaN(bt)) return 0;
      return sort === "old" ? at - bt : bt - at;
    });

    return sorted;
  }, [query, sort, videos]);

  const featured = filteredVideos[0];
  const gridVideos = featured ? filteredVideos.slice(1) : filteredVideos;

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
            Latest uploads from the AIMadeUseful YouTube channel.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-2xl mx-auto">
            <div className="flex-1">
              <div className="relative">
                <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                  search
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search videos…"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "new" | "old" | "views")
              }
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
              <option value="views">Most viewed</option>
            </select>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        {!loading && featured && (
          <Link
            to={`/videos/${featured.videoId}`}
            className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-video lg:aspect-auto">
                {featured.thumbnailUrl ? (
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    src={featured.thumbnailUrl}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900" />
                )}
                <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="material-icons-outlined text-primary text-4xl">
                      play_arrow
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-10">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 block">
                  Latest upload
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight text-slate-900 dark:text-white">
                  {featured.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {featured.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-slate-500 dark:text-slate-400">
                  {featured.publishedAt ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="material-icons-outlined text-base">
                        event
                      </span>
                      {formatDate(featured.publishedAt)}
                    </span>
                  ) : null}
                  {featured.durationLabel ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="material-icons-outlined text-base">
                        schedule
                      </span>
                      {featured.durationLabel}
                    </span>
                  ) : null}
                  {featured.viewCount !== undefined ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="material-icons-outlined text-base">
                        visibility
                      </span>
                      {formatViews(featured.viewCount)}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </Link>
        )}

        {!loading && !featured && !error && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm text-center">
            <p className="text-slate-600 dark:text-slate-400">
              No videos found.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <p className="font-bold text-slate-900 dark:text-white mb-1">
              Couldn’t load videos
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {error}
            </p>
            <button
              type="button"
              onClick={() => fetchVideos({ append: false })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold"
            >
              <span className="material-icons-outlined text-base">refresh</span>
              Retry
            </button>
          </div>
        )}
      </section>

      {/* Video cards grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`sk-${i}`}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                </div>
              </div>
            ))}

          {!loading &&
            gridVideos.map((video) => (
              <Link
                key={video.videoId}
                to={`/videos/${video.videoId}`}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 block"
              >
                <div className="aspect-video relative overflow-hidden">
                  {video.thumbnailUrl ? (
                    <img
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={video.thumbnailUrl}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900" />
                  )}
                  <div className="absolute inset-0 bg-slate-900/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                      <span className="material-icons-outlined text-primary text-3xl">
                        play_arrow
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 text-slate-900 dark:text-white">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {video.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
                    {video.publishedAt ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">
                          event
                        </span>
                        {formatDate(video.publishedAt)}
                      </span>
                    ) : null}
                    {video.durationLabel ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">
                          schedule
                        </span>
                        {video.durationLabel}
                      </span>
                    ) : null}
                    {video.viewCount !== undefined ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">
                          visibility
                        </span>
                        {formatViews(video.viewCount)}
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {!loading &&
          !error &&
          filteredVideos.length > 0 &&
          gridVideos.length === 0 && (
            <p className="text-center text-slate-500 dark:text-slate-400 py-12">
              No results for your search.
            </p>
          )}

        {!loading && !error && nextPageToken && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={() => {
                if (loadingMore) return;
                void fetchVideos({
                  append: true,
                  pageToken: nextPageToken ?? undefined,
                });
              }}
              className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold hover:border-primary transition-colors inline-flex items-center gap-2"
            >
              {loadingMore ? (
                <>
                  <span className="material-icons-outlined text-base animate-spin">
                    progress_activity
                  </span>
                  Loading
                </>
              ) : (
                <>
                  Load more
                  <span className="material-icons-outlined text-base">
                    expand_more
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Videos;
