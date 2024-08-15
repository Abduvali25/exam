import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Line from "./chart";


function AboutPage() {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCoin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [coinId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!coin)
    return <div className="text-center py-10 text-red-500">No data found</div>;

  return (
    <div className="container mx-auto p-6 grid grid-cols-5">
      <div className="col-span-2 bg-black border-r text-white shadow-md m-4 p-6">
        <img
          src={coin?.image?.large}
          alt={`${coin?.name} logo`}
          className="w-40 h-40 object-cover rounded mb-2"
        />
        <div>
          <h1 className="text-3xl font-bold mb-3 mt-2">{coin?.name}</h1>
          <p className="text-lg text-gray-500 mb-3">
            {coin?.description?.en?.split(".")[0]}
          </p>
          <h1 className="text-xl mb-1">Rank: {coin?.market_cap_rank}</h1>
          <h2 className="text-xl mb-1">
            Current Price: {coin?.market_data?.current_price?.usd}
          </h2>
          <h3 className="text-xl mb-1">
            Market Cap: {coin?.market_data?.market_cap?.usd}
          </h3>
        </div>
      </div>


      <div className="mt-7 col-span-3">
        <Line />
        <div className="mt-3 flex gap-20">
        <button className=" bg-[#87CEEB] border border-[#87CEEB]  text-white font-bold py-2 px-4 rounded">
          24 Hours
        </button>
        <button className="border border-[#87CEEB]   text-white font-bold py-2 px-4 rounded">
          30 Days
        </button>
        <button className="border border-[#87CEEB] text-white font-bold py-2 px-4 rounded">
          3 Months
        </button>
        <button className="border border-[#87CEEB]   text-white font-bold py-2 px-4 rounded">
          1 Year
        </button>
      </div>
      </div>
    </div>
  );
}

export default AboutPage;