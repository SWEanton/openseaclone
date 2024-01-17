import React, { useRef, useState } from 'react';
import { MediaRenderer, useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { ThirdwebProvider } from '@thirdweb-dev/react';

const Home: NextPage = () => {
  const address = useAddress();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [nftName, setNftName] = useState<string>("");
  const [nftDescription, setNftDescription] = useState<string>("");
  const [mintingNFT, setMintingNFT] = useState<boolean>(false);
  const [receiverAddress, setReceiverAddress] = useState<string>("");

  const { contract } = useContract("0xd17D48b8F7B99e22e6ebE614bbF0e37c13a89391");
  const { mutateAsync: mintTo, isLoading } = useContractWrite(contract, "mintTo")

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const reset = () => {
    setImageUrl(null);
  };

const handleMint = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      console.error("No file selected");
      return;
    }
  
    setMintingNFT(true);
    try {
      const _uri = imageUrl; // Use the uploaded image URL as the _uri parameter
      const _to = receiverAddress; // Use the receiver address from the state
      const data = await mintTo({ args: [_to, _uri] });
      console.info("contract call success", data);
    } catch (error) {
      console.error("contract call failure", error);
    } finally {
      setMintingNFT(false);
      setImageUrl(null);
      setNftName("");
      setNftDescription("");
      setReceiverAddress("");
    }
  };
  

  return (
    <ThirdwebProvider
    activeChain="mumbai"
    clientId="d435882a4a6a9827818d3671a163f6b3">
  
    <div className={styles.container}>
      
      {address ? (
        <div className={styles.minterContainer}>
          <div className={styles.mintContainerSection}>
            <h1>NFT CREATOR</h1>
            <div 
              className={styles.fileContainer} 
              onClick={handleFileSelect}
            >
              <input
                type="file"
                accept='image/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleChange}
              />
              {!imageUrl ? (
                <div
                  style={{ 
                    border: '2px dashed grey', 
                    padding: '20px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',    
                  }}
                >
                  <p>Click to add file <ul>or</ul> drag and drop a file in this window</p>
                </div>
              ) : (
                <div style={{ height: "100%" }}>
                  <MediaRenderer
                    src={imageUrl}
                    height='100%'
                    width='100%'
                  />
                  <button 
                    onClick={reset}
                    className={styles.resetButton}
                  >Reset</button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.mintContainerSection}>
            <h1>Details About Your NFT</h1>
            <p>NFT Name:</p>
            <input 
              type="text"
              placeholder="My NFT Name"
              onChange={(e) => setNftName(e.target.value)}
              value={nftName}
              className={styles.metadataInput}
            />
            <p>NFT Description:</p>
            <input 
              type="text"
              placeholder="This NFT is about..."
              onChange={(e) => setNftDescription(e.target.value)}
              value={nftDescription}
              className={styles.metadataInput}
            />
        <input 
          type="text"
          placeholder="Receiver Address"
          onChange={(e) => setReceiverAddress(e.target.value)}
          value={receiverAddress}
          className={styles.metadataInput}
        />
        <button
          className={styles.mintButton}
          onClick={handleMint}
          disabled={mintingNFT || isLoading}
        >
          {mintingNFT || isLoading ? "Minting NFT..." : "Mint NFT"}
        </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Please Sign In Using Metamask </h1>
        </div>
      )}
    </div>
    </ThirdwebProvider>
  );
};
function Component() {
  const { contract } = useContract("0xd17D48b8F7B99e22e6ebE614bbF0e37c13a89391");
}

export default Home;

