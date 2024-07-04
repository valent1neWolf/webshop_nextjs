const { default: ReduxProvider } = require("@/provider");
import { auth } from "@/auth";

export default async function CommonLayout({ children }) {
  const getSession = await auth();
  return <ReduxProvider getSession={getSession}>{children}</ReduxProvider>;
}
