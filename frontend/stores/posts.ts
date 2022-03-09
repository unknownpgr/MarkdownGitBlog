import { atom, selector } from 'recoil'

export interface PostsData {
  category: string;
  files: PostData[];
}

export interface PostData {
  slug: string;
  frontmatter: FrontMatter;
  content: string;
}

export interface FrontMatter {
  title: string;
  category: string;
  date: string;
  coverImage: string;
  summary?: string;
  shortcut?: string;
}

export const postsDataState = atom<PostsData[]>({
  key: 'postsDataState',
  default: []
})

const sortByDate = (a: PostData, b: PostData) => {
  if (a.frontmatter.date < b.frontmatter.date) {
    return 1
  }
  if (a.frontmatter.date > b.frontmatter.date) {
    return -1
  }
  return 0
}

export const postsDataSelector = selector({
  key: 'postsDataSelector',
  get: ({ get }) => {
    const posts = get(postsDataState)
    const categories = posts.map(post => post.category)
    const files = posts.map(post => post.files).flat().sort(sortByDate)

    return {
      categories,
      files
    }
  }
})
