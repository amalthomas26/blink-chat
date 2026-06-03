/**
 * Compresses an image file in the browser using the Canvas API before upload.
 *
 * - Skips non-image files and animated GIFs (compression would break animation).
 * - Caps max dimensions at 1920×1920 while preserving aspect ratio.
 * - If compression somehow produces a larger file, the original is returned unchanged.
 *
 * @param file     The raw File from the user's input or clipboard.
 * @param maxWidth  Max pixel width of the output (default 1920).
 * @param maxHeight Max pixel height of the output (default 1920).
 * @param quality   JPEG quality 0–1 (default 0.82 — visually lossless, ~5-10× smaller).
 */
export async function compressImage(
  file: File,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.82,
): Promise<File> {
  // Skip non-images — videos, audio, PDFs are returned as-is
  if (!file.type.startsWith("image/")) return file;

  // Skip GIFs — Canvas strips the animation frames
  if (file.type === "image/gif") return file;

  return new Promise((resolve) => {
    const blobUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(blobUrl);

      // Calculate new dimensions keeping aspect ratio.
      // If the image is already within bounds, no resize happens.
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        // Canvas not available (unlikely in a modern browser) — send original
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            // Compression made the file bigger (e.g. already optimised PNG) —
            // return the original unchanged.
            resolve(file);
            return;
          }

          // Preserve the original filename but mark as JPEG
          const compressedName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
          resolve(new File([blob], compressedName, { type: "image/jpeg" }));
        },
        "image/jpeg",
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      resolve(file); // Fallback: send original on decode error
    };

    img.src = blobUrl;
  });
}
