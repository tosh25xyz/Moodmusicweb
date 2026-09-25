const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeSong {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

export async function searchYouTubeSongs(query: string, maxResults: number = 10): Promise<YouTubeSong[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error('YOUTUBE_API_KEY is not set in environment variables');
  }

  const url = new URL(`${YOUTUBE_API_BASE}/search`);
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('q', query);
  url.searchParams.set('type', 'video');
  url.searchParams.set('videoCategoryId', '10'); // 10 = Music category
  url.searchParams.set('maxResults', String(maxResults));
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`YouTube API error: ${response.status} - ${errorBody}`);
  }

  const data = await response.json();

  return data.items.map((item: any) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));
}