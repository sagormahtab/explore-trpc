// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../api-server/index";

export const trpc = createTRPCReact<AppRouter>();
