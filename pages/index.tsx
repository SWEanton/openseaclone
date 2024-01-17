import { useEffect, useState } from 'react';
import { useContract, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useRouter } from 'next/router';
import React from 'react';
function Home() {
  const { contract } = useContract(
    "0xd17D48b8F7B99e22e6ebE614bbF0e37c13a89391",
    "NFTmint"
  );
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (contract) {
      contract.erc721.getAll().then(setNfts);
    }
  }, [contract]);

  const truncateAddress = (address) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };

  const handleViewOnOpensea = (nft) => {
    window.open(`https://testnets.opensea.io/assets/${nft.metadata.address}/${nft.metadata.id}`);
  };

  return (
    <div style={{ border: '4px solid black',  padding: '10px', width: '100%' }}>
      {nfts && nfts?.length > 0 && (
        <div className="nft-list">
          {nfts.map((nft) => (
            <div key={nft.metadata.id.toString()} className="nft-item">
              <h1>{nft.metadata.name}</h1>
              <ThirdwebNftMedia metadata={nft.metadata} />
              <p>owned by {truncateAddress(nft.owner)} (logged in user) </p>
              <button onClick={() => handleViewOnOpensea(nft)} style={{ border: '3px solid black' }}>View on opensea</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;