import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Image from 'next/image'

import {
  nftmarketaddress, nftaddress
} from '../config'

export function Navbar() {
  const address = useAddress();

  return (
      <div>
          <div>
              <Link href='/'>
                  <p>Marketplace</p>
              </Link>
              <div>
                  <Link href='/buy'>
                      <p>Buy</p>
                  </Link>
                  <Link href='/sell'>
                      <p>Sell</p>
                  </Link>
              </div>
              <div>
                  <ConnectWallet/>
                  {address && (
                      <Link href={`/profile/${address}`}>
                          {/* Image of avatar */}
                      </Link>
                  )}
              </div>
          </div>
      </div>
  )
};