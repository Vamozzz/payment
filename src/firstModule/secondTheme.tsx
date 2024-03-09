"use client";
import Image from "next/image";
import SecondBrandSpace from "./secondBrandSpace";
import SecondPuller from "./secondPuller";
import SelectPayment from "./selectPayment";
import Queries from "./contact";
import SecondPaymentType from "./secondPaymentType";
import FooterLink from "./footerLink";
import { useState } from "react";
import WaitPage from "./waitPage";
import SecondPaymentStatus from "./secondPaymentStatus";

const SecondTheme = () => {
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div className="relative bg-[#F1F1F1] w-full border-2">
      <SecondBrandSpace />
      {!isSubmitted ? (
        <div className="p-4 pb-[180px] flex flex-col gap-3">
          <p className="font-semibold text-[22px]">Select Payment Options</p>
          <SecondPaymentType />
          <SelectPayment />
          <Queries />
          <FooterLink />
          <div className="flex flex-col gap-5  items-center pb-1">
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
        <SecondPaymentStatus />
      )}
      {!isSubmitted && (
        <SecondPuller submitted={isSubmitted} setSubmitted={setSubmitted} />
      )}
    </div>
  );
};
export default SecondTheme;
