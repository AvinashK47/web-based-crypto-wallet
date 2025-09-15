import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL} from "@solana/web3.js";

type SolanaWalletProps = {
  mnemonic: string;
};

interface WalletInfo {
  publicKey: string;
  balance: number;
}

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export default function SolanaWallet({ mnemonic }: SolanaWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<WalletInfo[]>([]);

  const addWallet = async () => {
    if (!mnemonic) {
      alert("Please generate a seed phrase first.");
      return;
    }

    const seed = await mnemonicToSeed(mnemonic);

    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, Buffer.from(seed).toString("hex")).key;
    const keypair = Keypair.fromSeed(derivedSeed);

    // fetching balances
    const balanceLamports = await connection.getBalance(keypair.publicKey);
    const balanceSol = balanceLamports / LAMPORTS_PER_SOL;

    setCurrentIndex(currentIndex + 1);
    setWallets([...wallets,{ publicKey: keypair.publicKey.toBase58(), balance: balanceSol }]);
  };

  return (
    <div>
      <button onClick={addWallet}>Add SOL Wallet</button>
      <div>
        {wallets.map((wallet) => (
          <div key={wallet.publicKey}>
            SOL Address : {wallet.publicKey} | Balance: {wallet.balance.toFixed(5)} SOL
          </div>
        ))}
      </div>
    </div>
  );
}
