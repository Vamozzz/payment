"use client";
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Image from "next/image";
import { Radio } from "@mui/material";
import { useFirstTheme, usePaymentLink } from "./page";
import CvvInfo from "./cvvInfo";

export default function PaymentType() {
  const [open, setOpen] = React.useState(true);
  const [openCard, setOpenCard] = React.useState(false);
  const [payLater, setPayLater] = React.useState(false);
  const [isNetBanking, setNetBanking] = React.useState(false);
  const { invoiceLink } = useFirstTheme();
  const { linkData, updatePaymentLink } = usePaymentLink();
  // const [showCvvInfo, setCvvInfo] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToPaymentApp = (selectedGateway: string) => {
    let paymentLink;
    switch (selectedGateway) {
      case "gpay":
        // window.location.href = `googlepay://upi/transaction?pa=${encodeURIComponent(
        //   paymentLink
        // )}`;
        paymentLink = invoiceLink?.link?.replace("upi://", "tez://upi/");
        updatePaymentLink({
          link: paymentLink,
          app: "gpay",
        });
        break;
      case "phonepe":
        // window.location.href = `phonepe://upi/transaction?pa=${encodeURIComponent(
        //   invoiceLink?.link
        // )}`;
        paymentLink = invoiceLink?.link?.replace("upi://", "phonepe://");
        updatePaymentLink({
          link: paymentLink,
          app: "phonepe",
        });
        break;
      case "paytm":
        // window.location.href = `paytm://upi/transaction?pa=${encodeURIComponent(
        //   invoiceLink?.link
        // )}`;
        paymentLink = invoiceLink?.link?.replace("upi://", "paytmmp://");
        updatePaymentLink({
          link: paymentLink,
          app: "paytm",
        });
        break;
      case "bhim":
        // window.location.href = `bhim://upi/transaction?pa=${encodeURIComponent(
        //   invoiceLink?.link
        // )}`;
        paymentLink = invoiceLink?.link?.replace("upi://", "upi://pay?");
        updatePaymentLink({
          link: paymentLink,
          app: "bhim",
        });
        break;

      case "addmore":
        // window.location.href = `bhim://upi/transaction?pa=${encodeURIComponent(
        //   invoiceLink?.link
        // )}`;
        paymentLink = invoiceLink?.link;
        updatePaymentLink({
          link: paymentLink,
          app: "addmore",
        });
        break;
      default:
        console.error("Unsupported payment gateway");
    }
  };

  const paymentMethods = [
    {
      icon: "/phonepay.svg",
      name: "Phone Pe",
      link: "",
      appName: "phonepe",
    },
    {
      icon: "/paytm.svg",
      name: "Paytm",
      link: "",
      appName: "paytm",
    },
    {
      icon: "/bhimlogo.svg",
      name: "BHIM",
      link: "",
      appName: "bhim",
    },
    {
      icon: "/gpaylogo.svg",
      name: "Gpay",
      link: "",
      appName: "gpay",
    },
    {
      icon: "/addmore.svg",
      name: "add more",
      link: "",
      appName: "addmore",
    },
  ];

  const payLaterArray = [
    {
      name: "ICICI Pay later",
      icon: "/paylater.svg",
      value: "",
    },
    {
      name: "Lazypay",
      icon: "/paylater.svg",
      value: "",
    },
    {
      name: "Lazypay",
      icon: "/paylater.svg",
      value: "",
    },
  ];

  const netBankingArray = [
    {
      name: "Axis Bank",
      icon: "/axixbank.svg",
      value: "",
    },
    {
      name: "HDFC Bank",
      icon: "/hdfcbank.svg",
      value: "",
    },
    {
      name: "ICICI Bank",
      icon: "/icicibank.svg",
      value: "",
    },
    {
      name: "Kotak Bank",
      icon: "/kotakbank.svg",
      value: "",
    },
    {
      name: "SBI Bank",
      icon: "/sbibank.svg",
      value: "",
    },
  ];

  const handleOpen = () => {
    setOpen(!open);
    updatePaymentLink({
      link: "",
      app: "",
    });
  };
  const handleCard = () => {
    setOpenCard(!openCard);
  };
  const handlePayLater = () => {
    setPayLater(!payLater);
  };

  const handleNetBanking = () => {
    setNetBanking(!isNetBanking);
  };

  return (
    <div className="my-4 shadow-lg rounded-xl">
      <List
        sx={{
          width: "100%",
          minWidth: 275,
          bgcolor: "background.paper",
          borderRadius: 4,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleOpen}>
          <ListItemIcon className="">
            <Image
              src={"/upi.svg"}
              alt="logo"
              height={20}
              width={20}
              className=""
            />
          </ListItemIcon>
          <ListItemText primary="UPI" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <div className="flex gap-3 justify-between flex-wrap p-4 bg-[#F5F5F5]">
            {paymentMethods.map((item, index) => (
              <button
                onClick={() => {
                  redirectToPaymentApp(item.appName);

                  // console.log("gatewayClicked", item.appName);
                }}
                key={index}
                className={`p-1 w-1/5 flex flex-col justify-start items-center gap-2 ${
                  linkData?.app === item.appName
                    ? "border border-purple-500 rounded-sm bg-white"
                    : null
                }`}
              >
                <Image src={item.icon} alt="." height={40} width={40} />
                <p className="text-wrap">{item.name}</p>
              </button>
            ))}
          </div>
        </Collapse>
        <ListItemButton onClick={handleCard}>
          <ListItemIcon className="">
            <Image
              src={"/card.svg"}
              alt="logo"
              height={20}
              width={20}
              className=""
            />
          </ListItemIcon>
          <ListItemText primary="CARD" />
          {openCard ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={openCard}
          timeout="auto"
          unmountOnExit
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <div className="flex gap-3 flex-wrap p-4 bg-[#F5F5F5]">
            <div className=" w-full flex justify-between items-center border rounded-md p-2">
              <input
                placeholder="Card Number"
                className="w-full  bg-transparent outline-none"
              />
              {/* <Image
                src={"/tag.svg"}
                alt="logo"
                height={30}
                width={30}
                className="ml-2"
              /> */}
            </div>
            <input
              placeholder="Name on card"
              className="w-full p-2 rounded-md bg-transparent border outline-none"
            />
            <div className="flex gap-3">
              <input
                placeholder="Valid Thru (MM/YY)"
                className="w-2/3 p-2 rounded-md bg-transparent border outline-none"
              />
              <div className=" w-1/3 flex justify-between items-center border rounded-md p-2">
                <input
                  placeholder="CVV"
                  className="rounded-md bg-transparent  overflow-x-hidden outline-none"
                />
                <button onClick={handleClick}>
                  <Image
                    src={"/information.svg"}
                    alt="logo"
                    height={30}
                    width={30}
                    className="ml-2"
                  />
                </button>
              </div>
            </div>
          </div>
        </Collapse>
        <ListItemButton onClick={handlePayLater}>
          <ListItemIcon className="">
            <Image
              src={"/emptywallet.svg"}
              alt="logo"
              height={20}
              width={20}
              className=""
            />
          </ListItemIcon>
          <ListItemText primary="PAY LATER" />
          {payLater ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={payLater} timeout="auto" unmountOnExit>
          <div className="bg-[#F5F5F5] flex flex-col px-2">
            {payLaterArray.map((item, index) => (
              <div
                key={index}
                className="flex justify-between p-4 items-center border-dashed border-b"
              >
                <div className="flex items-center gap-4">
                  <Image src={item.icon} alt="." height={40} width={40} />
                  <p>{item.name}</p>
                </div>
                <div>
                  {/* <Image src={item.icon} alt="." height={40} width={40} />
                   */}
                  <Radio
                    checked={false}
                    // onChange={handleChange}
                    value="b"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 25,
                        background: "white",
                        borderRadius: 10,
                      },
                      margin: 0,
                      padding: 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Collapse>
        <ListItemButton onClick={handleNetBanking}>
          <ListItemIcon className="">
            <Image
              src={"/bankicon.svg"}
              alt="logo"
              height={20}
              width={20}
              className=""
            />
          </ListItemIcon>
          <ListItemText primary="NET BANKING" />
          {isNetBanking ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isNetBanking} timeout="auto" unmountOnExit>
          <div className="bg-[#F5F5F5] flex flex-col px-2">
            {netBankingArray.map((item, index) => (
              <div
                key={index}
                className="flex justify-between p-4 items-center border-dashed border-b"
              >
                <div className="flex items-center gap-4">
                  <Image src={item.icon} alt="." height={40} width={40} />
                  <p>{item.name}</p>
                </div>
                <div>
                  <Radio
                    checked={false}
                    // onChange={handleChange}
                    value="b"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 25,
                        background: "white",
                        borderRadius: 10,
                      },
                      margin: 0,
                      padding: 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Collapse>
      </List>
      {/* {showCvvInfo && ( */}
      <CvvInfo
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
      />
      {/* )} */}
    </div>
  );
}
