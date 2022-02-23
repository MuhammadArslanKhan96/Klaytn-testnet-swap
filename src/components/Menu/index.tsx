import React, { useContext, useEffect } from 'react'
import { Contract } from '@ethersproject/contracts'
import { Menu as UikitMenu} from 'jungleswap-libs'
import { useWeb3React } from '@web3-react/core'
import { useTokenContract } from 'hooks/useContract'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import useGetPriceData from 'hooks/useGetPriceData'
import useAuth from 'hooks/useAuth'
import LEAF_ABI from '../../constants/abis/leaf.json'
// import useGetLocalProfile from 'hooks/useGetLocalProfile'
import links from './config'
import {ReactComponent as JungleSwapLogoWhite} from './images/jungleSwapLogoWhite.svg'
import {ReactComponent as JungleSwapLogoBlack} from './images/jungleSwapLogoBlack.svg'
import './index.css'

const Menu: React.FC = (props) => {
  const [price, setPrice] = React.useState(0)
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const priceData = useGetPriceData()
  let cakePriceUsd = 0;
  try {
    cakePriceUsd = priceData ? Number(priceData.data['0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'].price ?? 0) : 0
  } catch (e) {
    // Ignore
  }
  // const profile = useGetLocalProfile()
  const JungleSwapWrapper = styled.div`
    width: 100vw;

    .jungle-container{
      
    }

    .jungle-logo{
      position: absolute;
      top: 2px;
      left: 50px;
      z-index: 41;
      width: 150px;
      height: 60px;
    }
  `
  // const tokenContract = new Contract('0x6A748FB156F09594939372A443bC10091dad2BA3' || undefined, LEAF_ABI, undefined)
  const tokenContract =  useTokenContract('0x6A748FB156F09594939372A443bC10091dad2BA3' || undefined, false, LEAF_ABI)
  const getLeafdata = async (): Promise<any> => {
    // getContract
    // const tokenContract = await to
    if(tokenContract){
      const Leaf = await tokenContract?.price()
      const getPrice = parseInt(Leaf)
      setPrice(getPrice)
    }
  }
  getLeafdata()
  // React.useEffect(() => getLeafdata(),[])

  return (
    <div>
      <JungleSwapWrapper  className='jungle-container'>
      {
        isDark ? 
      <JungleSwapLogoWhite className='jungle-logo' width="100%" /> :
      <JungleSwapLogoBlack className='jungle-logo'/>
        } 
        </JungleSwapWrapper>
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={price}
      // profile={profile}
      {...props}
    />
    </div>
  )
}

export default Menu
