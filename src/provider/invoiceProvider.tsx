"use client";

import SkeletonColor from "@/components/skeleton";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

type ContextData = {
  invoiceData: {
    payable_amount: string;
    customerName: string;
    customerMobile: string;
    invoiceId: string;
    merchant_logo: string;
    merchant_name_logo: string;
    template_id: number;
    order_id: string;
    transaction_id: string;
    settlement_time: string;
    txn_status: string;
    vendor_name: string;
    vendor_email: string;
    vendor_number: string;
    bg_color?: string;
  } | null;
  loading: boolean;
};

export const FirstModuleContext = createContext<ContextData>({
  invoiceData: null,
  loading: true,
});

type FirstModuleProviderProps = {
  children: ReactNode;
};

export const FirstModuleProvider: React.FC<FirstModuleProviderProps> = ({
  children,
}) => {
  const [invoiceData, setInvoiceData] =
    useState<ContextData["invoiceData"]>(null);
  const [loading, setLoading] = useState(true);
  const urlParams = usePathname();
  const urlParamsString = urlParams?.split("/");
  const invoiceId = urlParamsString?.[urlParamsString.length - 1];
  const router = useRouter();
  console.log(router, "----->router");

  useEffect(() => {
    const fetchData = async () => {
      // const urlParams = "https://vampay.in/Merchant/pin/ba4gMu";
      // const urlParamsString = urlParams.split("/");
      try {
        const response = await fetch(
          "https://api.vampay.in/Merchent/merchantCreateInvoice",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              invoice_id: invoiceId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("API request failed Error fetching Invoice");
        }

        const data = await response.json();
        setInvoiceData(data.data);
        if (data.data.error_message) {
          alert("Incorrect Url");
          throw new Error("Incorrect Url");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("urlParams", urlParams);
  console.log(loading, "==>loading");

  return (
    <FirstModuleContext.Provider value={{ invoiceData, loading }}>
      {children}
      {loading && <SkeletonColor />}
    </FirstModuleContext.Provider>
  );
};

export const useFirstModule = () => {
  return useContext(FirstModuleContext);
};

// FirstModuleProvider.tsx

// import SkeletonColor from "@/components/skeleton";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
// import {
//   useEffect,
//   useState,
//   createContext,
//   useContext,
//   ReactNode,
// } from "react";

// type InvoiceData = {
//   payable_amount: string;
//   customerName: string;
//   customerMobile: string;
//   invoiceId: string;
//   merchant_logo: string;
//   merchant_name_logo: string;
//   template_id: number;
//   order_id: string;
//   transaction_id: string;
//   settlement_time: string;
//   txn_status: string;
//   vendor_name: string;
//   vendor_email: string;
//   vendor_number: string;
//   bg_color?: string;
// };

// type ContextData = {
//   invoiceData: InvoiceData | null;
//   loading: boolean;
//   error?: string;
// };

// export const FirstModuleContext = createContext<ContextData>({
//   invoiceData: null,
//   loading: true,
// });

// type FirstModuleProviderProps = {
//   children: ReactNode;
// };

// export const FirstModuleProvider: React.FC<FirstModuleProviderProps> = ({
//   children,
// }) => {
//   const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | undefined>();
//   const router = useRouter();
//   const { transactionId } = router.query;

//   useEffect(() => {
//     const fetchInvoiceData = async (id: string) => {
//       try {
//         const response = await fetch(
//           `https://api.vampay.in/Merchent/merchantCreateInvoice`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               invoice_id: id,
//             }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("API request failed. Error fetching invoice data.");
//         }

//         const data = await response.json();
//         setInvoiceData(data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch invoice data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (transactionId) {
//       const id = Array.isArray(transactionId) ? transactionId[0] : transactionId;
//       fetchInvoiceData(id);
//     }
//   }, [transactionId]);

//   return (
//     <FirstModuleContext.Provider value={{ invoiceData, loading, error }}>
//       {children}
//       {loading && <SkeletonColor />}
//       {error && <div>{error}</div>}
//     </FirstModuleContext.Provider>
//   );
// };

// export const useFirstModule = () => {
//   return useContext(FirstModuleContext);
// };
