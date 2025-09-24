export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  tags: string[];
  alt: string;
}

export interface FilterState {
  searchTerm: string;
  activeTags: string[];
}