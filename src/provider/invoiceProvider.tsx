"use client";

import { usePathname } from "next/navigation";
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
  // const urlParams = usePathname();
  // const urlParamsString = urlParams.split("/");

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = "https://vampay.in/Merchant/pin/ba4gMu";
      const urlParamsString = urlParams.split("/");
      const invoiceId = urlParamsString[urlParamsString.length - 1];
      try {
        const response = await fetch(
          "https://api.vampay.in/Merchent/merchantCreateInvoice",
          {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": "https://vampay.in",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              invoice_id: invoiceId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        setInvoiceData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log(invoiceData, "invoiceData");

  return (
    <FirstModuleContext.Provider value={{ invoiceData, loading }}>
      {children}
    </FirstModuleContext.Provider>
  );
};

export const useFirstModule = () => {
  return useContext(FirstModuleContext);
};
