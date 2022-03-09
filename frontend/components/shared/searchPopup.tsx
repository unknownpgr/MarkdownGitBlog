import { Box, Flex, Input } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { VscChromeClose } from 'react-icons/vsc'
import { useRecoilValue } from 'recoil'
import { PostData, postsDataState } from '../../stores/posts'
import CardPost from './cardPost'

interface SearchPopupProps {
  setShowSearchPopup: (showSearchPopup: boolean) => void;
}

let debounce: ReturnType<typeof setTimeout> | null = null

const SearchPopup: NextPage<SearchPopupProps> = ({
  setShowSearchPopup
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const postsData = useRecoilValue(postsDataState)
  const [filteredData, setFilteredData] = useState<PostData[]>([])
  const router = useRouter()

  useEffect(() => {
    setSearchValue('')
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const body = document.body
    body.style.overflow = 'hidden'
    return () => {
      body.style.overflow = 'auto'
    }
  }, [])

  return (
    <Flex position='fixed' width='100%' height='100%' background='rgba(255, 255, 255, 0.98)' top='0' left='0' right='0' bottom='0' zIndex='9999'>
      <Box zIndex='99'>
      <Box
        position='fixed'
        cursor='pointer'
        top='0.8em'
        right='1.2em'
        width='fit-content'
        aria-label='close'
        display='flex'
        justifyContent='center'
        alignItems='center'
        fontSize={['32px', '32px', '48px']}
        outline='none'
        onClick={() => setShowSearchPopup(false)}
      >
        <VscChromeClose
        ></VscChromeClose>
      </Box>
      <Input
        ref={searchInputRef}
        value={searchValue}
        position='fixed'
        width={['70%', '75%', '80%']}
        height='2.5em'
        padding={['0 0 0 2em', '0 0 0 2em', '0 0 0 3em']}
        fontSize={['24px', '24px', '34px']}
        background='transparent'
        outline='none'
        _focus={{ outline: 'none' }}
        top='0.5em'
        left='1.5em'
        borderBottom='2px'
        borderRadius='0'
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const target = e.target
          setSearchValue(target.value)
          if (debounce) {
            clearTimeout(debounce)
          }
          debounce = setTimeout(() => {
            const filtered = postsData.map(postData => {
              return postData.files.filter(file => {
                const value = target.value
                return (
                  file.frontmatter.category.toLowerCase().includes(value) ||
                  file.frontmatter.title.toLowerCase().includes(value)
                )
              })
            }).flat()
            setFilteredData(filtered)
            debounce = null
          }, 500)
        }}
      ></Input>
      <Box
        position='fixed'
        cursor='pointer'
        top='0.8em'
        left='1.2em'
        width='fit-content'
        aria-label='search'
        display='flex'
        justifyContent='center'
        alignItems='center'
        fontSize={['32px', '32px', '48px']}
        outline='none'
        onClick={() => {
          setSearchValue('')
          setShowSearchPopup(false)
        }}
      >
        <IoIosSearch
        ></IoIosSearch>
      </Box>
      </Box>
      <Box
        position='fixed'
        overflow='scroll'
        top={['6em', '6em', '8em']}
        left='0'
        right='0'
        bottom='0'
      >
        <Flex width='100%' justifyContent='center' alignItems='center'>
          <Box position='relative'>
            <div style={{ width: '100%', maxWidth: '1320px' }}>
              <Box position='relative' width='100%' height='100%' overflow='hidden' overflowY='auto' padding='1em 2em 1.5em 2em'>
                {filteredData.length > 0 && (
                  filteredData.map((file, idx) => {
                    return (
                      <CardPost
                        key={idx}
                        file={file}
                        onClick={() => {
                          router.push(`/post/${file.frontmatter.category}/${file.slug}`)
                          setShowSearchPopup(false)
                        }}
                      ></CardPost>
                    )
                  })
                )}
              </Box>
            </div>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default SearchPopup
