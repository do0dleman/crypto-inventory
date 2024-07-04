import { api } from "~/trpc/server";

export default async function Home() {
  const btcPrice = await api.crypto.getPrice({ coin_id: "binance-bitcoin" });

  return (
    <div className="mt-5 flex justify-center">
      <div className="w-2/3 text-3xl">
        {<p>BTC price: {btcPrice.price ?? "unknown"}</p>}
      </div>
    </div>
  );
}
