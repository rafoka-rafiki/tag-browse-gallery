import { useState } from 'react';
import { Folder, FolderOpen, Archive, ChevronRight, ChevronDown, Info } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AppSidebarProps {
  onArchiveFolderClick: (folderTag: string) => void;
  onTagClick: (tag: string) => void;
  onShowAll: () => void;
  allTags: string[];
  activeFilters: string[];
}

// Main archive folders based on content themes
const archiveFolders = [
  { name: 'Nature', tag: 'nature', icon: Folder },
  { name: 'Art', tag: 'art', icon: Folder },
  { name: 'Architecture', tag: 'architecture', icon: Folder }
];

export function AppSidebar({ 
  onArchiveFolderClick, 
  onTagClick, 
  onShowAll, 
  allTags, 
  activeFilters 
}: AppSidebarProps) {
  const { state } = useSidebar();
  const [tagsOpen, setTagsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  
  const isCollapsed = state === 'collapsed';

  const toggleFolder = (folderTag: string) => {
    const newOpenFolders = new Set(openFolders);
    if (newOpenFolders.has(folderTag)) {
      newOpenFolders.delete(folderTag);
    } else {
      newOpenFolders.add(folderTag);
    }
    setOpenFolders(newOpenFolders);
  };

  if (isCollapsed) {
    return (
      <Sidebar className="border-r border-border">
        <SidebarContent className="p-2">
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onShowAll}
              className="w-8 h-8 font-mono"
              title="Archive"
            >
              <Archive className="h-4 w-4" />
            </Button>
            {archiveFolders.map((folder) => (
              <Button
                key={folder.tag}
                variant="ghost"
                size="icon"
                onClick={() => onArchiveFolderClick(folder.tag)}
                className="w-8 h-8 font-mono"
                title={folder.name}
              >
                <folder.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4 border-b border-border">
        <h2 className="font-mono font-bold text-sm tracking-wide">ARCHIVE</h2>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onShowAll} className="font-mono">
                <Archive className="h-4 w-4" />
                <span>All Images</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-mono font-medium text-xs tracking-wide">
            FOLDERS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {archiveFolders.map((folder) => {
                const isOpen = openFolders.has(folder.tag);
                const relatedTags = allTags.filter(tag => 
                  tag.includes(folder.tag.toLowerCase()) || 
                  (folder.tag === 'nature' && ['mountains', 'forest', 'ocean', 'trees', 'water'].some(t => tag.includes(t))) ||
                  (folder.tag === 'art' && ['abstract', 'geometric', 'street art', 'graffiti', 'colorful'].some(t => tag.includes(t))) ||
                  (folder.tag === 'architecture' && ['minimalist', 'modern', 'design', 'urban'].some(t => tag.includes(t)))
                );

                return (
                  <SidebarMenuItem key={folder.tag}>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          onClick={() => toggleFolder(folder.tag)}
                          className="font-mono w-full justify-between"
                        >
                          <div className="flex items-center">
                            {isOpen ? (
                              <FolderOpen className="h-4 w-4" />
                            ) : (
                              <Folder className="h-4 w-4" />
                            )}
                            <span>{folder.name}</span>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-4 mt-1">
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onArchiveFolderClick(folder.tag)}
                            className="w-full justify-start font-mono text-xs h-7 px-2"
                          >
                            View All
                          </Button>
                          {relatedTags.map((tag) => (
                            <Button
                              key={tag}
                              variant="ghost"
                              size="sm"
                              onClick={() => onTagClick(tag)}
                              className={`w-full justify-start font-mono text-xs h-7 px-2 ${
                                activeFilters.includes(tag) ? 'bg-accent' : ''
                              }`}
                            >
                              {tag}
                            </Button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer font-mono font-medium text-xs tracking-wide flex items-center justify-between hover:bg-accent rounded px-2 py-1">
                ALL TAGS
                {tagsOpen ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {allTags.map((tag) => (
                    <SidebarMenuItem key={tag}>
                      <SidebarMenuButton 
                        onClick={() => onTagClick(tag)}
                        className={`font-mono text-xs ${
                          activeFilters.includes(tag) ? 'bg-accent' : ''
                        }`}
                      >
                        {tag}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <Collapsible open={aboutOpen} onOpenChange={setAboutOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between font-mono text-sm"
            >
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                About
              </div>
              {aboutOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="text-xs font-mono text-muted-foreground space-y-2">
              <p>Archive System v1.0</p>
              <p>Minimalist image gallery with tag-based organization.</p>
              <p>Built with React + TypeScript</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  );
}