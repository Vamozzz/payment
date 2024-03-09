"use client";
import React, { createContext, useEffect, useState } from "react";
import AmountPayable from "./amountPayable";
import BrandSpace from "./brandSpace";
import SelectPayment from "./selectPayment";
import PaymentType from "./paymentType";
import DetailsPuller from "./puller";
import Queries from "./contact";
import FooterLink from "./footerLink";
import Image from "next/image";
import Payment from "./payment";
import { useFirstModule } from "@/provider/invoiceProvider";

const FirstTheme = () => {
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div className="relative bg-[#F1F1F1] w-full h-full flex flex-col gap-4 border-2">
      <BrandSpace />
      {!isSubmitted ? (
        <div className="px-8 ">
          <AmountPayable />
          <div className="my-4">
            <p>Select payment options</p>
          </div>
          <SelectPayment />
          <PaymentType />
          <Queries />
          <div className="my-4">
            <FooterLink />
          </div>
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
          <DetailsPuller submitted={isSubmitted} setSubmitted={setSubmitted} />
        </div>
      ) : (
        <Payment
        //  transactionStatus={paymentStatus}
        />
      )}
    </div>
  );
};

export default FirstTheme;
