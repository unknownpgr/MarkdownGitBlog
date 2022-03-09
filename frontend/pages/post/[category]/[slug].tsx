import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { NextPage } from 'next'
import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { FrontMatter, PostsData, postsDataState } from '../../../stores/posts'
import { useCallback, useEffect, useRef, useState } from 'react'
import markdownToHtml from '../../../utils/markdownToHtml'
import Image from 'next/image'
import { imageLoader } from '../../../utils/loader'
import Head from 'next/head'
import { getPosts } from '../../../utils/loadMarkdownFiles'
import { useSetRecoilState } from 'recoil'
import Utterance from '../../../components/shared/utterance'
import NextPosts from '../../../components/slug/nextPosts'

interface PostProps {
  posts: PostsData[];
  slug: string;
  category: string;
  frontmatter: FrontMatter;
  content: string;
}

const Post: NextPage<PostProps> = ({
  posts,
  slug,
  category,
  frontmatter,
  content
}) => {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const imageZoomBoxRef = useRef<HTMLImageElement>(null)
  const setPostsData = useSetRecoilState(postsDataState)

  useEffect(() => {
    setPostsData(posts)
  }, [posts, setPostsData])

  const imageZoomScroll = useCallback(() => {
    if (imageZoomBoxRef.current) {
      imageZoomBoxRef.current.style.transform = `scale(calc(1.0 + ${window.pageYOffset / 500}))`
      imageZoomBoxRef.current.style.opacity = `${1 - window.pageYOffset / 500}`
    }
    const topTitle = document.getElementById('top-title')
    if (window.scrollY >= 120 && topTitle) {
      topTitle.innerHTML = `${frontmatter.title.slice(0, 1).toUpperCase()}${frontmatter.title.slice(1)}`
    } else if (window.screenY < 120 && topTitle) {
      topTitle.innerHTML = ''
    }
  }, [frontmatter.title])

  useEffect(() => {
    const topTitle = document.getElementById('top-title')
    return () => {
      if (topTitle) {
        topTitle.innerHTML = ''
      }
    }
  }, [frontmatter])

  useEffect(() => {
    window.addEventListener('scroll', imageZoomScroll)
    return () => {
      window.removeEventListener('scroll', imageZoomScroll)
    }
  }, [imageZoomScroll])

  useEffect(() => {
    markdownToHtml(content).then((html) => {
      setHtmlContent(html)
    })
  }, [content, setHtmlContent])

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={`${frontmatter.title}-${frontmatter.summary}`}></meta>
      </Head>
      <Container padding='0' maxWidth='1320px'>
        <Box position='relative' padding={['35vh 1.5em 2em 1.5em', '35vh 2.5em 2em 2.5em', '35vh 4em 2em 4em']}>
          <Box
            position='absolute'
            overflow='hidden'
            top='64px'
            left={['1.5em', '2.5em', '4em']}
            right={['1.5em', '2.5em', '4em']}
            height='35vh'
            maxHeight='420px'
          >
            <Box ref={imageZoomBoxRef} width='100%' height='100%' position='relative'>
              <Image
                layout='fill'
                objectFit='cover'
                alt={`${frontmatter.category}-${slug}`}
                src={`/post/${frontmatter.category}/${slug}/${frontmatter.coverImage}`}
                loader={imageLoader}
                unoptimized={true}
                priority={true}
              ></Image>
            </Box>
          </Box>
          <Box position='absolute' top='64px' left={['1.5em', '2.5em', '4em']} right={['1.5em', '2.5em', '4em']} height='35vh' maxHeight='420px' backgroundColor='rgba(0, 0, 0, 0.4)'>
            <Text fontWeight='normal' position='absolute' width='100%' padding={['0 0.5em 0 0.5em', '0 0.5em 0 0.5em', '0 1em 0 1em']} top='40%' left='50%' transform='translate(-50%, -40%)' textAlign='center' lineHeight={[1.2, 1.2, 1.5]} fontSize={['3xl', '4xl', '5xl']} color='white'>{frontmatter.title}</Text>
            {frontmatter.shortcut && (
              <Text fontWeight='light' position='absolute' top='70%' left='50%' padding={['0 0.5em 0 0.5em', '0 0.5em 0 0.5em', '0 1em 0 1em']} transform='translate(-50%, -70%)' fontSize={['md', 'xl', '2xl']} textAlign='center' color='gray.100'>{frontmatter.shortcut}</Text>
            )}
          </Box>
          <Flex margin='64px 0 0 0' width='100%' justifyContent='center' alignItems='center'>
            <article className='post-body' style={{ width: '100%', maxWidth: '1320px' }} dangerouslySetInnerHTML={{ __html: htmlContent }}></article>
          </Flex>
        </Box>
        <NextPosts></NextPosts>
        <Utterance></Utterance>
        {/* <ScrollBtn></ScrollBtn> */}
      </Container>
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
    slug: string;
  }
}

export async function getStaticProps ({ params: { category, slug } }: getStaticPropsProperty) {
  const markdownWithMeta = fs.readFileSync(path.join(`./public/post/${category}/${slug}`, `${slug}.md`), 'utf-8')
  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      posts: getPosts(),
      slug: slug,
      category: category,
      frontmatter: frontmatter,
      content: content
    }
  }
}

export default Post
