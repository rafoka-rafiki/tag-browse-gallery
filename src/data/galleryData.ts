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
    description: 'A breathtaking view of snow-capped alpine peaks bathed in the warm glow of golden hour. The rugged mountain terrain creates a dramatic silhouette against the evening sky.',
    tags: ['nature', 'mountains', 'landscape', 'golden hour', 'snow']
  },
  {
    id: '2',
    src: abstractArt,
    title: 'Geometric Harmony',
    alt: 'Modern abstract geometric art with vibrant colors',
    description: 'A contemporary abstract composition featuring bold geometric shapes and vibrant color palettes. This piece explores the intersection of form, color, and modern design aesthetics.',
    tags: ['abstract', 'art', 'geometric', 'modern', 'colorful']
  },
  {
    id: '3',
    src: oceanSunset,
    title: 'Ocean Dreams',
    alt: 'Serene ocean waves at sunset with golden reflections',
    description: 'Peaceful ocean waves reflecting the golden hues of sunset. The rhythmic motion of water creates a meditative atmosphere as day transitions to night.',
    tags: ['ocean', 'sunset', 'water', 'peaceful', 'golden hour']
  },
  {
    id: '4',
    src: forestSunlight,
    title: 'Mystical Forest',
    alt: 'Lush green forest with sunlight filtering through trees',
    description: 'Sunlight filters through dense forest canopy, creating ethereal beams of light. The lush green vegetation and atmospheric conditions produce a mystical, tranquil environment.',
    tags: ['forest', 'nature', 'trees', 'sunlight', 'green']
  },
  {
    id: '5',
    src: architecture,
    title: 'Modern Minimalism',
    alt: 'Minimalist architecture with clean white walls',
    description: 'Clean lines and pure white surfaces define this minimalist architectural study. The simplicity of form emphasizes space, light, and geometric precision.',
    tags: ['architecture', 'minimalist', 'modern', 'design', 'white']
  },
  {
    id: '6',
    src: streetArt,
    title: 'Urban Expression',
    alt: 'Colorful street art mural with vibrant graffiti',
    description: 'A vibrant street art mural showcasing bold colors and dynamic forms. This urban artwork represents contemporary cultural expression and creative energy.',
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