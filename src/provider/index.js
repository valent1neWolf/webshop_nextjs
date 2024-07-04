"use client";
import store from "@/store";
import { Provider } from "react-redux";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ReduxProvider({ children, getSession }) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Provider store={store}>
        <Header getSession={getSession} />
        {children}
        <Footer />
      </Provider>
    </div>
  );
}
