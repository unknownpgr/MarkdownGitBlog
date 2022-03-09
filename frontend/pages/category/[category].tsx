import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Box, Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import { PostData, PostsData, postsDataState } from '../../stores/posts'
import { useEffect } from 'react'
import Head from 'next/head'
import { getPosts } from '../../utils/loadMarkdownFiles'
import { useSetRecoilState } from 'recoil'
import CardPost from '../../components/shared/cardPost'
import { useRouter } from 'next/router'
import useInfinityScroll from '../../components/shared/useInfinityScroll'

interface CategoryItemListProps {
  posts: PostsData[];
  category: string;
  files: PostData[];
}

const CategoryItemList: NextPage<CategoryItemListProps> = ({
  posts,
  category,
  files
}) => {
  const setPostsData = useSetRecoilState(postsDataState)
  const { data } = useInfinityScroll<PostData>(files, 8)
  const router = useRouter()

  useEffect(() => {
    setPostsData(posts)
  }, [posts, setPostsData])

  useEffect(() => {
    const topTitle = document.getElementById('top-title')
    if (topTitle) {
      topTitle.innerHTML = `${category.slice(0, 1).toUpperCase()}${category.slice(1)}`
    }
    return () => {
      if (topTitle) {
        topTitle.innerHTML = ''
      }
    }
  }, [category])

  return (
    <>
      <Head>
        <title>{`${category.slice(0, 1).toUpperCase()}${category.slice(1)}`}</title>
        <meta name="description" content={`This is Blog - ${category}`}></meta>
      </Head>
      <Flex height='100%' justifyContent='start' alignItems='center' flexDirection='column' padding={['96px 1.5em 2em 1.5em', '96px 2.5em 2em 2.5em', '112px 4em 2em 4em', '112px 8em 2em 8em']} minHeight='85vh' backgroundColor='rgba(0,0,0,0.05)'>
        <div style={{ width: '100%', maxWidth: '1320px' }}>
          <Box width='100%' height='64px' background='white' position='absolute' top='0' left='0' pointerEvents='none' borderBottom='1px solid rgba(0, 0, 0, 0.2)'></Box>
          {data.map((file, idx) => {
            return (
              <CardPost
                key={idx}
                file={file}
                onClick={() => router.push(`/post/${file.frontmatter.category}/${file.slug}`)}
              ></CardPost>
            )
          })}
        </div>
      </Flex>
    </>
  )
}

export async function getStaticPaths () {
  const files = fs.readdirSync(path.join('./public/post'))
  const paths = files.map(dirName => {
    const dirs = fs.readdirSync(path.join(`./public/post/${dirName}`))
    const slugs = dirs.map(dir => {
      return dir.replace('.md', '')
    })
    const params = slugs.map((slug) => {
      return {
        params: {
          category: dirName,
          slug: slug
        }
      }
    })
    return params
  })
  return {
    paths: paths.flat(),
    fallback: false
  }
}

interface getStaticPropsProperty {
  params: {
    category: string;
  }
}

export async function getStaticProps ({ params: { category } }: getStaticPropsProperty) {
  const categoryDirs = fs.readdirSync(path.join(`./public/post/${category}`))
  const files = categoryDirs.map((categoryDir) => {
    const markdownWithMeta = fs.readFileSync(path.join(`./public/post/${category}/${categoryDir}`, `${categoryDir}.md`), 'utf-8')
    const { data: frontmatter, content } = matter(markdownWithMeta)
    return {
      slug: categoryDir,
      frontmatter,
      content
    }
  })

  return {
    props: {
      posts: getPosts(),
      category: category,
      files: files
    }
  }
}

export default CategoryItemList
