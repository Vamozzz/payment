"use client";
import { log } from "console";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BasicListLanguage from "./languageOption";
import { useFirstModule } from "@/provider/invoiceProvider";
import { inVoiceData } from "@/types/types";
import { Skeleton } from "@mui/material";

const BrandSpace = () => {
  const [language, setLanguage] = useState(false);
  const { invoiceData } = useFirstModule();

  const selectLanguage = () => {
    setLanguage(!language);
  };

  console.log(invoiceData, "invoiceData on brandspace=>");

  return (
    <div>
      <div className="flex justify-center items-center py-6 ">
        <div className="flex w-2/3  gap-2 justify-center items-center p-2 ">
          {invoiceData?.merchant_logo ? (
            <Image
              src={invoiceData?.merchant_logo || "/vampayIcon.svg"}
              alt="merchant logo"
              height={30}
              width={30}
              className=""
            />
          ) : (
            <Skeleton variant="rounded" width={40} height={40} />
          )}
          {invoiceData?.merchant_name_logo ? (
            <Image
              src={invoiceData?.merchant_name_logo || "/vampay.svg"}
              alt="."
              height={50}
              width={120}
            />
          ) : (
            <Skeleton variant="rounded" width={210} height={40} />
          )}
        </div>
        {/* <div className="w-1/3 flex justify-end items-center pr-4">
          <button onClick={selectLanguage}>
            <Image
              src={"/languagedropdown.svg"}
              alt="merchant name"
              height={40}
              width={40}
              className=""
            />
          </button>
        </div> */}
      </div>
      {/* {language ? (
        <BasicListLanguage
          language={language}
          setLanguage={setLanguage}
          selectLanguage={selectLanguage}
        />
      ) : null} */}
    </div>
  );
};

export default BrandSpace;
