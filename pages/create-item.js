import { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';

import {
  nftaddress, nftmarketaddress
} from '../config';
import NFT from '../contracts/nftMint.json';
import Market from '../contracts/NFTworld.json';
import Image from 'next/image';

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);

    const response = await fetch('/api/ipfs', {
      method: 'POST',
      body: data
    });

    if (response.ok) {
      const { url } = await response.json();
      setFileUrl(url);
    } else {
      console.error('Error uploading file');
    }
  }

  async function createItem() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) {
      return;
    }

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    const response = await fetch('/api/ipfs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });

    if (response.ok) {
      const { url } = await response.json();
      createSale(url);
    } else {
      console.error('Error uploading file');
    }
  }

  async function createSale(url){
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait()

    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(
        nftaddress, tokenId, price, {value: listingPrice }
    )

    await transaction.wait()

    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({...formInput, name: e.target.value})}
        />
        <textarea
          placeholder="Asset description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({...formInput, description: e.target.value})}
        />
        <input 
          placeholder="Asset Price in Eth"
          className="mt-8 border rounded p-4"
          type="number"
          onChange={e => updateFormInput({...formInput, price: e.target.value})}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <Image
              src={fileUrl}
              alt="NFT preview"
              className="rounded mt-4"
              width={350}
              height={500}
            />
          )
        }
        <button onClick={createItem}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >Mint NFT</button>
      </div>
    </div>
  )
}