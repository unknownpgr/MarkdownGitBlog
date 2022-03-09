import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import CircularAvatar from '../components/shared/circularAvatar'
import { AboutData } from '../stores/about'
import { PostsData, postsDataState } from '../stores/posts'
import { getAbout, getPosts } from '../utils/loadMarkdownFiles'
import markdownToHtml from '../utils/markdownToHtml'

interface AboutProps {
  posts: PostsData[];
  about: AboutData;
}

const About: NextPage<AboutProps> = ({ posts, about }) => {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const setPostsData = useSetRecoilState(postsDataState)

  useEffect(() => {
    setPostsData(posts)
  }, [posts, setPostsData])

  useEffect(() => {
    markdownToHtml(about.content).then((html) => {
      setHtmlContent(html)
    })
  }, [about.content, setHtmlContent])

  return (
    <>
      <Head>
        <meta name="description" content={`This is Blog - About | ${about.frontmatter.author}`}></meta>
      </Head>
      <Flex flexDirection='column' padding={['80px 1.5em 4em 1.5em', '100px 2.5em 4em 2.5em', '100px 4em 4em 4em']}>
        <Flex width='100%' justifyContent='center' alignItems='center'>
          <div style={{ width: '100%', maxWidth: '1320px' }}>
            <Box width='100%' height={['9.5em', '11em', '11em']} background='rgba(0,0,0,0.05)' pointerEvents='none' position='absolute' top='0' left='0'></Box>
            <Box position='absolute' top='5em' right={['1.5em', '2em', '8em']}>
              <CircularAvatar size={['128px', '168px', '168px', '216px']} src='/about/avatar.png'></CircularAvatar>
            </Box>
            <Box padding='6em 0 0 0'>
              {about.frontmatter.author && (
                <Text fontSize={['4xl', '4xl', '5xl']} fontWeight='normal'>{about.frontmatter.author}</Text>
              )}
              {about.frontmatter.summary && (
                <Text fontSize={['xl', 'xl', '2xl']} color='gray.500' fontWeight='light'>{about.frontmatter.summary}</Text>
              )}
              {about.frontmatter.email && (
                <Text width='fit-content' fontSize={['md', 'md', 'lg']} fontWeight='normal' margin='1em 0 0 0' color='gray.600'>
                  ✉️&nbsp;&nbsp;
                  <a href={`mailto:${about.frontmatter.email}`}>
                    {about.frontmatter.email}
                  </a>
                </Text>
              )}
              {about.frontmatter.url && (
                <Text fontWeight='normal' fontSize={['md', 'md', 'lg']} color='gray.600'>
                  🔗&nbsp;&nbsp;
                  <a href={about.frontmatter.url} target='_blank' rel='noreferrer'>
                    {about.frontmatter.url}
                  </a>
                </Text>
              )}
              {about.frontmatter.tags && (
                <Flex flexWrap='wrap' margin='1.5em 0 0 0'>
                  {(
                    about.frontmatter.tags.replace(' ', '').split(',').map((tag, idx) => {
                      return (
                        <Badge key={idx} padding='1' margin='0 1em 0.8em 0' borderRadius='4px' colorScheme='blue'>{`# ${tag}`}</Badge>
                      )
                    })
                  )}
                </Flex>
              )}
            </Box>
          </div>
        </Flex>
        <Flex width='100%' justifyContent='center' alignItems='center'>
          <article className='post-body' style={{ maxWidth: '1320px' }} dangerouslySetInnerHTML={{ __html: htmlContent }}></article>
        </Flex>
      </Flex>
    </>
  )
}

export async function getStaticProps () {
  return {
    props: {
      posts: getPosts(),
      about: getAbout()
    }
  }
}

export default About
