"use client";

import { useEffect, useState } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
export default function QuizPage() {
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };
  const handleQrDecode = (data: IDetectedBarcode[]) => {
    // redirect to quiz page with uuid
    const uuid = data[0].rawValue.split(":").pop();
    window.location.href = `/quiz/${uuid}`; /* Redirect to quiz page with uuid */
  };

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    requestCameraPermission();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {domLoaded && (
          <Scanner
            onScan={(data) => handleQrDecode(data)}
            onError={(error) => console.log(error)}
            constraints={{
              facingMode: "environment",
              aspectRatio: { min: 1, max: 1 },
            }}
          />
        )}
      </main>
    </div>
  );
}
