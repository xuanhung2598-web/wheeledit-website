/**
 * Utility to parse different video URL formats and generate standard embed/thumbnail URLs.
 */
export interface ParsedVideo {
  type: 'youtube' | 'vimeo' | 'drive' | 'direct' | 'unknown';
  embedUrl: string;
  originalUrl: string;
  thumbnailUrl: string;
}

export function parseVideoUrl(url: string): ParsedVideo {
  if (!url) {
    return { type: 'unknown', embedUrl: '', originalUrl: '', thumbnailUrl: '' };
  }

  const cleanUrl = url.trim();

  // YouTube
  if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be') || cleanUrl.includes('youtube-nocookie.com')) {
    let videoId = '';
    
    if (cleanUrl.includes('youtu.be/')) {
      const parts = cleanUrl.split('youtu.be/');
      if (parts[1]) videoId = parts[1].split(/[?#]/)[0];
    } else if (cleanUrl.includes('embed/')) {
      const parts = cleanUrl.split('embed/');
      if (parts[1]) videoId = parts[1].split(/[?#]/)[0];
    } else if (cleanUrl.includes('shorts/')) {
      const parts = cleanUrl.split('shorts/');
      if (parts[1]) videoId = parts[1].split(/[?#]/)[0];
    } else if (cleanUrl.includes('v=')) {
      const urlParams = new URLSearchParams(cleanUrl.split('?')[1] || '');
      videoId = urlParams.get('v') || '';
    }

    if (videoId) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
        originalUrl: cleanUrl,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      };
    }
  }

  // Vimeo
  if (cleanUrl.includes('vimeo.com')) {
    let videoId = '';
    if (cleanUrl.includes('player.vimeo.com/video/')) {
      const parts = cleanUrl.split('video/');
      if (parts[1]) videoId = parts[1].split(/[?#]/)[0];
    } else {
      const parts = cleanUrl.split('vimeo.com/');
      if (parts[1]) videoId = parts[1].split(/[?#]/)[0];
    }

    if (videoId) {
      return {
        type: 'vimeo',
        embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
        originalUrl: cleanUrl,
        // Vimeo doesn't support easy static thumbnail URL without API, so we use a high-quality placeholder
        thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop'
      };
    }
  }

  // Google Drive
  if (cleanUrl.includes('drive.google.com')) {
    const match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      return {
        type: 'drive',
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        originalUrl: cleanUrl,
        thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop'
      };
    }
  }

  // Direct Video link
  if (/\.(mp4|webm|ogg)($|\?)/i.test(cleanUrl) || cleanUrl.includes('video/mp4')) {
    return {
      type: 'direct',
      embedUrl: cleanUrl,
      originalUrl: cleanUrl,
      thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop'
    };
  }

  return {
    type: 'unknown',
    embedUrl: cleanUrl,
    originalUrl: cleanUrl,
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop'
  };
}
