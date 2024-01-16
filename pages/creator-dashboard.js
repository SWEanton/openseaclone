import { useContract } from "@thirdweb-dev/react";

export default function Component() {
    const { contract, mutate: burnNFT, isLoading, error } = useContract("0xd17D48b8F7B99e22e6ebE614bbF0e37c13a89391");

    if (error) {
        console.error("failed to burn NFT", error);
    }

    return (
        <button style={{ border: "3px solid black" }} disabled={isLoading} onClick={() => burnNFT({ tokenId: 0, amount: 1 })}>
            {"Burn NFT"}
        </button>
    );
}
