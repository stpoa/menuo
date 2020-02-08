import { useState, useEffect } from 'react'

const useScrollPosition = () => {
  if (typeof window === 'undefined') {
    throw new Error('window is undefined')
  }

  const [scrollPos, setScrollPos] = useState(window.pageYOffset)

  useEffect(() => {
    const onScroll = () => {
      setScrollPos(window.pageYOffset)
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  return scrollPos
}

export default useScrollPosition
