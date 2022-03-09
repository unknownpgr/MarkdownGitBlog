import { atom } from 'recoil'

export interface AboutData {
  slug: string;
  frontmatter: FrontMatter;
  content: string;
}

export interface FrontMatter {
  author: string;
  summary: string;
  updated: string;
  email: string;
  url: string;
  tags: string;
}

export const aboutDataState = atom<AboutData | null>({
  key: 'aboutDataState',
  default: null
})
