import { GalleryImage } from '@/types/gallery';
import mountainLandscape from '@/assets/mountain-landscape.jpg';
import abstractArt from '@/assets/abstract-art.jpg';
import oceanSunset from '@/assets/ocean-sunset.jpg';
import forestSunlight from '@/assets/forest-sunlight.jpg';
import architecture from '@/assets/architecture.jpg';
import streetArt from '@/assets/street-art.jpg';

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: mountainLandscape,
    title: 'Alpine Peak Serenity',
    alt: 'Stunning mountain landscape at golden hour with snow-capped peaks',
    tags: ['nature', 'mountains', 'landscape', 'golden hour', 'snow']
  },
  {
    id: '2',
    src: abstractArt,
    title: 'Geometric Harmony',
    alt: 'Modern abstract geometric art with vibrant colors',
    tags: ['abstract', 'art', 'geometric', 'modern', 'colorful']
  },
  {
    id: '3',
    src: oceanSunset,
    title: 'Ocean Dreams',
    alt: 'Serene ocean waves at sunset with golden reflections',
    tags: ['ocean', 'sunset', 'water', 'peaceful', 'golden hour']
  },
  {
    id: '4',
    src: forestSunlight,
    title: 'Mystical Forest',
    alt: 'Lush green forest with sunlight filtering through trees',
    tags: ['forest', 'nature', 'trees', 'sunlight', 'green']
  },
  {
    id: '5',
    src: architecture,
    title: 'Modern Minimalism',
    alt: 'Minimalist architecture with clean white walls',
    tags: ['architecture', 'minimalist', 'modern', 'design', 'white']
  },
  {
    id: '6',
    src: streetArt,
    title: 'Urban Expression',
    alt: 'Colorful street art mural with vibrant graffiti',
    tags: ['street art', 'urban', 'colorful', 'graffiti', 'culture']
  }
];

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  galleryImages.forEach(image => {
    image.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};