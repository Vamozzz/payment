import Image from "next/image";
import { useState } from "react";
import { useFirstTheme, usePaymentLink } from "./page";
import { Collapse, Radio } from "@mui/material";
import CvvInfo from "./cvvInfo";

export default function ThirdPaymentType() {
  const [isExpanded, setIsExpanded] = useState(" ");
  const { invoiceLink } = useFirstTheme();
  const { linkData, updatePaymentLink } = usePaymentLink();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const paymentType = [
    {
      id: 1,
      name: "UPI",
      link: "",
      image: "upiAnimated3.svg",
    },
    {
      id: 2,
      name: "Credit/Debit",
      link: "",
      image: "creditDebit3.svg",
    },
    {
      id: 3,
      name: "Pay Later",
      link: "",
      image: "payLater3.svg",
    },
    {
      id: 4,
      name: "Net Banking",
      link: "",
      image: "netBanking3.svg",
    },
  ];

  const payLaterArray = [
    {
      name: "ICICI Pay later",
      icon: "/paylater.svg",
      value: "",
    },
    {
      name: "LazyPay",
      icon: "/LazyPay.svg",
      value: "",
    },
    {
      name: "Simpl",
      icon: "/getsimplIcon.svg",
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
    <div className="flex flex-col gap-4">
      {paymentType.map((item, index) => (
        <div key={index} className="bg-white rounded-2xl relative border-2">
          <div
            className={`relative overflow-hidden  flex justify-center items-center  w-full h-32  transition-all duration-500 ease-in-out cursor-pointer`}
            onClick={() => {
              setIsExpanded((val) => (item.name === val ? " " : item.name));
              updatePaymentLink({
                link: "",
                app: "",
              });
            }}
          >
            <div
              className={`absolute top-4 right-4 ${
                item.name === isExpanded ? "-rotate-180" : ""
              } transition-all duration-500 ease-in-out`}
            >
              <Image
                src={"/crossArrow.svg"}
                alt={"logo"}
                height={20}
                width={20}
              />
            </div>
            <div
              className={`absolute  ${
                item.name === isExpanded ? "-translate-y-4" : ""
              }   transition-all duration-500 ease-in-out`}
            >
              <Image
                src={item?.image}
                alt={"logo"}
                height={20}
                width={20}
                layout="responsive"
              />
            </div>
          </div>

          <Collapse
            in={isExpanded === "UPI" && isExpanded === item.name}
            // timeout={{ appear: 500, enter: 500, exit: 500 }}
            timeout="auto"
            unmountOnExit
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <div
              className="flex gap-3 justify-between flex-wrap p-4 bg-white rounded-3xl"
              // style={{ transition: "height 0.5s ease-in-out" }}
            >
              {paymentMethods.map((item, index) => (
                <button
                  onClick={() => {
                    redirectToPaymentApp(item.appName);
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
          <Collapse
            in={isExpanded === "Credit/Debit" && isExpanded === item.name}
            timeout="auto"
            unmountOnExit
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <div className="flex gap-3 flex-wrap p-4 bg-white rounded-3xl">
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
                      className="m-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          </Collapse>
          <Collapse
            in={isExpanded === "Pay Later" && isExpanded === item.name}
            timeout="auto"
            unmountOnExit
          >
            <div className="bg-white flex flex-col p-2 rounded-3xl">
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
          <Collapse
            in={isExpanded === "Net Banking" && isExpanded === item.name}
            timeout="auto"
            unmountOnExit
          >
            <div className="bg-white flex flex-col p-2 rounded-3xl">
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
        </div>
      ))}
      <CvvInfo
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
      />
    </div>
  );
}
