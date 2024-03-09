import { FirstThemeProvider } from "@/firstModule/page";
import { FirstModuleProvider } from "@/provider/invoiceProvider";

export default function Home() {
  return (
    <main className="">
      <FirstModuleProvider>
        {/* <Component {...pageProps} /> */}
        <FirstThemeProvider />
      </FirstModuleProvider>
    </main>
  );
}
