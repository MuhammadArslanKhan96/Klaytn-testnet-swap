import { useEffect } from 'react'
import useGetPriceData from './useGetPriceData'

const useGetDocumentTitlePrice = () => {
  const priceData = useGetPriceData();
  const cakePriceUsd = 0;
  console.log(priceData)
  try {
    // cakePriceUsd = priceData ? parseFloat(priceData.data[CAKE.address].price ?? 0) : 0
  } catch (e) {
    // Ignore
  }

  // const cakePriceUsdString =
  //   Number.isNaN(cakePriceUsd) || cakePriceUsd === 0
  //     ? ''
  //     : ` - $${cakePriceUsd.toLocaleString(undefined, {
  //         minimumFractionDigits: 3,
  //         maximumFractionDigits: 3,
  //       })}`

  // useEffect(() => {
  //   document.title = `PancakeSwap${cakePriceUsdString}`
  // }, [cakePriceUsdString])
}
export default useGetDocumentTitlePrice
