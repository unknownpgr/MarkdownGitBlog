import { Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import Image from 'next/image'
import { imageLoader } from '../../utils/loader'

interface CircularAvatarProps {
  size: string[];
  src: string;
}

const CircularAvatar: NextPage<CircularAvatarProps> = ({
  size,
  src
}) => {
  return (
    <Flex
      position='relative'
      width={size}
      height={size}
      alignItems='center'
      justifyContent='center'
      overflow='hidden'
      borderRadius='50%'
      margin='0.5em'
    >
      <Image
        layout='fill'
        objectFit='cover'
        src={src}
        alt='avatar-img'
        unoptimized={true}
        loader={imageLoader}
        priority={true}
      ></Image>
    </Flex>
  )
}

export default CircularAvatar
