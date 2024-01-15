import { useState } from 'react';
import { useContract, Web3Button } from "@thirdweb-dev/react";
import { useRouter } from 'next/router';

import {
  nftaddress
} from '../config';

const activeChain = "mumbai";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });
  const router = useRouter();
  const { contract } = useContract(nftaddress);
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

  return (
    <>
      <Web3Button 
        contractAddress={nftaddress}
        activeChain={activeChain}
        action={async (contract) => {
          const { name, description, price } = formInput;
          if (!name || !description || !price || !fileUrl) {
            return;
          }

          const metadata = {
            name,
            description,
            image: fileUrl,
          };

          await contract.call("mintTo", ["0x238064c094A9970e797629fF839f4B4f97E5476a", metadata]);
          router.push('/');
        }}
      >
        mint NFT
      </Web3Button>
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
        </div>
      </div>
    </>
  );
}