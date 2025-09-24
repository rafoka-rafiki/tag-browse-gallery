import { GalleryImage } from '@/types/gallery';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ImageModalProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}

export const ImageModal = ({ image, isOpen, onClose, onTagClick }: ImageModalProps) => {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-gallery-card shadow-modal animate-scale-in">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-gallery-overlay/50 hover:bg-gallery-overlay/70 text-white rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto max-h-[60vh] object-contain"
          />
        </div>
        
        <div className="p-6">
          <DialogTitle className="text-xl font-mono font-bold text-foreground mb-4">
            {image.title}
          </DialogTitle>
          
          <div className="flex flex-wrap gap-2">
            {image.tags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer font-mono text-xs bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => {
                  onTagClick(tag);
                  onClose();
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};