import { useParams, useNavigate } from 'react-router-dom';
import { galleryImages, getAllTags } from '@/data/galleryData';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loading } from '@/components/ui/loading';

const ImageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [archiveMode, setArchiveMode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const image = galleryImages.find(img => img.id === id);
  const allTags = getAllTags();

  if (!image) {
    return <div>Image not found</div>;
  }

  const handleTagClick = (tag: string) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/', { state: { selectedTag: tag } });
      setIsLoading(false);
    }, 800);
  };

  const handleArchiveFolderClick = (folderTag: string) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/', { state: { archiveMode: folderTag } });
      setIsLoading(false);
    }, 800);
  };

  const handleShowAll = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/');
      setIsLoading(false);
    }, 800);
  };

  const handleBackToMainMenu = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/', { state: { showMainMenu: true } });
      setIsLoading(false);
    }, 800);
  };

  const handleBack = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(-1);
      setIsLoading(false);
    }, 800);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full font-mono">
        <AppSidebar 
          onArchiveFolderClick={handleArchiveFolderClick}
          onTagClick={handleTagClick}
          onShowAll={handleShowAll}
          onBackToMainMenu={handleBackToMainMenu}
          allTags={allTags}
          activeFilters={[]}
        />
        
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger className="mr-4" />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex flex-col">
                <h1 className="font-bold text-sm tracking-wide">
                  {image.title}
                </h1>
              </div>
            </div>
          </header>

          <div className="flex-1 p-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-gallery-card rounded-lg overflow-hidden shadow-elegant">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-mono font-bold text-foreground mb-2">
                    {image.title}
                  </h2>
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                    {image.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-medium text-muted-foreground mb-2 tracking-wide">
                    TAGS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer font-mono text-xs bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
      <Loading isVisible={isLoading} />
    </SidebarProvider>
  );
};

export default ImageDetail;
