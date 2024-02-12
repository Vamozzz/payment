import { FirstThemeProvider } from "@/firstModule/page";
import { FirstModuleProvider } from "@/provider/invoiceProvider";

export default function Home() {
  return (
    <main className="">
      {/* <SkeletonVariants />
       */}
      <FirstModuleProvider>
        {/* <Component {...pageProps} /> */}
        <FirstThemeProvider />
      </FirstModuleProvider>
    </main>
  );
}
