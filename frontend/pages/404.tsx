import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { imageLoader } from '../utils/loader'

const Custom404 = () => {
  return (
    <Flex position='relative' justifyContent='center' alignItems='center' padding='120px 0em 4em 0em' flexDirection='column' height='100vh'>
      <Box position='absolute' top='0' left='0' right='0' bottom='0' opacity='0.7'>
        <Image
          alt={'😼 Here is cute cat!'}
          src={'/404.jpg'}
          layout='fill'
          objectFit='cover'
          unoptimized={true}
          loader={imageLoader}
          priority={true}
        ></Image>
      </Box>
      <Text zIndex='2' fontSize={['3xl', '3xl', '4xl']} fontWeight='medium'>You lost way to go...</Text>
      <Link href='/' passHref>
        <Text zIndex='2' fontWeight='light' margin='1em 0 0 0' fontSize={['2xl', '2xl', '3xl']} textDecoration='underline' cursor='pointer' _hover={{ color: '#63b3ed', transition: '1s ease' }}>Go Home</Text>
      </Link>
    </Flex>
  )
}

export default Custom404
