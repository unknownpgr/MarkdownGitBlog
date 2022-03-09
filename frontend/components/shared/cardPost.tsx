import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { ForwardRefRenderFunction, useRef } from 'react'
import { PostData } from '../../stores/posts'
import { imageLoader } from '../../utils/loader'

interface CardPostProps {
  onClick?: () => void;
  file: PostData;
}

const CardPost: ForwardRefRenderFunction<CardPostProps, any> = ({ onClick, file }, ref) => {
  const titleTextRef = useRef<HTMLParagraphElement>(null)

  return (
    <Box
      cursor='pointer'
      display='flex'
      width='100%'
      height={['180px', '180px', '240px']}
      overflow='hidden'
      margin='0 0 2em 0'
      backgroundColor='white'
      borderBottom='1px solid rgba(0, 0, 0, 0.1)'
      onClick={onClick}
      onMouseOver={() => {
        if (titleTextRef.current) {
          titleTextRef.current.style.textDecoration = 'underline'
        }
      }}
      onMouseOut={() => {
        if (titleTextRef.current) {
          titleTextRef.current.style.textDecoration = 'none'
        }
      }}
    >
      <Flex flex={['2.5', '2.5', '3']} flexDirection='column' padding={['2em 1.2em 2em 1.2em', '2em 1.2em 2em 1.2em', '2em']}>
        <Text className='title' ref={titleTextRef} height='fit-content' fontSize={['lg', 'lg', '2xl']} fontWeight='normal'>{file.frontmatter.title}</Text>
        <Text className='summary' marginTop='0.5em' fontSize={['md', 'md', 'lg']} fontWeight='light' textOverflow='ellipsis' overflow='hidden' color='gray.600'>{file.frontmatter.summary}</Text>
        <Text marginTop={['0.5em', '0.5em', '1.0em']} fontSize={['sm', 'sm', 'md']} fontWeight='light' color='gray.500'>{file.frontmatter.date}</Text>
      </Flex>
      <Flex flex={['1.5', '1.5', '1']} position='relative' justifyContent='center' alignItems='center' padding={['0 1em 0 0', '0 1em 0 0', '0 1.5em 0 0']}>
        <Box
          width={['100px', '120px', '180px']}
          height={['100px', '120px', '180px']}
          position='relative'
        >
          <Image
            alt={`${file.frontmatter.category}-${file.slug}`}
            src={`/post/${file.frontmatter.category}/${file.slug}/${file.frontmatter.coverImage}`}
            layout='fill'
            objectFit='cover'
            unoptimized={true}
            loader={imageLoader}
            priority={true}
          ></Image>
        </Box>
      </Flex>
    </Box>
  )
}

export default CardPost
