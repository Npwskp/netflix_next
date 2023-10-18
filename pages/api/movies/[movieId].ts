import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import severAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await severAuth(req);

    const { movieId } = req.query;

    if (typeof movieId !== "string") throw new Error("Invalid movieId");

    if (!movieId) throw new Error("movieId is required");

    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movies) throw new Error("Movie not found");

    return res.status(200).json(movies);
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}
