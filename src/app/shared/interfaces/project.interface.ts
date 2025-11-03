export interface Project {
  name: string;
  image: string;
  link: string;
  active: boolean;
  private: boolean;
  description?: string;
  technologies: string[];
}
