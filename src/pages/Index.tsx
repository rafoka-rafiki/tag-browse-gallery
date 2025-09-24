import { useState, useMemo } from 'react';
import { GalleryImage, FilterState } from '@/types/gallery';
import { galleryImages, getAllTags } from '@/data/galleryData';
import { FilterBar } from '@/components/gallery/FilterBar';
import { ImageGrid } from '@/components/gallery/ImageGrid';
import { ImageModal } from '@/components/gallery/ImageModal';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    activeTags: []
  });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [archiveMode, setArchiveMode] = useState<string | null>(null);

  const allTags = getAllTags();

  const filteredImages = useMemo(() => {
    let imagesToFilter = galleryImages;
    
    // Archive folder filtering
    if (archiveMode) {
      imagesToFilter = galleryImages.filter(image => {
        if (archiveMode === 'nature') {
          return image.tags.some(tag => 
            ['nature', 'mountains', 'forest', 'ocean', 'trees', 'water', 'landscape'].includes(tag)
          );
        }
        if (archiveMode === 'art') {
          return image.tags.some(tag => 
            ['art', 'abstract', 'geometric', 'street art', 'graffiti', 'colorful'].includes(tag)
          );
        }
        if (archiveMode === 'architecture') {
          return image.tags.some(tag => 
            ['architecture', 'minimalist', 'modern', 'design', 'urban'].includes(tag)
          );
        }
        return true;
      });
    }
    
    return imagesToFilter.filter(image => {
      // Filter by search term
      const matchesSearch = filters.searchTerm === '' || 
        image.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        image.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      // Filter by active tags
      const matchesTags = filters.activeTags.length === 0 ||
        filters.activeTags.every(activeTag => image.tags.includes(activeTag));

      return matchesSearch && matchesTags;
    });
  }, [filters, archiveMode]);

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

  const handleArchiveFolderClick = (folderTag: string) => {
    setArchiveMode(folderTag);
    setFilters({ searchTerm: '', activeTags: [] });
  };

  const handleShowAll = () => {
    setArchiveMode(null);
    setFilters({ searchTerm: '', activeTags: [] });
  };

  const getPageTitle = () => {
    if (archiveMode) {
      return `${archiveMode.charAt(0).toUpperCase() + archiveMode.slice(1)} Archive`;
    }
    return 'Image Gallery';
  };

  const getPageDescription = () => {
    if (archiveMode) {
      return `Browse our ${archiveMode} collection`;
    }
    return 'Explore our curated collection of stunning images';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full font-mono">
        <AppSidebar 
          onArchiveFolderClick={handleArchiveFolderClick}
          onTagClick={handleTagClick}
          onShowAll={handleShowAll}
          allTags={allTags}
          activeFilters={filters.activeTags}
        />
        
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex flex-col">
                <h1 className="font-bold text-sm tracking-wide">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {getPageDescription()}
                </p>
              </div>
            </div>
          </header>

          <div className="flex-1 p-4">
            <FilterBar 
              filters={filters}
              allTags={allTags}
              onSearchChange={handleSearchChange}
              onTagToggle={handleTagToggle}
              onClearFilters={handleClearFilters}
            />

            <main className="mt-6">
              <div className="mb-4">
                <p className="text-xs font-mono text-muted-foreground">
                  {filteredImages.length} / {galleryImages.length} images
                  {archiveMode && ` in ${archiveMode}`}
                </p>
              </div>

              <ImageGrid 
                images={filteredImages}
                onImageClick={handleImageClick}
                onTagClick={handleTagClick}
              />
            </main>
          </div>

          <ImageModal 
            image={selectedImage}
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onTagClick={handleTagClick}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;