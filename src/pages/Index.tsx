import { useState, useMemo } from 'react';
import { GalleryImage, FilterState } from '@/types/gallery';
import { galleryImages, getAllTags } from '@/data/galleryData';
import { FilterBar } from '@/components/gallery/FilterBar';
import { ImageGrid } from '@/components/gallery/ImageGrid';
import { ImageModal } from '@/components/gallery/ImageModal';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    activeTags: []
  });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allTags = getAllTags();

  const filteredImages = useMemo(() => {
    return galleryImages.filter(image => {
      // Filter by search term
      const matchesSearch = filters.searchTerm === '' || 
        image.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        image.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      // Filter by active tags
      const matchesTags = filters.activeTags.length === 0 ||
        filters.activeTags.every(activeTag => image.tags.includes(activeTag));

      return matchesSearch && matchesTags;
    });
  }, [filters]);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, searchTerm: search }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      activeTags: prev.activeTags.includes(tag)
        ? prev.activeTags.filter(t => t !== tag)
        : [...prev.activeTags, tag]
    }));
  };

  const handleClearFilters = () => {
    setFilters({ searchTerm: '', activeTags: [] });
  };

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleTagClick = (tag: string) => {
    if (!filters.activeTags.includes(tag)) {
      handleTagToggle(tag);
    }
  };

  return (
    <div className="min-h-screen bg-gallery-bg">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Image Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of stunning images. Click on any image to view it in full size, 
            or use the tags to filter by category.
          </p>
        </header>

        <FilterBar 
          filters={filters}
          allTags={allTags}
          onSearchChange={handleSearchChange}
          onTagToggle={handleTagToggle}
          onClearFilters={handleClearFilters}
        />

        <main>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredImages.length} of {galleryImages.length} images
            </p>
          </div>

          <ImageGrid 
            images={filteredImages}
            onImageClick={handleImageClick}
            onTagClick={handleTagClick}
          />
        </main>

        <ImageModal 
          image={selectedImage}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onTagClick={handleTagClick}
        />
      </div>
    </div>
  );
};

export default Index;