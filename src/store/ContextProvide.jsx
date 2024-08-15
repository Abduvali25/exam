import React, { createContext, useContext, useState, useEffect } from "react";

const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [selectedCoins, setSelectedCoins] = useState([]);

  useEffect(() => {
    const savedCoins = JSON.parse(localStorage.getItem("selectedCoins")) || [];
    setSelectedCoins(savedCoins);
  }, []);

  const toggleCoin = (coin) => {
    const isSelected = selectedCoins.some((c) => c.id === coin.id);

    if (isSelected) {
      const updatedCoins = selectedCoins.filter((c) => c.id !== coin.id);
      setSelectedCoins(updatedCoins);
      localStorage.setItem("selectedCoins", JSON.stringify(updatedCoins));
    } else {
      const updatedCoins = [...selectedCoins, coin];
      setSelectedCoins(updatedCoins);
      localStorage.setItem("selectedCoins", JSON.stringify(updatedCoins));
    }
  };

  return (
    <CoinContext.Provider
      value={{ selectedCoins, setSelectedCoins, toggleCoin }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export const useCoinContext = () => useContext(CoinContext);
