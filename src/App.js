import "./App.css";
import React, { useState, useEffect } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { API_KEY } from "./config";

const BEANZ_CONTRACT = "0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949";

const settings = {
  apiKey: API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

function App() {
  const [nfts, setNFTs] = useState([]);
  const [address, setAddress] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  // useEffect(() => {
  //   const getNFTs = async () => {
  //     const result = await alchemy.nft.getNftsForOwner(NFT_ADDRESS);
  //     const nftData = result.ownedNfts.filter(
  //       (nft) => nft.contract.address === BEANZ_CONTRACT
  //     );
  //     setNFTs(nftData);
  //   };

  //   getNFTs();
  // }, []);

  const getNFTs = async (userAddress) => {
    const options = { contractAddresses: [BEANZ_CONTRACT] };
    console.log(userAddress);
    const result = await alchemy.nft.getNftsForOwner(userAddress, options);

    setNFTs(result.ownedNfts);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Beanz Finder</h1>
        <div>
          <input
            onChange={handleChange}
            type="text"
            placeholder="ENS or Crypto Address"
          ></input>
          <button
            onClick={() => {
              console.log(address);
              getNFTs(address);
            }}
          >
            Search
          </button>
        </div>
        {nfts.map((nft) => {
          return (
            <div>
              <p>Name: {nft.title}</p>
              <img src={nft.media[0].gateway}></img>
              <div className="attribute-container">
                {nft.rawMetadata.attributes.map((attribute) => {
                  return (
                    <p>
                      {attribute.trait_type}: {attribute.value}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
