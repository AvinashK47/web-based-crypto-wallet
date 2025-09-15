import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";

type SolanaWalletProps = {
  mnemonic: string;
};

export default function SolanaWallet({ mnemonic }: SolanaWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

  const addWallet = async () => {
    if (!mnemonic) return;

    const seed = await mnemonicToSeed(mnemonic);

    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, Buffer.from(seed).toString("hex")).key;
    const keypair = Keypair.fromSeed(derivedSeed);

    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
  };

  return (
    <div>
      <button onClick={addWallet}>Add SOL Wallet</button>
      <div>
        {publicKeys.map((p) => (
          <div key={p.toBase58()} style={{ padding: 2 }}>
            {p.toBase58()}r
          </div>
        ))}
      </div>
    </div>
  );
}
