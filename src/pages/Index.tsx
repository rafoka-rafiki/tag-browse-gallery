import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GalleryImage, FilterState } from '@/types/gallery';
import { galleryImages, getAllTags } from '@/data/galleryData';
import { FilterBar } from '@/components/gallery/FilterBar';
import { ImageGrid } from '@/components/gallery/ImageGrid';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Loading } from '@/components/ui/loading';
import { MainMenu } from '@/components/MainMenu';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    activeTags: []
  });
  const [archiveMode, setArchiveMode] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(true);

  useEffect(() => {
    if (location.state) {
      const state = location.state as any;
      if (state.selectedTag) {
        setSelectedTag(state.selectedTag);
        setArchiveMode(null);
        setShowMainMenu(false);
      } else if (state.archiveMode) {
        setArchiveMode(state.archiveMode);
        setSelectedTag(null);
        setShowMainMenu(false);
      } else if (state.showMainMenu) {
        setShowMainMenu(true);
        setArchiveMode(null);
        setSelectedTag(null);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const allTags = getAllTags();

  const filteredImages = useMemo(() => {
    let imagesToFilter = galleryImages;
    
    // Selected tag filtering
    if (selectedTag) {
      imagesToFilter = galleryImages.filter(image => 
        image.tags.includes(selectedTag)
      );
    }
    // Archive folder filtering
    else if (archiveMode) {
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

      // Filter by active tags (only when not in selectedTag mode)
      const matchesTags = selectedTag || filters.activeTags.length === 0 ||
        filters.activeTags.every(activeTag => image.tags.includes(activeTag));

      return matchesSearch && matchesTags;
    });
  }, [filters, archiveMode, selectedTag]);

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
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/image/${image.id}`);
      setIsLoading(false);
    }, 800);
  };

  const handleTagClick = (tag: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedTag(tag);
      setArchiveMode(null);
      setFilters({ searchTerm: '', activeTags: [] });
      setIsLoading(false);
    }, 800);
  };

  const handleArchiveFolderClick = (folderTag: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setArchiveMode(folderTag);
      setSelectedTag(null);
      setFilters({ searchTerm: '', activeTags: [] });
      setShowMainMenu(false);
      setIsLoading(false);
    }, 800);
  };

  const handleShowAll = () => {
    setIsLoading(true);
    setTimeout(() => {
      setArchiveMode(null);
      setSelectedTag(null);
      setFilters({ searchTerm: '', activeTags: [] });
      setShowMainMenu(false);
      setIsLoading(false);
    }, 800);
  };

  const handleEnterGallery = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowMainMenu(false);
      setIsLoading(false);
    }, 800);
  };

  const handleBackToMainMenu = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowMainMenu(true);
      setArchiveMode(null);
      setSelectedTag(null);
      setFilters({ searchTerm: '', activeTags: [] });
      setIsLoading(false);
    }, 800);
  };

  const getPageTitle = () => {
    if (selectedTag) {
      return `${selectedTag.charAt(0).toUpperCase() + selectedTag.slice(1)}`;
    }
    if (archiveMode) {
      return `${archiveMode.charAt(0).toUpperCase() + archiveMode.slice(1)} Archive`;
    }
    return 'Image Gallery';
  };

  const getPageDescription = () => {
    if (selectedTag) {
      return `Images tagged with ${selectedTag}`;
    }
    if (archiveMode) {
      return `Browse our ${archiveMode} collection`;
    }
    return 'Explore our curated collection of stunning images';
  };

  if (showMainMenu) {
    return (
      <>
        <MainMenu 
          onArchiveFolderClick={handleArchiveFolderClick}
          onEnterGallery={handleEnterGallery}
        />
        <Loading isVisible={isLoading} />
      </>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full font-mono">
        <AppSidebar 
          onArchiveFolderClick={handleArchiveFolderClick}
          onTagClick={handleTagClick}
          onShowAll={handleShowAll}
          onBackToMainMenu={handleBackToMainMenu}
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
                  {selectedTag && ` tagged with ${selectedTag}`}
                </p>
              </div>

              <ImageGrid 
                images={filteredImages}
                onImageClick={handleImageClick}
                onTagClick={handleTagClick}
              />
            </main>
          </div>
        </SidebarInset>
      </div>
      <Loading isVisible={isLoading} />
    </SidebarProvider>
  );
};

export default Index;