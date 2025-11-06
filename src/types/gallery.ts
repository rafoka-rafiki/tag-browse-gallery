export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  tags: string[];
  alt: string;
  description: string;
}

export interface FilterState {
  searchTerm: string;
  activeTags: string[];
}