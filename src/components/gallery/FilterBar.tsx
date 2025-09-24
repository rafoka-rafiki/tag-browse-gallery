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
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search images..."
          value={filters.searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 font-mono text-sm border-border focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={filters.activeTags.includes(tag) ? "default" : "secondary"}
            className={`cursor-pointer transition-all duration-200 font-mono text-xs ${
              filters.activeTags.includes(tag)
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {(filters.searchTerm || filters.activeTags.length > 0) && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="font-mono text-xs"
        >
          <X className="h-3 w-3 mr-2" />
          Clear filters
        </Button>
      )}
    </div>
  );
};