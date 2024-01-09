import pinataSDK from '@pinata/sdk';
import { useState } from 'react';

const pinata = pinataSDK('f6607b605ac7fcedfdcb', 'f9090577a16641f2bd1caf0d061674482460e72434990794497c0a9db8938c07');

export function useIPFS() {
  const [fileUrl, setFileUrl] = useState(null);

  async function uploadToIPFS(e) {
    const file = e.target.files[0];
    try {
      const data = new FormData();
      data.append('file', file);

      const result = await pinata.pinFileToIPFS(data, {
        pinataOptions: { cidVersion: 0 }
      });

      const url = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
      setFileUrl(url);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchFromIPFS(cid) {
    try {
      const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(`There was a problem retrieving the file from IPFS: ${e}`);
    }
  }

  return { fileUrl, uploadToIPFS, fetchFromIPFS };
}