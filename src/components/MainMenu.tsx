import { Folder, FileText } from 'lucide-react';

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
      <div className="w-full max-w-2xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-medium tracking-wide mb-2">Image Archive</h1>
          <p className="text-sm text-muted-foreground">Explore our curated collection</p>
        </div>

        <div className="border border-border rounded-lg p-8 bg-card">
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <Folder className="w-5 h-5" />
            <span className="text-lg font-medium">archive</span>
          </div>

          <div className="space-y-1">
            {archiveFolders.map((folder, index) => (
              <div key={folder.tag}>
                <button
                  onClick={() => onArchiveFolderClick(folder.tag)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 rounded transition-colors group"
                >
                  <FileText className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                  <span className="text-sm font-medium group-hover:text-foreground">
                    {folder.name.toLowerCase()}.collection
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    folder
                  </span>
                </button>
                {index < archiveFolders.length - 1 && (
                  <div className="h-px bg-border mx-4" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <button
              onClick={onEnterGallery}
              className="w-full py-3 text-sm font-medium text-center hover:bg-muted/50 rounded transition-colors"
            >
              view all images →
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            Select a collection or view all images
          </p>
        </div>
      </div>
    </div>
  );
};