"use client";

import jwt from "jsonwebtoken";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";

import logo from "@/assets/BilisimLogo2.webp";
import { Button } from "@/components/ui/button";

const PanelPage = ({ params }: { params: { token: string } }) => {
  const decoded = jwt.decode(params.token);
  const [uuid, setUuid] = useState<string | null>(null);
  if (!decoded || typeof decoded === "string") {
    return <div>Invalid token</div>;
  }

  const generateUUID = async () => {
    try {
      const response = await fetch("/api/bilisimekipyonetim/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.token}`,
        },
      });
      const { sessionUUID } = await response.json();
      // yarisma.kayubilisim.org/quiz/[uuid]
      const url = `https://yarisma.kayubilisim.org/quiz/${sessionUUID}`;
      setUuid(url);
      console.log("UUID generated:", sessionUUID);
    } catch (error) {
      console.error("Error generating UUID:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {uuid ? (
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-xl font-bold">Yarışma Kodunuz:</h1>
          <p className="text-md font-bold">{uuid}</p>
          <QRCodeCanvas value={uuid} size={300} />
        </div>
      ) : (
        <Image src={logo} alt="Blank" width={300} height={300} />
      )}
      <h1 className="text-xl font-bold">Merhaba, {decoded.name}</h1>
      <Button className="w-full" onClick={generateUUID}>
        Yarışma Oluştur
      </Button>
    </div>
  );
};

export default PanelPage;
