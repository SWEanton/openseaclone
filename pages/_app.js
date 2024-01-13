import '../styles/globals.css'
import Link from 'next/link'
import { ThirdwebProvider, metamaskWallet, walletConnect } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        walletConnect(),
      ]}
      clientId="<your_client_id>"
    >
      <div>
        <nav className="border-b p-6">
          <p className="text-4xl font-bold"> NFT World </p>
          <div className="flex mt-4"></div>
          <Link href="/" passHref>
            Home
          </Link>
          <Link href="/create-item" passHref>
            Mint & Sell NFTs
          </Link>
          <Link href="/my-assets" passHref>
            My NFTs
          </Link>
          <Link href="/creator-dashboard" passHref>
            Dashboard
          </Link>
          <ConnectWallet />
        </nav> 
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>
  )
}

export default MyApp