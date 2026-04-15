type YouTubeVideoItem = {
  id?: string
  snippet?: {
    title?: string
    description?: string
    publishedAt?: string
    channelTitle?: string
    thumbnails?: Record<string, { url: string; width?: number; height?: number }>
  }
  contentDetails?: {
    duration?: string
  }
  statistics?: {
    viewCount?: string
  }
}

function pickBestThumbnail(
  thumbnails: Record<string, { url: string; width?: number; height?: number }> | undefined
) {
  if (!thumbnails) return undefined
  return (
    thumbnails.maxres ||
    thumbnails.standard ||
    thumbnails.high ||
    thumbnails.medium ||
    thumbnails.default
  )
}

async function fetchJson(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`YouTube API error: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`)
  }
  return res.json() as Promise<any>
}

function parseIso8601DurationToSeconds(duration: string | undefined) {
  if (!duration) return undefined
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/)
  if (!match) return undefined
  const hours = match[1] ? Number(match[1]) : 0
  const minutes = match[2] ? Number(match[2]) : 0
  const seconds = match[3] ? Number(match[3]) : 0
  return hours * 3600 + minutes * 60 + seconds
}

function formatSecondsToDurationLabel(totalSeconds: number | undefined) {
  if (totalSeconds === undefined) return undefined
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export default async function handler(req: any, res: any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    if (!apiKey) {
      res.status(500).json({ error: 'Missing YOUTUBE_API_KEY env var' })
      return
    }

    const id = typeof req.query.id === 'string' ? req.query.id : undefined
    if (!id) {
      res.status(400).json({ error: 'Missing id query parameter' })
      return
    }

    const params = new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      id,
      key: apiKey,
    })

    const data = await fetchJson(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`)

    const item: YouTubeVideoItem | undefined = data?.items?.[0]
    if (!item?.id) {
      res.status(404).json({ error: 'Video not found' })
      return
    }

    const thumb = pickBestThumbnail(item.snippet?.thumbnails)
    const seconds = parseIso8601DurationToSeconds(item.contentDetails?.duration)

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600')

    res.status(200).json({
      videoId: item.id,
      title: item.snippet?.title ?? '',
      description: item.snippet?.description ?? '',
      publishedAt: item.snippet?.publishedAt ?? '',
      channelTitle: item.snippet?.channelTitle ?? '',
      thumbnailUrl: thumb?.url,
      durationLabel: formatSecondsToDurationLabel(seconds),
      viewCount: item.statistics?.viewCount ? Number(item.statistics.viewCount) : undefined,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    res.status(500).json({ error: message })
  }
}
