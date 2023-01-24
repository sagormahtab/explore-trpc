import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { trpc } from "./trpc";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4200/trpc",
          // optional
          headers() {
            return {
              authorization: "token",
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="mt-10 text-3xl mx-auto max-w-6xl">
          <div>Name: client</div>
          <div>Framework: react</div>
          <div>Language: TypeScript</div>
          <div>CSS: Tailwind</div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
