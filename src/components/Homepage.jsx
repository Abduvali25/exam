import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useCoinContext } from "../store/ContextProvide";
import { useCurrencyContext } from "../store/CurrencyContext";
import { Link } from "react-router-dom";
import Carusel from "./Carusel";


function HomePage() {
  const [coins, setCoins] = useState([]);
  const { selectedCoins, toggleCoin } = useCoinContext();
  const { currency } = useCurrencyContext();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [visiblePages, setVisiblePages] = useState(5);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toUpperCase()}&order=gecko_desc&per_page=249&page=1&sparkline=false&price_change_percentage=24h`
        );
        const data = await response.json();
        setCoins(data);
        console.log("Coins fetched:", data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, [currency]);

  const filteredCoins = coins.filter((coin) =>
    search.toLowerCase() === ""
      ? true
      : coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCoin = currentPage * itemsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - itemsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage);

  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="p-4">
      <Carusel />
      <h1 className="text-5xl text-white text-center mt-7 mb-7">
        Cryptocurrency Prices by Market Cap
      </h1>
      <br />
     
      <div className=" container overflow-x-auto table-div  ">
        <Table className="min-w-full bg-black text-white">
          <Table.Head>
            <Table.HeadCell className="bg-[#87CEEB]">Coin</Table.HeadCell>
            <Table.HeadCell className="bg-[#87CEEB]">
              Current Price
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#87CEEB]">
              Price Change (24h)
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#87CEEB]">Market Cap</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-700">
            {currentCoins.map((coin) => (
              <Table.Row
                key={coin.id}
                className="bg-gray-900 hover:bg-gray-800"
              >
                <Table.Cell>
                  <Link
                    to={`/about/${coin.id}`}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={coin.image}
                      alt={`Logo of ${coin.name}`}
                      className="h-10 w-10 mr-2"
                    />
                    <span className="font-medium">{coin.name}</span>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {currency === "USD"
                    ? `$${coin.current_price.toLocaleString()}`
                    : `${coin.current_price.toLocaleString()} ${currency}`}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-2">
                    <EyeIcon
                      className={`h-5 w-5 cursor-pointer ${
                        selectedCoins.some((c) => c.id === coin.id)
                          ? "text-green-500"
                          : "text--white"
                      }`}
                      aria-hidden="true"
                      onClick={() => toggleCoin(coin)}
                    />
                    <span
                      className={`${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h !== null &&
                      coin.price_change_percentage_24h !== undefined
                        ? coin.price_change_percentage_24h.toFixed(2)
                        : "N/A"}
                      %
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {currency === "USD"
                    ? `$${coin.market_cap.toLocaleString()}`
                    : `${coin.market_cap.toLocaleString()} ${currency}`}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-center gap-4 items-center mt-4">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-[#87CEEB] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
    >
      &lt;
    </button>
    <div className="flex items-center space-x-2">
      {startPage > 1 && (
        <>
          <button
            onClick={() => setCurrentPage(1)}
            className="px-3 py-1 rounded-md  text-[#87CEEB] hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            1
          </button>
          {startPage > 2 && <span className="text-[#87CEEB] bg-black">...</span>}
        </>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-black text-[#87CEEB]"
              : " text-[#87CEEB]"
          } hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-[#87CEEB]`}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-white">...</span>}
          <button
            onClick={() => setCurrentPage(totalPages)}
            className="px-3 py-1 rounded-md bg-black text-[#87CEEB] hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
    <button
      onClick={() =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
      }
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-[#87CEEB] text- rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
    >
      &gt;
    </button>
  </div>
    </div>
  );
}

export default HomePage;
