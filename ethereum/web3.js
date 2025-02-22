import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && window.ethereum) {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    const providers = {
        sepolia: "https://sepolia.infura.io/v3/eb60a3eb5e7b40c2b1bdc6f4ab46d099",
        anotherChain: "https://kopli-rpc.rnk.dev/"
    };

    const network = process.env.NEXT_PUBLIC_CHAIN || "sepolia";
    web3 = new Web3(new Web3.providers.HttpProvider(providers[network]));
}

export default web3;
