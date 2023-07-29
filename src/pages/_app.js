import Layout from "@/Components/Layout";
import "@/styles/globals.css";
import { StoreProvider } from "@/state";

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
