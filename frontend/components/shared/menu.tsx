import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useClipboard,
  useToast,
  UseDisclosureProps
} from '@chakra-ui/react'
import { IoIosMenu, IoIosSearch, IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { AiOutlineLink } from 'react-icons/ai'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import Footer from './footer'
import { useRouter } from 'next/router'
import CircularAvatar from './circularAvatar'
import { getBrowserWidth } from '../../utils/utils'
import SearchPopup from './searchPopup'
import { NextPage } from 'next'

const drawerButtons: { title: string, link: string }[] = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'About',
    link: '/about'
  },
  {
    title: 'Category',
    link: '/category'
  }
]

interface MenuProps {
  drawerDisclosure: UseDisclosureProps;
}

const Menu: NextPage<MenuProps> = ({ drawerDisclosure }) => {
  const { isOpen, onOpen, onClose } = drawerDisclosure
  const [blogLink, setBlogLink] = useState<string>('')
  const { hasCopied, onCopy } = useClipboard(blogLink)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [showSearchPopup, setShowSearchPopup] = useState<boolean>(false)
  const btnRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLHRElement>(null)
  const progressBackRef = useRef<HTMLHRElement>(null)
  const toast = useToast()
  const router = useRouter()

  const windowScrollEvent = useCallback(() => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    const scrollLimit = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if (headerRef.current) {
      if (window.scrollY >= 120 && !headerRef.current.classList.contains('active-top')) {
        headerRef.current.classList.add('active-top')
      } else if (window.scrollY < 120) {
        headerRef.current.classList.remove('active-top')
      }
    }
    if (progressRef.current) {
      progressRef.current.style.width = `${(scrollTop / scrollLimit) * 100}%`
    }
  }, [])

  const resizeEvent = () => {
    const width = getBrowserWidth()
    if (width <= 767) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  const onCopyClipboardClick = () => {
    setBlogLink(window.location.href)
  }

  useEffect(() => {
    if (blogLink.length > 0) {
      onCopy()
      toast({
        duration: 2000,
        isClosable: true,
        render: () => (
          <Box display='flex' justifyContent='center' alignItems='center' fontWeight='medium' border='none' borderRadius='8px' padding='0.8em 0em 0.8em 0em' background='#63b3ed' textAlign='center' color='white'>
            <Box fontSize='24px'>
              <IoIosCheckmarkCircleOutline></IoIosCheckmarkCircleOutline>
            </Box>
            <Box marginLeft='1em'>Share link to your friends!</Box>
          </Box>
        )
      })
      setBlogLink('')
    }
  }, [onCopy, blogLink, toast])

  useEffect(() => {
    window.addEventListener('scroll', windowScrollEvent)
    window.addEventListener('load', resizeEvent)
    window.addEventListener('resize', resizeEvent)
    return () => {
      window.removeEventListener('scroll', windowScrollEvent)
      window.addEventListener('load', resizeEvent)
      window.removeEventListener('resize', resizeEvent)
    }
  }, [windowScrollEvent])

  useEffect(() => {
    if (router.pathname.includes('post')) {
      if (progressRef.current && progressBackRef.current) {
        progressBackRef.current.style.display = 'block'
        progressRef.current.style.display = 'block'
      }
    } else {
      if (progressRef.current && progressBackRef.current) {
        progressBackRef.current.style.display = 'none'
        progressRef.current.style.display = 'none'
      }
    }
  }, [router.pathname])

  return (
    <header id='header'>
      <Flex ref={headerRef} className='header' position='fixed' top='0' left='0' width='100%' height='64px' zIndex={999} alignItems='center' justifyContent='space-between' padding={['1em 1.5em 1em 1.5em', '1em 2.5em 1em 2.5em', '1em 4em 1em 4em']}>
        <Flex alignItems='center' justifyContent='center'>
          <Box
            ref={btnRef}
            cursor='pointer'
            aria-label='menu'
            textAlign='center'
            fontSize='32px'
            onClick={onOpen}
            marginRight={['0.3em', '0.3em', '0.5em']}
            outline='none'
          >
            <IoIosMenu aria-label='menu'/>
          </Box>
          {!isMobile && (
            <Link href='/' passHref={true}>
              <Box aria-label='logo' fontSize='xl' cursor='pointer' color='black' fontWeight='normal' fontStyle='italic' textDecoration='underline'>
                This is Blog
              </Box>
            </Link>
          )}
          {isMobile && (
            <Link href='/' passHref={true}>
              <Avatar aria-label='logo' name='B' size='sm' background='black' fontStyle='italic' textDecoration='underline'></Avatar>
            </Link>
          )}
        </Flex>
        <Flex position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'>
          <Text id='top-title' textAlign='center' fontWeight='light'></Text>
        </Flex>
        <Flex alignItems='center' justifyContent='center'>
          <Box
            id='copy-link'
            width='100%'
            cursor='pointer'
            aria-label='copy-link'
            display={router.pathname.includes('post') ? 'flex' : 'none'}
            justifyContent='center'
            alignItems='center'
            fontSize='32px'
            outline='none'
            margin='0 0.5em 0 0'
            onClick={onCopyClipboardClick}
          >
            <AiOutlineLink color={hasCopied ? '#63b3ed' : 'black'}></AiOutlineLink>
          </Box>
          <Box
            width='100%'
            cursor='pointer'
            aria-label='search'
            display='flex'
            justifyContent='center'
            alignItems='center'
            fontSize='32px'
            outline='none'
            onClick={() => setShowSearchPopup(true)}
          >
            <IoIosSearch aria-label='search'/>
          </Box>
        </Flex>
        <Divider ref={progressBackRef} display='none' top='64px' left='0' position='absolute' border='1px' borderColor='rgba(0, 0, 0, 0.05)'></Divider>
        <Divider ref={progressRef} display='none' top='64px' left='0' width='1px' position='absolute' border='1px' borderColor='black'></Divider>
      </Flex>
      <Drawer
        isOpen={isOpen!}
        placement='left'
        onClose={onClose!}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader background='rgba(0,0,0,0.01)' padding='2em 0 2em 0' borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
            <Box display='flex' flexDirection='column' alignItems='center' justifyItems='center'>
              <CircularAvatar
                size={['64px', '64px', '96px']}
                src={'/about/avatar.png'}
              ></CircularAvatar>
              <Text fontSize='lg' fontStyle='italic' fontWeight='light' color='black' margin='0.4em 0 0.2em 0'>Anything you can write</Text>
              <Text fontSize='sm' fontStyle='italic' fontWeight='light' color='gray.600'>- canoe918 -</Text>
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <Flex overflow='auto' flexDirection='column'>
              {drawerButtons.map((button, idx) => {
                return (
                  <Box key={idx} textAlign='center' fontWeight='normal' margin='0.6em 0em 0.6em 0em' padding='0.6em 0 0.6em 0' cursor='pointer' _hover={{ background: 'rgba(0,0,0,0.05)', borderRadius: '4px', transition: '0.5s ease' }}
                    aria-label='home'
                    onClick={() => {
                      router.push(button.link)
                      onClose!()
                    }}
                  >
                    {button.title}
                  </Box>
                )
              })}
            </Flex>
          </DrawerBody>
          <DrawerFooter padding='0'>
            <Footer
              background='black'
              color='white'
              padding='2em 1em 2em 1em'
              drawerDisclosure={drawerDisclosure}
            ></Footer>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {showSearchPopup && (
        <SearchPopup
          setShowSearchPopup={setShowSearchPopup}
        ></SearchPopup>
      )}
    </header>
  )
}

export default Menu
