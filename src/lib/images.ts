import { isReception } from './invite'

// Auto-import all images from src/images/
const imageModules = import.meta.glob('../images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const allImages: string[] = Object.values(imageModules)

// Specific photos — fallback gracefully
const find = (name: string) =>
  Object.entries(imageModules).find(([k]) => k.includes(name))?.[1]

export const groomPhoto = find('groom') ?? find('couple.jpg') ?? allImages[0]

export const bridePhoto = isReception
  ? (find('bride') ?? find('couple-2.jpg') ?? allImages[1] ?? allImages[0])
  : (find('bride') ?? find('couple.jpg') ?? allImages[1] ?? allImages[0])

export const heroPhoto = isReception
  ? (find('couple-2.jpg') ?? find('couple2') ?? allImages[0])
  : (find('couple.jpg') ?? allImages[0])

export const galleryPhotos: string[] = allImages
