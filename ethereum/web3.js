import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // Running in a browser with MetaMask
    window.ethereum.request({ method: "eth_requestAccounts" }); // Ask user for permission
    web3 = new Web3(window.ethereum);
} else {
    // Running on server or user has no MetaMask
    const provider = new Web3.providers.HttpProvider(
        'https://sepolia.infura.io/v3/eb60a3eb5e7b40c2b1bdc6f4ab46d099'
    );
    web3 = new Web3(provider);
}

export default web3;
