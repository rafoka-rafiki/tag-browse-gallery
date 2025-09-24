import { GalleryImage } from '@/types/gallery';
import { Badge } from '@/components/ui/badge';

interface ImageCardProps {
  image: GalleryImage;
  onImageClick: (image: GalleryImage) => void;
  onTagClick: (tag: string) => void;
}

export const ImageCard = ({ image, onImageClick, onTagClick }: ImageCardProps) => {
  return (
    <article 
      className="group bg-gallery-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:bg-gallery-card-hover animate-fade-in"
      role="article"
      aria-labelledby={`image-title-${image.id}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          onClick={() => onImageClick(image)}
          loading="lazy"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onImageClick(image);
            }
          }}
          role="button"
          aria-label={`View ${image.title} in full size`}
        />
        <div className="absolute inset-0 bg-gallery-overlay/0 group-hover:bg-gallery-overlay/20 transition-all duration-300" />
      </div>
      
      <div className="p-4 space-y-3">
        <h3 
          id={`image-title-${image.id}`}
          className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
        >
          {image.title}
        </h3>
        
        <div className="flex flex-wrap gap-2" role="list" aria-label="Image tags">
          {image.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-gallery-tag hover:bg-gallery-tag-hover text-foreground cursor-pointer transition-all duration-200 hover:scale-105 text-xs"
              onClick={() => onTagClick(tag)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onTagClick(tag);
                }
              }}
              role="button"
              aria-label={`Filter by ${tag} tag`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
};