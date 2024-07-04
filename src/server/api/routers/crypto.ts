import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env";
import { type geckoApiPrice } from "~/models/model";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cryptoRouter = createTRPCRouter({
  getPrice: publicProcedure
    .input(z.object({ coin_id: z.string() }))
    .query(async ({ input }) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${input.coin_id}&vs_currencies=usd`,
        {
          headers: {
            "x-cg-demo-api-key": env.COINGECKO_API_KEY,
            "accept": "application/json"
          },
          // cache: "force-cache",
        },
      );

      if (!res.ok || res.body == null) {
        const errorObj = await res.json() as { error: string };
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorObj.error
        })
      }
      const json = await res.json() as geckoApiPrice

      return {
        price: json[input.coin_id]!.usd,
      };
    }),
});
