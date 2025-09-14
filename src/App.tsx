import { useState } from "react";
import "./App.css";
import { generateMnemonic, mnemonicToSeed } from "bip39";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div>
      <h1>WEB_BASED_WALLET</h1>
      <button
        onClick={async function () {
          const mn = generateMnemonic();
          setMnemonic(mn);
          const seed = await mnemonicToSeed(mn);
          console.log(seed);
        }}
      >
        Create Seed Phrase
      </button>
      <h2>Seed Phrase</h2>
      <div>{mnemonic}</div>
    </div>
  );
}

export default App;
