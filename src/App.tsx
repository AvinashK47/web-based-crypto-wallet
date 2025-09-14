import { useState } from "react";
import "./App.css";
import { generateMnemonic } from "bip39";
import SolanaWallet from "./components/SolanaWallet";
import { EthWallet } from "./components/EtherWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div>
      <h1>WEB_BASED_WALLET</h1>
      <button
        onClick={async function () {
          const mn = generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>
      <h2>Seed Phrase</h2>
      <div>{mnemonic}</div>
      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </div>
  );
}

export default App;
