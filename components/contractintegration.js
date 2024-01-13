// contract.js
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import NFT from '../contracts/nftMint.json';
import Market from '../contracts/NFTworld.json';

const nftaddress = '0xe7DB92A4F83A8Cb86057e6775CFc88bF24757262';
const nftmarketaddress = '0xF330b54FaB0Fa5F9B5c799605E8e0496018ee84f';

export async function createToken(url) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
  let transaction = await contract.createToken(url);
  let tx = await transaction.wait();
  let event = tx.events[0];
  let value = event.args[2];
  let tokenId = value.toNumber();
  return tokenId;
}



export async function getNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    
    // Get the total supply of the NFTs
    const totalSupply = await contract.totalSupply();
  
    // Loop through each NFT and get its details
    let nfts = [];
    for (let i = 0; i < totalSupply; i++) {
      let nft = await contract.tokenByIndex(i);
      nfts.push(nft);
    }
  
    return nfts;




// // import React from 'react';
// import { createToken, getNFTs } from './contractintegration';
// import { useIPFS } from './ipfs';

// function YourComponent() {
//   const { fileUrl, uploadToIPFS, fetchFromIPFS } = useIPFS();

//   const handleFileChange = async (e) => {
//     await uploadToIPFS(e);
//   };

//   const handleMint = async () => {
//     if (fileUrl) {
//       const tokenId = await createToken(fileUrl);
//       console.log(`Minted token with ID: ${tokenId}`);

//       // Fetch the token details
//       const nfts = await getNFTs();
//       const tokenURI = nfts[tokenId].tokenURI;

//       // Fetch the data from IPFS
//       const data = await fetchFromIPFS(tokenURI);
//       console.log(data);
//     } else {
//       console.log('No file uploaded');
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleMint}>Mint Token</button>
//     </div>
//   );
// }

// export default YourComponent;