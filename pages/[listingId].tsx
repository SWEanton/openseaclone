import { useRouter } from "next/router";
import {
  useContract,
  useDirectListings,
  MediaRenderer,
} from "@thirdweb-dev/react";
import Image from "next/image";
import { BigNumber } from "ethers";

const contractAddress = "0x30B71480E74081137bFCB9E47B75768FDE09f2e9";

export default function NFT() {
  const router = useRouter();
  const { listingId: paramListingId } = router.query;

  const { contract } = useContract(contractAddress, "marketplace-v3");
  const {
    data: listingData,
    isLoading,
    error,
  } = useDirectListings(contract, paramListingId as string);

  if (isLoading || !listingData) return <div>Loading ...</div>;

  const listing = listingData[paramListingId]; 
  console.log(listing);

  const buyoutListing = async () => {
    try {
      await contract?.buyoutListing(BigNumber.from(listing.values), 1);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="left" key={listing.id}>
          <MediaRenderer
            width="500px"
            height="500px"
            className="imagesListing"
            src={listing.asset?.image}
          />
        </div>
        <div className="right">
          <h2>Asset Name: {listing.asset?.name || "N/A"}</h2>
          {listing?.sellerAddress}
          <p>{listing?.asset?.description || "N/A"}</p>
          <p> Price: {listing?.currencyValuePerToken.displayValue || "N/A"}</p>
          <p> Quanity: {listing?.quantity || "N/A"}</p>
          <button className="demoBtn" onClick={buyoutListing}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
