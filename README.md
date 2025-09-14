# Web-Based Crypto Wallet

This is a simple web-based cryptocurrency wallet that supports both Ethereum and Solana. It is a hierarchical deterministic (HD) wallet, which means it can generate multiple accounts from a single seed phrase.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AvinashK47/web-based-crypto-wallet.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## About the Wallet

This wallet is a hierarchical deterministic (HD) wallet. This means that you can generate a nearly infinite number of cryptocurrency accounts from a single 24-word seed phrase. The wallet uses the BIP39 standard for generating the seed phrase and the BIP32/BIP44 standards for deriving the accounts.

For Ethereum, the derivation path used is `m/44'/60'/0'/0/i`, where `i` is the account index.
For Solana, the derivation path used is `m/44'/501'/i'/0'`, where `i` is the account index.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web projects.
- **Ethers.js:** A complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.
- **Solana/web3.js:** The Solana JavaScript API.
- **bip39:** A library for generating mnemonic phrases.
- **ed25519-hd-key:** A library for hierarchical deterministic keys over the ed25519 curve.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
