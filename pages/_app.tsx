import type { AppProps } from "next/app";
import store from "@/redux/store";
import { ClientOnly } from "@/components";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientOnly>
      <Provider store={store}>
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </ClientOnly>
  );
}
