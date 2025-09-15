import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet,JsonRpcProvider, formatEther } from "ethers";

type EthWalletProps = {
  mnemonic: string;
};

interface WalletInfo {
  address: string;
  balance: string;
}

const provider = new JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/1NM8DdSW4mJYUWtMNZgkz"
);

export const EthWallet = ({ mnemonic }: EthWalletProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<WalletInfo[]>([]);

  const addEthWallet = async () => {
    if (!mnemonic) {
      alert("Please generate a seed phrase first.");
      return;
    }

    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/0'/0/${currentIndex}`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const childNode = hdNode.derivePath(derivationPath);
    const newWallet = new Wallet(childNode.privateKey);

    const blockNumber = "latest";
    const block = await provider.getBlock(blockNumber);
    console.log("BlockNumber : ", block);

    // fetching balances
    const balanceWei = await provider.getBalance(newWallet.address);
    const balanceEth = formatEther(balanceWei);


    setCurrentIndex(currentIndex + 1);
    setWallets([...wallets,{address : newWallet.address ,balance: balanceEth }]);
  };

  return (
    <div>
      <button onClick={addEthWallet}>Add ETH wallet</button>

      {wallets.map((wallet) => (
        <div key={wallet.address} style={{ padding: 2 }}>
          ETH Address: {wallet.address} | Balance: {parseFloat(wallet.balance).toFixed(5)}ETH
        </div>
      ))}
    </div>
  );
};
