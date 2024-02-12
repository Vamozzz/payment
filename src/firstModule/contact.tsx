"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFirstModule } from "@/provider/invoiceProvider";

export default function Queries() {
  const { invoiceData } = useFirstModule();

  const handleCall = () => {
    window.open(`tel:${invoiceData?.vendor_number}`, "_self");
  };

  const handleEmail = () => {
    window.open(`mailto:${invoiceData?.vendor_email}`, "_self");
  };
  
  return (
    <div className="">
      <Card sx={{ minWidth: 275, borderRadius: 4, marginTop:4 }}>
        <CardContent>
          <div className="">
            <p className="text-[12px]">
              For any queries, Please contact
              <span className="font-bold"> {invoiceData?.vendor_name}</span>
            </p>
            <div className="flex gap-2 flex-wrap ">
              <div className="flex gap-2" onClick={handleCall}>
                <Image
                  src={"/Phone_light.svg"}
                  alt={"."}
                  width={20}
                  height={20}
                />
                <p>{invoiceData?.vendor_number}</p>
              </div>
              <div className="flex gap-2 " onClick={handleEmail}>
                <Image
                  src={"/Message_light.svg"}
                  alt={"."}
                  width={20}
                  height={20}
                />
                <p>{invoiceData?.vendor_email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
