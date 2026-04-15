type YouTubePlaylistItem = {
  contentDetails?: {
    videoId?: string;
  };
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    thumbnails?: Record<
      string,
      { url: string; width?: number; height?: number }
    >;
  };
};

type YouTubeVideoItem = {
  id?: string;
  contentDetails?: {
    duration?: string;
  };
  statistics?: {
    viewCount?: string;
  };
};

function pickBestThumbnail(
  thumbnails:
    | Record<string, { url: string; width?: number; height?: number }>
    | undefined,
) {
  if (!thumbnails) return undefined;
  return (
    thumbnails.maxres ||
    thumbnails.standard ||
    thumbnails.high ||
    thumbnails.medium ||
    thumbnails.default
  );
}

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `YouTube API error: ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`,
    );
  }
  return res.json() as Promise<any>;
}

async function getUploadsPlaylistId(params: {
  apiKey: string;
  channelHandle?: string;
  channelId?: string;
}) {
  const { apiKey, channelHandle, channelId } = params;

  const handle = channelHandle?.replace(/^@/, "");
  const base = "https://www.googleapis.com/youtube/v3/channels";

  const query = new URLSearchParams({
    part: "contentDetails",
    key: apiKey,
  });

  if (channelId) query.set("id", channelId);
  else if (handle) query.set("forHandle", handle);
  else throw new Error("Missing channel identifier");

  try {
    const data = await fetchJson(`${base}?${query.toString()}`);

    const uploads = data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (uploads) return uploads as string;
  } catch {
    // Fall through to search-based resolution
  }

  if (!handle)
    throw new Error("Could not resolve uploads playlist id for channel");

  const searchParams = new URLSearchParams({
    part: "snippet",
    q: handle,
    type: "channel",
    maxResults: "1",
    key: apiKey,
  });

  const searchData = await fetchJson(
    `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`,
  );

  const resolvedChannelId = searchData?.items?.[0]?.snippet?.channelId;
  if (!resolvedChannelId)
    throw new Error("Could not resolve channel id from handle");

  const byIdParams = new URLSearchParams({
    part: "contentDetails",
    id: resolvedChannelId,
    key: apiKey,
  });

  const byIdData = await fetchJson(`${base}?${byIdParams.toString()}`);
  const uploads =
    byIdData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads)
    throw new Error("Could not resolve uploads playlist id for channel");
  return uploads as string;
}

function parseIso8601DurationToSeconds(duration: string | undefined) {
  if (!duration) return undefined;
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return undefined;
  const hours = match[1] ? Number(match[1]) : 0;
  const minutes = match[2] ? Number(match[2]) : 0;
  const seconds = match[3] ? Number(match[3]) : 0;
  return hours * 3600 + minutes * 60 + seconds;
}

function formatSecondsToDurationLabel(totalSeconds: number | undefined) {
  if (totalSeconds === undefined) return undefined;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0)
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default async function handler(req: any, res: any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Missing YOUTUBE_API_KEY env var" });
      return;
    }

    const pageToken =
      typeof req.query.pageToken === "string" ? req.query.pageToken : undefined;
    const maxResultsRaw =
      typeof req.query.maxResults === "string"
        ? Number(req.query.maxResults)
        : 24;
    const maxResults = Number.isFinite(maxResultsRaw)
      ? Math.min(Math.max(maxResultsRaw, 1), 50)
      : 24;

    const uploadsPlaylistId = await getUploadsPlaylistId({
      apiKey,
      channelHandle: "@AIMadeUseful",
    });

    const playlistParams = new URLSearchParams({
      part: "snippet,contentDetails",
      playlistId: uploadsPlaylistId,
      maxResults: String(maxResults),
      key: apiKey,
    });

    if (pageToken) playlistParams.set("pageToken", pageToken);

    const playlistData = await fetchJson(
      `https://www.googleapis.com/youtube/v3/playlistItems?${playlistParams.toString()}`,
    );

    const items: YouTubePlaylistItem[] = playlistData?.items ?? [];
    const videoIds = items
      .map((it) => it.contentDetails?.videoId)
      .filter((id): id is string => Boolean(id));

    let statsById = new Map<
      string,
      { durationLabel?: string; viewCount?: number }
    >();
    if (videoIds.length > 0) {
      const videosParams = new URLSearchParams({
        part: "contentDetails,statistics",
        id: videoIds.join(","),
        key: apiKey,
        maxResults: String(videoIds.length),
      });

      const videosData = await fetchJson(
        `https://www.googleapis.com/youtube/v3/videos?${videosParams.toString()}`,
      );

      const videoItems: YouTubeVideoItem[] = videosData?.items ?? [];
      for (const v of videoItems) {
        const id = v.id;
        if (!id) continue;
        const seconds = parseIso8601DurationToSeconds(
          v.contentDetails?.duration,
        );
        const durationLabel = formatSecondsToDurationLabel(seconds);
        const viewCount = v.statistics?.viewCount
          ? Number(v.statistics.viewCount)
          : undefined;
        statsById.set(id, { durationLabel, viewCount });
      }
    }

    const videos = items
      .map((it) => {
        const videoId = it.contentDetails?.videoId;
        if (!videoId) return undefined;
        const thumb = pickBestThumbnail(it.snippet?.thumbnails);
        const stats = statsById.get(videoId);

        return {
          videoId,
          title: it.snippet?.title ?? "",
          description: it.snippet?.description ?? "",
          publishedAt: it.snippet?.publishedAt ?? "",
          thumbnailUrl: thumb?.url,
          durationLabel: stats?.durationLabel,
          viewCount: stats?.viewCount,
        };
      })
      .filter((v): v is NonNullable<typeof v> => Boolean(v));

    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");

    res.status(200).json({
      videos,
      nextPageToken: playlistData?.nextPageToken ?? null,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    res.status(500).json({ error: message });
  }
}
