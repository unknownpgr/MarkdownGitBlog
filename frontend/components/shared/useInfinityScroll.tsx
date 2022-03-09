import { useCallback, useEffect, useState } from 'react'

let throttle: ReturnType<typeof setTimeout> | null = null

function useInfinityScroll<T> (data: T[], loadSize: number): { data: T[] } {
  const [sliceLen, setSliceLen] = useState<number>(loadSize)
  const [lazyData, setLazyData] = useState<any[]>([])

  const infinityScrollEvent = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop
    const clientHeight = document.documentElement.clientHeight
    if ((scrollHeight - scrollTop) <= (clientHeight * 2.5)) {
      if (!throttle) {
        throttle = setTimeout(() => {
          throttle = null
          if (sliceLen < data.length) {
            setSliceLen(sliceLen + loadSize)
          }
        }, 300)
      }
    }
  }, [sliceLen, data.length, loadSize])

  useEffect(() => {
    window.addEventListener('scroll', infinityScrollEvent)
    return () => window.removeEventListener('scroll', infinityScrollEvent)
  }, [infinityScrollEvent])

  useEffect(() => {
    setLazyData(data.slice(0, sliceLen))
  }, [data, sliceLen])

  return {
    data: lazyData
  }
}

export default useInfinityScroll
