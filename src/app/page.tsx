import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Bilişim Kulübü Bilgi Yarışması
        </h1>
        <p className="text-xl">Katılmak için standımıza bekliyoruz.</p>
        <div className="flex flex-row gap-4">
          <a
            href="https://linktr.ee/kayubilisim "
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full sm:w-auto">Sosyal Medya</Button>
          </a>
        </div>
      </main>
    </div>
  );
}
