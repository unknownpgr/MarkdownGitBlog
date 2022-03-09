import { Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

const Utterance = () => {
  const commentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (commentRef.current) {
      if (commentRef.current.firstChild) {
        commentRef.current.removeChild(commentRef.current.firstChild)
      }
      const utterance = document.createElement('script')
      const utteranceConfig = {
        src: 'https://utteranc.es/client.js',
        repo: 'canoe726/canoe726.github.io',
        'issue-term': 'url',
        label: '✨💬Post✨-',
        theme: 'github-light',
        crossorigin: 'anonymous',
        async: 'true'
      }
      Object.entries(utteranceConfig).forEach(([key, value]) => {
        utterance.setAttribute(key, value)
      })
      commentRef.current.appendChild(utterance)
    }
  }, [])

  return (
    <Box margin="0 0 1.5em 0" padding={['0 1.5em 4em 1.5em', '0 2.5em 4em 2.5em', '0 4em 4em 4em']}>
      <div id="comment" ref={commentRef}></div>
    </Box>
  )
}

export default Utterance
