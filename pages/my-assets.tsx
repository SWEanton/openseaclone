import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const address = useAddress();
  const { contract, isLoading } = useContract(process.env.NFT_COLLECTION_ADDRESS);
  const [loading, setLoading] = useState(false);

  const validateAndMint = async () => {
    try {
      if (!address || isLoading) return;
      setLoading(true);
      // Contact API to check eligibility and get signature
      const response = await fetch("/api/requestMint", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        return alert("You are unable to mint at this time.");
      }

      await contract.erc721.signature.mint(data.signature);
      setLoading(false);
      alert("NFT minted!");
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert(
        "Something went wrong. Please check the console for more information."
      );
    }
  };

  return (
    <div className="container">
      <iframe
        src="https://embed.ipfscdn.io/ipfs/bafybeigdie2yyiazou7grjowoevmuip6akk33nqb55vrpezqdwfssrxyfy/marketplace-v3.html?contract=0x30B71480E74081137bFCB9E47B75768FDE09f2e9&chain=%7B%22name%22%3A%22Mumbai%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fmumbai.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22MATIC%22%2C%22symbol%22%3A%22MATIC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22maticmum%22%2C%22chainId%22%3A80001%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22mumbai%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9%2Fpolygon%2F512.png%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=d435882a4a6a9827818d3671a163f6b3&directListingId=0&theme=light&primaryColor=purple"
        width="600px"
        height="600px"
        style={{ maxWidth: "100%" }}
        frameBorder="0"
      ></iframe>
      <ConnectWallet />
      {address && (
        <button disabled={loading} className="button" onClick={validateAndMint}>
          {loading ? "Loading..." : "Burn NFT"}
        </button>
      )}
    </div>
  );
}