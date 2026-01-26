/**
 * Generates a URL for cropping and resizing images to 150x150
 * Uses a service like Cloudinary, ImageKit, or similar
 */
export function getCroppedImageUrl(originalUrl: string, size: number = 150): string {
  // If it's already a pravatar URL, return as-is
  if (originalUrl.includes("pravatar.cc")) {
    return originalUrl;
  }

  // Option 1: Use a free service like images.weserv.nl
  const encodedUrl = encodeURIComponent(originalUrl);
  return `https://images.weserv.nl/?url=${encodedUrl}&w=${size}&h=${size}&fit=cover&a=smart`;

  // Option 2: If you're using Cloudinary (uncomment and replace with your cloud name)
  // const cloudName = 'your-cloud-name';
  // return `https://res.cloudinary.com/${cloudName}/image/fetch/w_${size},h_${size},c_fill,g_face/${originalUrl}`;
}

/**
 * Client-side image cropping using Canvas API
 */
export function cropImageToSquare(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const size = 150;
      canvas.width = size;
      canvas.height = size;

      // Calculate crop dimensions to maintain aspect ratio
      const minDimension = Math.min(img.width, img.height);
      const cropX = (img.width - minDimension) / 2;
      const cropY = (img.height - minDimension) / 2;

      // Draw cropped and resized image
      ctx?.drawImage(
        img,
        cropX,
        cropY,
        minDimension,
        minDimension, // Source crop
        0,
        0,
        size,
        size, // Destination size
      );

      // Convert to data URL
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
