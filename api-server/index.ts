import express from "express";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

const t = initTRPC.create();
const appRouter = t.router({
  hello: t.procedure.query(() => "Hello world!"),
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
const port = 4200;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
