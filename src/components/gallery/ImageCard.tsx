import { GalleryImage } from '@/types/gallery';
import { Badge } from '@/components/ui/badge';

interface ImageCardProps {
  image: GalleryImage;
  onImageClick: (image: GalleryImage) => void;
  onTagClick: (tag: string) => void;
}

export const ImageCard = ({ image, onImageClick, onTagClick }: ImageCardProps) => {
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    onTagClick(tag);
  };

  return (
    <div 
      className="group cursor-pointer bg-card border border-border hover:border-primary/20 transition-all duration-300"
      onClick={() => onImageClick(image)}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={image.src} 
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="p-3">
        <h3 className="font-mono font-medium text-sm text-foreground mb-2 group-hover:text-primary transition-colors">
          {image.title}
        </h3>
        
        <div className="flex flex-wrap gap-1">
          {image.tags.map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs cursor-pointer font-mono bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={(e) => handleTagClick(e, tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};