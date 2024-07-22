import React from "react";
import Image from "next/image";
import QRCode from "../public/QR_code.webp";

const PaymentPage = ({ CHARGE }: { CHARGE: number }) => {
  const ACCOUNT_DETAILS = {
    // "Account Number": "9867526910",
    // "Account Holder": "Hemanta Bhandari",
    Amount: `NPR ${CHARGE}`,
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <div className="text-center">
        <Image
          src={QRCode}
          alt="QR Code"
          className="w-[300px] h-[300px] bg-white mb-2"
        />
        <span className="text-[16px] font-[500] mb-2">
          Scan the QR Code to pay through Khalti App
        </span>

        <div className="text-[16px] mt-2 text-left">
          <p className="text-[18px] font-[600]">Account Details:</p>
          {Object.entries(ACCOUNT_DETAILS).map(([key, value]) => (
            <p key={key}>
              <span className="font-bold">{key}:</span> {value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
