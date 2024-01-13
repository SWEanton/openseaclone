import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage({
  secretKey: "e3-9unQnRVFFvpJv_IZi75j8x8cJpw1-VAYESj9ePP3sGPtLpMAmH_cOPkH8rrXeMqsAnOO5LLi4MQG_ywxvNg", // Replace with your secret key
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const uri = await storage.upload(data);
      const url = await storage.resolveScheme(uri);
      res.status(200).json({ url });
    } catch (e) {
      res.status(500).json({ error: 'Error uploading to IPFS' });
    }
  } else {
    res.status(405).json({ error: 'Only POST requests are accepted' });
  }
}