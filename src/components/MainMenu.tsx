import { Archive, FileText } from 'lucide-react';

interface MainMenuProps {
  onArchiveFolderClick: (folderTag: string) => void;
  onEnterGallery: () => void;
}

const archiveFolders = [
  { name: 'Nature', tag: 'nature' },
  { name: 'Art', tag: 'art' },
  { name: 'Architecture', tag: 'architecture' }
];

export const MainMenu = ({ onArchiveFolderClick, onEnterGallery }: MainMenuProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-mono">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-medium tracking-wide mb-2">Image Archive</h1>
          <p className="text-sm text-muted-foreground">Explore our curated collection</p>
        </div>

        <div className="relative">
          {/* Archive Box Container */}
          <div className="border-2 border-border rounded-lg p-8 bg-card hover:shadow-lg transition-all duration-300 group">
            {/* Archive Icon - animated */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Archive className="w-16 h-16 text-muted-foreground group-hover:text-foreground transition-colors duration-300 group-hover:scale-110 transform" />
                <div className="absolute -inset-2 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </div>
            </div>

            {/* Archive Label */}
            <div className="text-center mb-8">
              <span className="text-lg font-medium tracking-wide">archive</span>
            </div>

            {/* File Dividers */}
            <div className="space-y-3">
              {archiveFolders.map((folder, index) => (
                <div key={folder.tag} className="relative">
                  <button
                    onClick={() => onArchiveFolderClick(folder.tag)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 rounded transition-all duration-200 group/item hover:scale-[1.02] hover:shadow-sm"
                  >
                    <FileText className="w-4 h-4 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                    <span className="text-sm font-medium group-hover/item:text-foreground transition-colors">
                      {folder.name.toLowerCase()}.collection
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground opacity-70">
                      folder
                    </span>
                  </button>
                  {index < archiveFolders.length - 1 && (
                    <div className="h-px bg-border mx-4 my-1 opacity-50" />
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-6 border-t border-border">
              <button
                onClick={onEnterGallery}
                className="w-full py-3 text-sm font-medium text-center hover:bg-muted/50 rounded transition-all duration-200 hover:scale-[1.02] hover:shadow-sm text-muted-foreground hover:text-foreground"
              >
                view all images →
              </button>
            </div>
          </div>

          {/* Floating Animation Elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full animate-pulse opacity-60" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-secondary/20 rounded-full animate-pulse delay-700 opacity-40" />
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground animate-fade-in">
            Select a collection or view all images
          </p>
        </div>
      </div>
    </div>
  );
};