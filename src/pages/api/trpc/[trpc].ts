import { createNextApiHandler } from "@trpc/server/adapters/next";

import { router } from "@/server/router";
import { createContext } from "@/server/trpc/context";

// export API handler
export default createNextApiHandler({
  createContext,
  router,
});
