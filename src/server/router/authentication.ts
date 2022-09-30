import { authenticatedProcedure, t } from "@/server/trpc";

export const authenticationRouter = t.router({
  getSecretMessage: authenticatedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  getSession: t.procedure.query(({ ctx }) => {
    return ctx.session;
  }),
});
