import { useEffect, useState } from 'react'

type ApiResponse = {
  updated_at: string
  data: {
    [key: string]: {
      name: string
      symbol: string
      price: string
      price_BNB: string
    }
  }
}

// const api = 'https://api.pancakeswap.info/api/tokens'
const api = 'https://api-baobab-v2.scope.klaytn.com/v2/accounts/0xD5446765A8F332795b6b927C17DBC420d9654D49'


const useGetPriceData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const res: ApiResponse = await response.json()
        
        setData(res)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetPriceData
