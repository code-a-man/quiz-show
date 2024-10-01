"use client";

import jwt from "jsonwebtoken";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";

import logo from "@/assets/BilisimLogo2.webp";

const PanelPage = ({ params }: { params: { token: string } }) => {
  const decoded = jwt.decode(params.token);
  const [uuid, setUuid] = useState<string | null>(null);
  if (!decoded || typeof decoded === "string") {
    return <div>Invalid token</div>;
  }

  const generateUUID = async () => {
    try {
      const response = await fetch(
        "https://localhost:3000/api/bilisimekipyonetim/create-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      const { sessionUUID } = await response.json();
      setUuid(sessionUUID);
      console.log("UUID generated:", sessionUUID);
    } catch (error) {
      console.error("Error generating UUID:", error);
    }
  };

  return (
    <div>
      {uuid ? (
        <QRCodeCanvas value={uuid} size={300} />
      ) : (
        <Image src={logo} alt="Blank" width={300} height={300} />
      )}
      <button onClick={generateUUID}>Generate UUID</button>
    </div>
  );
};

export default PanelPage;
