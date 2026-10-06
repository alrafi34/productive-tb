import { siteConfig } from "@/config/site";

export const imageCropperConfig = {
  name: "Image Cropper",
  description: "Crop photos to any size or aspect ratio, rotate them and make circle crops, right in your browser.",
  icon: "✂️",
  category: "image",
  slug: "image-cropper",
  seo: {
    title: "Image Cropper – Crop Photos Online to Any Ratio",
    description: "Crop images to 1:1, 4:3, 16:9, 4:5 or a custom size in pixels, rotate them and make circle profile pictures. Free, private, works with HEIC.",
    keywords: [
      "image cropper",
      "crop image online",
      "crop photo",
      "crop image to square",
      "circle crop image",
      "crop picture 16:9",
      "crop image for instagram",
      "crop profile picture",
      "free photo cropper",
      "crop image to size in pixels",
    ],
    og: {
      title: "Image Cropper – Crop Photos Online to Any Ratio",
      description: "Crop images to 1:1, 4:3, 16:9, 4:5 or a custom size in pixels, rotate them and make circle profile pictures. Free, private, works with HEIC.",
      url: `${siteConfig.url}/tools/image/image-cropper`,
    },
    howToSteps: [
      { name: "Open your image", text: "Drop a JPG, PNG, WebP, HEIC, GIF, BMP or AVIF image on the upload area, click to browse, or paste one with Ctrl+V (Cmd+V on a Mac)." },
      { name: "Pick an aspect ratio", text: "Choose Free, 1:1, 4:3, 3:2, 16:9, 4:5, 2:3 or 9:16. The crop box keeps that shape while you resize it." },
      { name: "Position the crop", text: "Drag the box to move it and the handles to resize it, drag across the image to draw a new box, or type the exact X, Y, width and height in pixels. Arrow keys nudge the box by 1 pixel, or 10 with Shift." },
      { name: "Rotate or make it round", text: "Rotate the photo in 90° steps if it is sideways, and tick Circle / oval crop for a round profile picture with transparent corners." },
      { name: "Crop and download", text: "Choose JPG, PNG or WebP, click Crop image, then download the result." },
    ],
    faq: [
      { q: "Is my photo uploaded anywhere?", a: "No. We do not collect or store your files." },
      { q: "Does cropping reduce the image quality?", a: "The pixels you keep are copied exactly; nothing is resized. Saving as PNG keeps them lossless. JPG and WebP are compressed again at the quality you choose, and at 90% or above the difference is very hard to see." },
      { q: "What aspect ratio should I use for social media?", a: "Common choices are 1:1 for profile pictures and square posts, 4:5 for portrait Instagram and Facebook feed posts, 16:9 for YouTube thumbnails, X (Twitter) and LinkedIn link images, and 9:16 for Stories, Reels, Shorts and TikTok. Platforms change their recommendations, so check their help pages for exact pixel sizes." },
      { q: "How do I crop an image to an exact size in pixels?", a: "Type the width and height in the Width and Height boxes, then X and Y for the top-left corner. If the photo is smaller than the size you need, crop to the right aspect ratio here and then enlarge it with an image resizer." },
      { q: "How do I make a circle profile picture?", a: "Choose 1:1, position the box over the face and tick Circle / oval crop. The corners outside the circle are saved as transparent, so the image is saved as PNG or WebP." },
      { q: "Can I crop HEIC photos from an iPhone?", a: "Yes. HEIC photos are converted and can be saved as JPG, PNG or WebP after cropping." },
      { q: "Is the photo's location data kept?", a: "No. The cropped image is drawn from the pixels only, so EXIF details such as camera model and GPS location are not copied." },
    ],
  },
};
