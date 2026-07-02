/**
 * Flickr static image size utility to automatically load high-quality sizes.
 * 
 * Flickr size suffixes:
 * - (no suffix): Medium 500 (500px on longest side) - Often default and blurry on modern displays
 * - _c: Medium 800 (800px on longest side)
 * - _b: Large 1024 (1024px on longest side) - Great for gallery grids
 * - _h: Large 1600 (1600px on longest side) - Great for high-res previews
 * - _k: Large 2048 (2048px on longest side) - Super crisp for ultra high-res views
 */
export function getFlickrUrl(url: string, size: 'b' | 'h' | 'k' | 'c' | 'z' | 'o' = 'b'): string {
  if (!url || !url.includes('staticflickr.com')) return url;

  // Find the file extension
  const lastDot = url.lastIndexOf('.');
  if (lastDot === -1) return url;

  const path = url.substring(0, lastDot);
  const ext = url.substring(lastDot); // e.g. .jpg or .png

  const lastUnderscore = path.lastIndexOf('_');
  if (lastUnderscore === -1) return url;

  const afterUnderscore = path.substring(lastUnderscore + 1);

  // If the segment after the last underscore has length 10, it is the photo secret (e.g., 7909ee13f4)
  // which means the original URL had NO size suffix (defaults to Medium 500).
  if (afterUnderscore.length === 10) {
    return `${path}_${size}${ext}`;
  } 
  
  // If the segment is 1-2 characters (e.g. b, h, k, c, z), it's an existing suffix. Replace it!
  if (afterUnderscore.length <= 2) {
    const baseWithoutSuffix = path.substring(0, lastUnderscore);
    return `${baseWithoutSuffix}_${size}${ext}`;
  }

  // Fallback
  return url;
}
