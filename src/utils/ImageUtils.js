export const optimizedImage = (url, width = 400) => {
  if (!url) return '';
  return `${url}?format=webp&width=${width}`; // CDN Optimized
};
