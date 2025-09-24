import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import { FilterState } from '@/types/gallery';

interface FilterBarProps {
  filters: FilterState;
  allTags: string[];
  onSearchChange: (search: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

export const FilterBar = ({ 
  filters, 
  allTags, 
  onSearchChange, 
  onTagToggle, 
  onClearFilters 
}: FilterBarProps) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          type="text"
          placeholder="Search images..."
          value={filters.searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gallery-card border-border"
          aria-label="Search images by title"
        />
      </div>

      {/* Active Filters */}
      {(filters.activeTags.length > 0 || filters.searchTerm) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.searchTerm && (
            <Badge 
              variant="default" 
              className="bg-primary text-primary-foreground gap-1"
            >
              "{filters.searchTerm}"
              <button
                onClick={() => onSearchChange('')}
                className="hover:bg-primary-foreground/20 rounded-full p-0.5"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
          
          {filters.activeTags.map((tag) => (
            <Badge 
              key={tag} 
              variant="default" 
              className="bg-gallery-tag-active text-white gap-1"
            >
              {tag}
              <button
                onClick={() => onTagToggle(tag)}
                className="hover:bg-white/20 rounded-full p-0.5"
                aria-label={`Remove ${tag} filter`}
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Clear all filters"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Available Tags */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Browse by tags:</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isActive = filters.activeTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={isActive ? "default" : "secondary"}
                className={
                  isActive 
                    ? "bg-gallery-tag-active text-white cursor-pointer transition-all duration-200" 
                    : "bg-gallery-tag hover:bg-gallery-tag-hover text-foreground cursor-pointer transition-all duration-200 hover:scale-105"
                }
                onClick={() => onTagToggle(tag)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onTagToggle(tag);
                  }
                }}
                role="button"
                aria-label={`${isActive ? 'Remove' : 'Add'} ${tag} filter`}
                aria-pressed={isActive}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};