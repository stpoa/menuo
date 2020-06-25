import { useEffect, useState } from 'react'

export const useGet: UseGet = (getData, defaultData, deps = []) => {
  const [___refetch, setRefetch] = useState(0)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(defaultData)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    setLoading(true)
    getData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [...deps, ___refetch])

  const refetch = setRefetch

  return { data, error, loading, refetch }
}

export interface UseGetResult<T> {
  data: T
  error: Error | undefined
  loading: boolean
  refetch: React.Dispatch<React.SetStateAction<number>>
}

type UseGet = <T>(
  getData: () => Promise<T>,
  defaultData: T,
  deps?: React.DependencyList,
) => UseGetResult<T>
