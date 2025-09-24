import { GalleryImage } from '@/types/gallery';
import { ImageCard } from './ImageCard';

interface ImageGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
  onTagClick: (tag: string) => void;
}

export const ImageGrid = ({ images, onImageClick, onTagClick }: ImageGridProps) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No images match your current filters.</p>
        <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or removing some tags.</p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="grid"
      aria-label={`Image gallery with ${images.length} images`}
    >
      {images.map((image) => (
        <div key={image.id} role="gridcell">
          <ImageCard 
            image={image} 
            onImageClick={onImageClick}
            onTagClick={onTagClick}
          />
        </div>
      ))}
    </div>
  );
};