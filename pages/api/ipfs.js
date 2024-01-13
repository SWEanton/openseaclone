import pinataSDK from '@pinata/sdk';

const pinata = pinataSDK('f6607b605ac7fcedfdcb', 'f9090577a16641f2bd1caf0d061674482460e72434990794497c0a9db8938c07');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const result = await pinata.pinFileToIPFS(data, {
        pinataOptions: { cidVersion: 0 }
      });
      const url = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
      res.status(200).json({ url });
    } catch (e) {
      res.status(500).json({ error: 'Error uploading to IPFS' });
    }
  } else {
    res.status(405).json({ error: 'Only POST requests are accepted' });
  }
}