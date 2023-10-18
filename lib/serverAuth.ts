import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

const severAuth = async (req: NextApiRequest) => {
  const body = req.body;
  req.body = "";
  const session = await getSession({ req });
  req.body = body;
  console.log(session);
  if (!session?.user?.email) {
    throw new Error("Not signed In");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed In");
  }

  return { currentUser };
};

export default severAuth;
