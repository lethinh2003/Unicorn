"use client";
import { convertDateTime } from "@/utils/convertDate";
import { TicketIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";

export default function VoucherItem({ voucher }) {
  const [value, copy] = useCopyToClipboard();

  return (
    <>
      <div className="voucher-item  divide-gray-200 rounded-lg drop-shadow-xl">
        <div className="voucher_image relative items-center justify-center rounded-l-lg border-r-[3px] border-dotted drop-shadow-xl before:absolute before:left-[-1rem] before:h-8 before:w-8 before:rounded-[50%] before:bg-[#eeeeee] before:content-[''] ">
          <TicketIcon className="mx-auto h-[5rem] w-[5rem]" />
        </div>

        <div className="voucher-infomation gap-4">
          <div className="voucher-line flex-wrap gap-4">
            <div className="voucher-percent">Giảm {voucher.discount}%</div>
            <div className="voucher-id rounded-l border-2 border-dashed px-4 py-2 text-white">
              {voucher.code}
            </div>
          </div>
          <div className="voucher-detail">{voucher.description}</div>
          <div className="voucher-line flex-wrap gap-4">
            <div className="voucher-expired">
              Hết hạn sau: {convertDateTime(voucher.expired_date)}
            </div>
            <Button
              onClick={() =>
                toast.promise(copy(voucher.code), {
                  loading: "Đang copy...",
                  success: "Copy thành công " + voucher.code,
                  error: <b>Không thể copy!</b>,
                })
              }
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
