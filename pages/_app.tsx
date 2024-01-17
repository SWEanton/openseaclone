import '../styles/globals.css'
import Link from 'next/link'
import type { AppProps } from 'next/app'
import { ThirdwebProvider, metamaskWallet, useContract } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ACTIVE_CHAIN } from '../const/yourDetails';
import { ethers } from 'ethers';
import { AppType } from 'next/app';
const sdk = new ThirdwebSDK ("mumbai", {
  clientId : "d435882a4a6a9827818d3671a163f6b3",
});



function MyApp({ Component, pageProps }: AppProps){
  return (
    <ThirdwebProvider activeChain='mumbai'
    authConfig={{ domain: "example.com", authUrl: "/api/auth" }}
    clientId="d435882a4a6a9827818d3671a163f6b3"
    supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
      ]}
    
    > <header className="header">
    <h1>2024</h1>
  </header>
      
     
 
      <div className="bakgrundsvideo">
      <video
  autoPlay
  muted
  loop
  className="absolute z-0 w-full h-full object-cover opacity-90"
  style={{ zIndex: 1 }}
  src="/bakgrundvideo.mp4"
/>

      </div>
        <div className="relative z-10">
          <nav className="border-b p-6">
            <p className="text-5xl font-bold"> NFT World </p>
            <p className="text-xl font-bold"> Mint, explore and burn NFTs </p>
            <div className="text-xl flex mt-4 justify-between">
              <div className="flex space-x-8">
                <Link href="/" passHref>
                  My NFTs
                </Link>
                <Link href="/create-item" passHref>
                  Marketplace
                </Link>
                <Link href="/my-assets" passHref>
                  My Listings
                </Link>
                <Link href="/creator-dashboard" passHref>
                  NFT Creator 
                </Link>
              </div>
              <ConnectWallet />
            </div>
          </nav> 
          <Component {...pageProps} />
        </div>
        <footer className="footer"><h2></h2></footer>
    </ThirdwebProvider>
  )
}
function Component() {
  const { contract, isLoading } = useContract("0xd17D48b8F7B99e22e6ebE614bbF0e37c13a89391");
}
export default MyApp