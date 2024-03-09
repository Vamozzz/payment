"use client";
import Image from "next/image";
import { useState } from "react";
import CvvInfo from "./cvvInfo";
import { Radio } from "@mui/material";
import { useFirstTheme, usePaymentLink } from "./page";

const SecondPaymentType = () => {
  const [upi, setUpi] = useState(true);
  const [openCard, setOpenCard] = useState(false);
  const [payLater, setPayLater] = useState(false);
  const [isNetBanking, setNetBanking] = useState(false);
  const [selectedType, setSelectedType] = useState("UPI");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { invoiceLink } = useFirstTheme();
  const { linkData, updatePaymentLink } = usePaymentLink();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const paymentType = [
    {
      id: 1,
      name: "UPI",
      link: "",
      image: "UPITheme2.svg",
    },
    {
      id: 2,
      name: "Credit/Debit",
      link: "",
      image: "creditcardTheme2.svg",
    },
    {
      id: 3,
      name: "Pay Later",
      link: "",
      image: "WalletTheme2.svg",
    },
    {
      id: 4,
      name: "Net Banking",
      link: "",
      image: "NetbankingTheme2.svg",
    },
  ];

  const UpiType = [
    {
      id: 1,
      name: "UPI",
      link: "",
      image: "phonepayTheme2.svg",
      appName: "phonepe",
    },
    {
      id: 2,
      name: "Credit/Debit",
      link: "",
      image: "paytmTheme2.svg",
      appName: "paytm",
    },
    {
      id: 3,
      name: "Pay Later",
      link: "",
      image: "bhimTheme2.svg",
      appName: "bhim",
    },
    {
      id: 4,
      name: "Net Banking",
      link: "",
      image: "gpayTheme2.svg",
      appName: "gpay",
    },
  ];

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

  return (
    <div>
      <div>
        <div className=" my-2 flex flex-wrap gap-2 ">
          {paymentType.map((item, index) => (
            <button
              key={item?.id}
              onClick={() => {
                updatePaymentLink({
                  link: "",
                  app: "",
                });
                setSelectedType(item.name);
              }}
              className={`h-[10vh]  ${
                selectedType === item.name
                  ? "bg-[#E5E5E5] border-white "
                  : "bg-[#FFFFFF] border-[#E5E5E5] "
              }  text-[12px] flex flex-[45%] flex-col justify-center items-center border-2 rounded-2xl`}
            >
              <Image
                src={item.image}
                alt={"type"}
                width={50}
                height={50}
                className="object-none"
              />
              <p>{item.name}</p>
            </button>
          ))}
        </div>
      </div>
      {selectedType == "UPI" && (
        <div className="flex gap-2 justify-between items-center">
          {UpiType.map((item, index) => (
            <button
              key={item?.id}
              onClick={() => redirectToPaymentApp(item.appName)}
              className={`h-[6vh] w-1/4 p-2 flex  justify-center items-center border-2  ${
                linkData?.app === item.appName
                  ? "bg-[#FFFFFF}] border-white "
                  : "bg-white border-[#E5E5E5]"
              } rounded-xl`}
            >
              <Image
                src={item.image}
                alt={"type"}
                width={80}
                height={50}
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
      {selectedType == "Credit/Debit" && (
        <div className="flex gap-3 flex-wrap p-6 bg-white rounded-xl">
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
                  className="ml-1"
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedType == "Pay Later" && (
        <div className="bg-white rounded-2xl flex flex-col px-2">
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
      )}
      {selectedType == "Net Banking" && (
        <div className="bg-white flex flex-col rounded-2xl px-2">
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
      )}
      <CvvInfo
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
      />
    </div>
  );
};

export default SecondPaymentType;
