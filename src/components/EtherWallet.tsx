import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

type EthWalletProps = {
  mnemonic: string;
};

export const EthWallet = ({ mnemonic }: EthWalletProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  const addEthWallet = async () => {
    if (!mnemonic) {
      alert("Please generate a seed phrase first.");
      return;
    }

    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/0'/0/${currentIndex}`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const childNode = hdNode.derivePath(derivationPath);
    const wallet = new Wallet(childNode.privateKey);

    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

  return (
    <div>
      <button onClick={addEthWallet}>Add ETH wallet</button>

      {addresses.map((address) => (
        <div key={address}>{address}</div>
      ))}
    </div>
  );
};
