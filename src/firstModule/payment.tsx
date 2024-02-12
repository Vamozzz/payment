"use client";
import Queries from "@/firstModule/contact";
import FooterLink from "@/firstModule/footerLink";
import PaymentFailed from "@/firstModule/paymentFailed";
import PaymentStatus from "@/firstModule/paymentStatus";
import PaymentSuccess from "@/firstModule/paymentSuccessful";
import { useFirstModule } from "@/provider/invoiceProvider";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import WaitPage from "./waitPage";

interface PaymentProps {
  transactionStatus?: string;
}

const Payment: React.FC<PaymentProps> = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const { invoiceData } = useFirstModule();

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      getTransactionStatus();
      console.log("getTransactionStatus triggered");
    }, 1000);
    () => clearTimeout(timeOutID);
  }, []);

  const getTransactionStatus = async () => {
    try {
      const response = await fetch(
        "https://vampay.in/Merchent/InvoiceTransactionWebhook",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            invoice_id: invoiceData?.invoiceId,
          }),
        }
      );

      if (!response.ok) {
        setPaymentStatus("PENDING");
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log(data, "datadatadatadatadata=====>");
      setPaymentStatus(data?.data);
    } catch (error) {
      console.log(error);
      setPaymentStatus("PENDING");
    }
  };

  return (
    <div className="">
      {paymentStatus !== "" ? (
        <div>
          {paymentStatus === "PENDING" ? (
            <PaymentStatus />
          ) : paymentStatus === "SUCCESS" ? (
            <PaymentSuccess />
          ) : paymentStatus === "FAILURE" ? (
            <PaymentFailed />
          ) : null}

          <Queries />
          <FooterLink />
          <div className="flex flex-col gap-5  items-center pb-36">
            <div>
              <p>your money is always safe</p>
            </div>

            <div className=" w-full flex justify-around items-center">
              <div>
                <Image src={"/PCIDSS3.svg"} width={80} height={38} alt="logo" />
              </div>

              <div>
                <Image src={"/SECURE3.svg"} width={80} height={38} alt="logo" />
              </div>

              <div>
                <Image
                  src={"/MAKEININDIA3.svg"}
                  width={80}
                  height={38}
                  alt="logo"
                />
              </div>
              <div>
                <Image
                  src={"/DIGITALINDIA3.svg"}
                  width={80}
                  height={38}
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <WaitPage />
        </div>
      )}
    </div>
  );
};

export default Payment;
