import { Button, Flex } from '@chakra-ui/react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'

const ScrollBtn = () => {
  return (
    <Flex flexDirection='column'>
      <Button size='md' position='fixed' colorScheme='blackAlpha' bottom={['4em', '4.5em', '5em']} right={['1.0em', '1.2em', '1.5em']} onClick={() => scrollTo(0, 0)}>
        <RiArrowUpSLine className='text-lg' />
      </Button>
      <Button size='md' position='fixed' colorScheme='blackAlpha' bottom={['1em', '1.5em', '2em']} right={['1.0em', '1.2em', '1.5em']} onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
        <RiArrowDownSLine className='text-lg' />
      </Button>
    </Flex>
  )
}

export default ScrollBtn
