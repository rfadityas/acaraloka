import { House, SquarePlus } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="font-[family-name:var(--font-geist-mono)] w-[500px] bg-primary rounded-full flex text-primary-foreground overflow-hidden p-2 gap-1 justify-between">
      <div className="flex  items-center  gap-2  bg-primary-foreground px-4 py-3 rounded-l-full text-white flex-1">
        <House className="w-4 h-4" />
        <h1 className="font-semibold">Beranda</h1>
      </div>
      <div className="flex items-center justify-center  gap-2 p-2 text-muted hover:text-white hover:bg-primary-foreground rounded-r-full flex-1">
        <SquarePlus className="w-4 h-4" />
        <h1 className="font-semibold">Promosikan Event</h1>
      </div>
    </div>
  );
}
