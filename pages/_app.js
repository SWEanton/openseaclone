import '../styles/globals.css'
import Link from 'next/link'
import { ThirdwebProvider, metamaskWallet, useWallet } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { ThirdwebSDK } from '@thirdweb-dev/sdk';

const sdk = new ThirdwebSDK ("mumbai", {
  clientId : "d435882a4a6a9827818d3671a163f6b3",
});

const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={activeChain}
    clientId="d435882a4a6a9827818d3671a163f6b3"
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
      ]}
    >
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
            <p className="text-4xl font-bold"> NFT Marketplace </p>
            <div className="flex mt-4 justify-between">
              <div classname="flex space-x-4">
                <Link href="/" passHref>
                  Home
                </Link>
                <Link href="/create-item" passHref>
                  Create
                </Link>
                <Link href="/my-assets" passHref>
                  My NFTs
                </Link>
                <Link href="/creator-dashboard" passHref>
                  Dashboard
                </Link>
              </div>
              <ConnectWallet />
            </div>
          </nav> 
          <Component {...pageProps} />
        </div>
      
    </ThirdwebProvider>
  )
}

export default MyApp