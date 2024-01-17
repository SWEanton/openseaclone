import { useEffect, useState } from 'react';
import { useContract, ThirdwebNftMedia, ConnectWallet, useDirectListings, MediaRenderer } from "@thirdweb-dev/react";
import React from 'react';
import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  const {contract} = useContract("0x30B71480E74081137bFCB9E47B75768FDE09f2e9", "NFTmarketplace")
  const {data: directListings, isLoading, error} = useDirectListings(contract, {start: 0, count: 10 });

  return (
    <main>
      <div className="flexHeader">
        <div>
          <h1>
            Hello and Welcome! To use this Dapp, please install metamask. You can find more information about it {" "}
            <span>
              <Link
                href="https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
                target="_blank"
                rel="noopener noreferrer"
              >
                here.
              </Link>
            </span>
          </h1>
        </div>
        <ConnectWallet className="my-custom-class" />
      </div>

      {isLoading && <div>Loading...</div>}
      <div className="nftGrid">
        {!isLoading &&
          directListings &&
          directListings.map((nft) => (
            <div className="nftDrop" key={nft.id}>
              <a href={`/assets/${nft.id}`}>
                  
                <MediaRenderer
                  width="100%"
                  className="images"
                  src={nft.asset.image}
                />
                <p>#{nft.asset.name}</p>
                <p> Price {nft.currencyValuePerToken.displayValue} Matic</p>
              </a>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Home;
