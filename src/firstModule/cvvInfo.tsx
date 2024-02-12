import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Backdrop, Popover } from "@mui/material";

interface CvvInfoProps {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

export default function CvvInfo({
  anchorEl,
  setAnchorEl,
  handleClick,
  handleClose,
}: CvvInfoProps) {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <p>What is CVV Number?</p>
              <p>It’s a 3-digit code on the back of your card</p>
            </div>
            <button onClick={handleClose}>
              <Image src={"/xcircle.svg"} alt="." height={40} width={40} />
            </button>
          </div>
          <div className="px-10 p-2">
            <Image
              src={"/cardCVV.svg"}
              alt="."
              height={100}
              width={100}
              layout="responsive"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Have an American Express Card?</p>
            <p>
              It’s a 4-digit number on the front, just above your card number
            </p>
          </div>
          <div className="px-10 p-2">
            <Image
              src={"/expressCVV.svg"}
              alt="."
              height={100}
              width={100}
              layout="responsive"
            />
          </div>
        </div>
      </Popover>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      />
    </div>
  );
}
