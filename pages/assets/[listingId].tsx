import React from 'react';
import { useRouter } from 'next/router';
import { MediaRenderer, useContract, useDirectListings} from '@thirdweb-dev/react';
const contractAdress = "0x30B71480E74081137bFCB9E47B75768FDE09f2e9";


function NFT () {
    const router = useRouter();


    const {listingId : paramsListingId} = router.query;

    const {contract} = useContract(contractAdress, 'NFTmarketplace');

    const {
        data : listingData,
        isLoading,
         error,
        } = useDirectListings(contract, paramsListingId as string);


    if (isLoading || !listingData) return <div>Loading ....</div>;

    const listing = listingData[paramsListingId];
    console.log(listing);
    
    return ( 
        <div>
        <div className='flex'>
                <div className='left' key={listing.id}>
                    <MediaRenderer width='500px' height='500px' src={listing.asset?.image} />
            </div>
            <div className='right'>
                <h2>AssetName : {listing.asset.name || 'N/A'}</h2>
                <p>{listing?.asset.description || 'N/A'}</p>
                <p>Price {listing?.currencyValuePerToken.displayValue} Matic</p>
                <p>Quantity : {listing?.quantity}</p>
                <button className='demoButton'>Buy now!</button></div>
            </div>

             </div>
    )
}

export default  NFT;