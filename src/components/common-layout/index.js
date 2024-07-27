const { default: ReduxProvider } = require("@/provider");
import { auth } from "@/auth";

export default async function CommonLayout({ children }) {
  const getSession = await auth();
  const maintenance = true;
  if (maintenance) {
    return (
      <div className="p-20 flex justify-center items-center">
        <h2 className="text-3xl flex font-extrabold justify-center text-center">
          We are currently under maintenance.
          <br /> The site will be back soon...
        </h2>
      </div>
    );
  } else {
    return <ReduxProvider getSession={getSession}>{children}</ReduxProvider>;
  }
}
