import { useEffect, useRef, useState } from 'react'

function useAutoRefresh(callback, intervalMs = 10000) {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = async () => {
      setIsRefreshing(true)
      await savedCallback.current()
      setIsRefreshing(false)
      setLastUpdated(new Date())
    }

    const timer = setInterval(tick, intervalMs)
    return () => clearInterval(timer)
  }, [intervalMs])

  return { lastUpdated, isRefreshing }
}

export default useAutoRefresh