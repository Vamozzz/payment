import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function FooterLink() {
  return (
    <div className="">
      <Card sx={{ minWidth: 275, borderRadius: 4 }}>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Image src={"/vampay.svg"} alt="." height={50} width={120} />
            <div className="flex gap-2">
              <Image src={"/UPIlogo.svg"} alt="." height={30} width={40} />
              <Image src={"/VISA.svg"} alt="." height={30} width={40} />
              <Image src={"/MASTERCARD.svg"} alt="." height={30} width={40} />
              <Image src={"/RUPAY.svg"} alt="." height={30} width={40} />
            </div>
            <p className="text-[12px] ">
              want to create payment links for your business? visit
              <span className="uppercase text-[#8875FF]">
                {" "}
                vampay.com/payment-links{" "}
              </span>{" "}
              and get started instantly. please report thi payment link if you
              find it to be suspicious report payment link
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
