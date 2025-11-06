export default function firebaseImageLoader({ src, width, quality }) {
  const encodedSrc = encodeURIComponent(src);
  const q = quality || 75;
  return `/fah/image/?img=${encodedSrc}&w=${width}&q=${q}`;
}