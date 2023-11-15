"use client";
import { BanknotesIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { Radio, Typography } from "@mui/material";
import { useState } from "react";

function PaymentMethod() {
  const [selectMethodPayment, setSelectMethodPayment] = useState("cash");

  const handleChangeMethodPayMent = (event) => {
    setSelectMethodPayment(event.target.value);
  };
  const payMethod = [
    {
      title: "Thanh toán khi nhận hàng",
      value: "cash",
      icon: <BanknotesIcon className="h-full" />,
    },
    {
      title: "Thanh toán qua ví điện tử",
      value: "banking",
      icon: <CreditCardIcon className="h-full" />,
    },
  ];
  return (
    <>
      <div>
        <h2 className="p-8 text-[2.5rem] font-bold">Phương thức thanh toán</h2>
        <div className="px-8 ">
          <div
            className="flex flex-col overflow-hidden "
            style={{
              width: "100%",
              border: ".1rem solid rgba(0, 0, 0, .125)",
              borderRadius: "1rem",
            }}
          >
            {payMethod.map((item) => (
              <div
                className="flex items-center justify-between px-8 py-4 transition-all duration-150 ease-in hover:bg-[#eeeeee]"
                style={{
                  borderTop: ".1rem solid rgba(0, 0, 0, .125)",
                }}
                key={item.value}
              >
                <div className="flex items-center gap-4">
                  <div className="h-[5rem] w-[5rem]">{item.icon}</div>
                  <Typography variant="h6">{item.title}</Typography>
                </div>
                <Radio
                  checked={selectMethodPayment === item.value}
                  onChange={handleChangeMethodPayMent}
                  value={item.value}
                  name="radio-buttons"
                  inputProps={{ "aria-label": item.value }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentMethod;
