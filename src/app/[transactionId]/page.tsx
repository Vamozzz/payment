"use client"
import { FirstThemeProvider } from "@/firstModule/page";
import { FirstModuleProvider } from "@/provider/invoiceProvider";
import { useRouter } from "next/navigation";
import React from "react";

function Page(params: any) {
  console.log(params, "===params===");
  const router = useRouter();
  console.log(router,"router====>")
  return (
    <FirstModuleProvider>
      <FirstThemeProvider />
    </FirstModuleProvider>
  );
}
// const generateStaticParams = () =>{

// }

export default Page;


// "use client"
// import { FirstThemeProvider } from "@/firstModule/page";
// import { FirstModuleProvider } from "@/provider/invoiceProvider";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// function Page(params: any) {
//   const router = useRouter();
//   const [transactionData, setTransactionData] = useState(null);

//   useEffect(() => {
//     // Fetch data for the specific transactionId using router.query.transactionId
//     const transactionId = router.query.transactionId;
//     if (transactionId) {
//       fetchTransactionData(transactionId)
//         .then(data => setTransactionData(data))
//         .catch(error => console.error('Error fetching transaction data:', error));
//     }
//   }, [router.query.transactionId]);

//   console.log(transactionData, "===transactionData===");

//   return (
//     <FirstModuleProvider>
//       <FirstThemeProvider />
//     </FirstModuleProvider>
//   );
// }

// export default Page;
