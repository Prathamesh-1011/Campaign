# DeFi - Decentralized Crowdfunding Platform
DeFi - Campaign is a blockchain-powered decentralized crowdfunding platform that ensures transparency, security, and accountability. Unlike traditional platforms, funds are only released when milestones are met and approved by backers, eliminating fraud and mismanagement. With cross-chain support and reactive smart contracts, it enables global participation with reduced fees and automated fund governance.

## 🚀 Problem It Solves
Traditional crowdfunding platforms lack transparency and accountability. Once backers contribute, they have no control over fund usage, which can lead to mismanagement or fraud. Centralized platforms also impose high fees, delays, and restrictions, making global participation difficult.

## 🔥 Our Solution
Our **decentralized crowdfunding platform** ensures that funds are released only when milestones are met and backers approve the request. Smart contracts automate verification, eliminating fraud and enhancing financial integrity.

### **Reactive Smart Contracts in Our Platform**  
Our platform leverages **Reactive Smart Contracts** to automate transactions and improve fund governance.  

- **Main Branch (`Campaign.sol`)**  
  We implemented reactivity by automatically executing transactions when an approval request surpasses **50% of backers' votes**. Additionally, campaign owners can only create a withdrawal request once the **minimum funding threshold** is met, ensuring responsible fund allocation.  

- **Cross-Chain Campaign Branch**  
  Here, reactive smart contracts facilitate **cross-chain bridging**, ensuring seamless fund transfers between blockchains. This enables backers to contribute using different networks while maintaining the same governance and milestone-based fund release system.  

## 🎯 Key Features & Benefits
- **🔗 Reactive Smart Contracts**: Funds are managed dynamically based on milestones and backer votes.
- **⚖️ Decentralized Governance**: Backers approve fund withdrawals, ensuring accountability.
- **⏳ Automated Fund Release**: Funds are locked until project progress is verified.
- **💰 Reduced Fees & Faster Transactions**: No intermediaries, lowering costs and delays.
- **🌍 Global Accessibility**: Open to anyone worldwide, enabling borderless crowdfunding.
- **🔎 Transparency & Security**: On-chain tracking prevents fund misuse, ensuring verifiability.

## 💡 Use Cases
- **🚀 Startup Fundraising**: Entrepreneurs secure funding while backers retain financial control.
- **❤️ Charitable Donations**: Donors can track fund usage in real time.
- **🎭 Creative Projects**: Artists and developers raise funds with blockchain-backed records.

## ⚡ Challenges We Overcame
### 1️⃣ Implementing Reactive Smart Contracts
- Leveraged **oracles** and **event listeners** to enable dynamic contract execution.

### 2️⃣ Gas Optimization
- Reduced costs using **calldata** over **memory**, optimizing storage and minimizing loops.

### 3️⃣ Handling Asynchronous Blockchain Events
- Used **webhooks** and **event subscriptions** for real-time UI updates.

### 4️⃣ Cross-Chain Compatibility
- Integrated **ChainLinks** for seamless multi-chain support.

### 5️⃣ Frontend-Blockchain Integration
- Adopted **ethers.js** and reactive state management to improve responsiveness.

## 🛠 Technologies Used
- **MetaMask** – Wallet integration
- **Next.js** – Frontend framework
- **Web3.js & Ethers.js** – Blockchain interaction
- **Ethereum** – Smart contract deployment
- **Infura** – Blockchain node provider
- **Hardhat** – Smart contract development
- **React.js** – Frontend development
- **Chainlink CCIP** – Cross-chain token bridging


## 📦 Installation & Setup
### Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### Install Dependencies
```sh
npm install
```

### Compile & Deploy Smart Contracts
```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

### Run the Development Server
```sh
npm run dev
```

## 🤝 Contributing
We welcome contributions! Please follow these steps:
1. **Fork** the repository.
2. **Create** a new branch (`git checkout -b feature-branch`).
3. **Commit** your changes (`git commit -m "Added new feature"`).
4. **Push** to your branch (`git push origin feature-branch`).
5. **Open a Pull Request**.

## 📜 License
This project is licensed under the **MIT License**.

---
✨ **Empowering Transparent & Decentralized Crowdfunding with Blockchain!** 🚀

