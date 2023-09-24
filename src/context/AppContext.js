import React, { useState, createContext } from "react";
import { ContractABI, Contractaddress } from "../Utils/AppUtils";
import { ethers } from "ethers";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState();
  const [numberOfCandidate, setNumberOfCandidate] = useState();
  const [scoreBoard, setScoreBoard] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("please download metamask");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts[0] == 0xb0d7a983777a847be125cf70c2116160f9a21ff0) {
      setIsOwner(true);
    }
    setWalletAddress(accounts[0]);
  };
  const disconnectWallet = () => {
    setWalletAddress("");
  };
  const getEthereumContract = () => {
    if (!window.ethereum) {
      alert("Please Download Metamask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(Contractaddress, ContractABI, signer);
    console.log(contract, provider, signer);
    return contract;
  };

  const setTimeLimitFn = async (timeLimit) => {
    try {
      const contract = getEthereumContract();
      const tx = await contract.addTimeLimit(timeLimit);
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };
  const getNumberOfCandidate = async () => {
    try {
      const contract = getEthereumContract();
      const limitPeopleInEvent = await contract.getCandidateCount();
      console.log(limitPeopleInEvent.toString());
      setNumberOfCandidate(limitPeopleInEvent.toString());
    } catch (error) {
      console.log(error);
    }
  };
  const setCandidateFn = async (name) => {
    try {
      const contract = getEthereumContract();
      const tx = await contract.addCandidate(name);
      await tx.wait();
      console.log(tx);
      getNumberOfCandidate();
    } catch (error) {
      console.log(error);
    }
  };

  const getScoreBoard = async () => {
    try {
      const contract = getEthereumContract();
      const limitPeopleInEvent = await contract.getCandidates();
      console.log(limitPeopleInEvent.toString());
      setScoreBoard(limitPeopleInEvent);
    } catch (error) {
      console.log(error);
    }
  };
  const voteFn = async (index) => {
    try {
      const contract = getEthereumContract();
      const tx = await contract.vote(index);
      await tx.wait();
      console.log(tx);
      getScoreBoard();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        setWalletAddress,
        walletAddress,
        connectWallet,
        disconnectWallet,
        setTimeLimitFn,
        numberOfCandidate,
        getNumberOfCandidate,
        setCandidateFn,
        getScoreBoard,
        voteFn,
        scoreBoard,
        isOwner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
