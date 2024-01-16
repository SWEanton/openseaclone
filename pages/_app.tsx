import '../styles/globals.css'
import Link from 'next/link'
import { ThirdwebProvider, metamaskWallet, useContract } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ACTIVE_CHAIN } from '../const/yourDetails';
import { ethers } from 'ethers';
const sdk = new ThirdwebSDK ("mumbai", {
  clientId : "d435882a4a6a9827818d3671a163f6b3",
});



function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={ACTIVE_CHAIN}
    authConfig={{ domain: "example.com", authUrl: "/api/auth" }}
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
            <div className="text-xl flex mt-4 justify-between">
              <div className="flex space-x-8">
                <Link href="/" passHref>
                  My NFTs
                </Link>
                <Link href="/create-item" passHref>
                  Signature Mint
                </Link>
                <Link href="/my-assets" passHref>
                  Burn NFTs
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

    </ThirdwebProvider>
  )
}
function Component() {
  const { contract, isLoading } = useContract("0xd17D48b8F7B99e22e6ebE614bbF0e37c13a89391");
}
export default MyApp