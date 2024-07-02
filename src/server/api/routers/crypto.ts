import { z } from "zod";
import { env } from "~/env";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cryptoRouter = createTRPCRouter({
  getPrice: publicProcedure
    .input(z.object({ coin_id: z.string() }))
    .query(async ({ input }) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?x_cg_demo_api_key=${env.COINGECKO_API_KEY}=${input.coin_id}&vs_currencies=usd`,
        {
          cache: "force-cache",
          next: { revalidate: 600 },
        },
      );

      if (!res.ok || res.body == null) {
        return { error: "Failled to fetch coin data." };
      }
      const json = (await res.json()) as any;
      return {
        price: json[input.coin_id]["usd"],
      };
    }),
});
