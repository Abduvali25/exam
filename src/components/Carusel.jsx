import React from "react";
import { Carousel } from "flowbite-react";
import { useCoinContext } from "../store/ContextProvide";
import { useCurrencyContext } from "../store/CurrencyContext";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const Carusel = () => {
  const { selectedCoins } = useCoinContext();
  const { currency } = useCurrencyContext();

  const coinChunks = chunkArray(selectedCoins, 4);

  return (
    <div
      style={{
        backgroundImage: `url('/bg.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-slate-400 relative h-56 sm:h-64 xl:h-80 2xl:h-96 border border-black overflow-hidden rounded-lg shadow-lg"
    >
     <div>
     <h1 className="text-5xl text-[#87CEEB] text-center mt-4">CRYPTOFOLIO WATCH LIST </h1>
     <p className="cripta-info">Get all the Info regarding your favorite Crypto Currency</p>
     </div>
      <Carousel
        slideInterval={3000}
        indicators={false}
        controls={true}
        className="carousel-container"
      >
        {coinChunks.map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            style={{
              backgroundImage: `url('/bg.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-full h-full flex flex-col items-center justify-center space-y-4 p-4"
          >
            <div className="flex space-x-20">
              {chunk.map((coin, coinIndex) => (
                <div key={coinIndex} className="flex flex-col items-center">
                  <img
                    className="object-cover rounded-lg w-24 h-24"
                    src={coin.image}
                    alt={`Coin ${chunkIndex * 4 + coinIndex}`}
                  />
                  <div className="flex gap-4">
                    <p className="text-white">{coin.symbol.toUpperCase()}</p>
                    <span
                      className={`${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </div>
                  <p className="text-white">
                    {currency === "USD"
                      ? `$${coin.current_price.toLocaleString()}`
                      : currency === "TRY"
                      ? `₺${coin.current_price.toLocaleString()}`
                      : currency === "ETH"
                      ? `Ξ${coin.current_price.toLocaleString()}`
                      : `$${coin.current_price.toLocaleString()}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carusel;
