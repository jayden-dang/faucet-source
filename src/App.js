import './App.css';
import Web3 from "web3";
import { useState, useEffect } from 'react';
import detectEthereumProvider from "@metamask/detect-provider";



function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider
        })
      } else {
        console.error("please, Install Metamask")
      }
    }
    loadProvider()
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    web3Api.web3 && getAccount()
  }, [web3Api.web3]);


  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <div className="balance-view is-size-2">
          Current Balance: <strong>10 ETH</strong>
        </div>
        <button className="button is-primary mr-5">Donate</button>
        <button className="button is-danger mr-5">Withdraw</button>
        <button className="button is-link"
          onClick={() =>
            web3Api.provider.request({ method: "eth_requestAccounts" })
          }
        >
          Connect Wallets
        </button>
        <span>
          <p>
            <strong>Accounts Address: </strong>
            {
              account ? account : "Accounts Denined"
            }
          </p>
        </span>
      </div>
    </div>
  );
}

export default App;
