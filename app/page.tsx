"use client";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { useEvents } from "@/hooks";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Test from "@/public/test.jpg";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import BottomNav from "@/components/bottom-nav";
import FilterEvent from "@/components/filter-event";

export default function Home() {
  const { events } = useEvents();

  return (
    <>
      <div className="relative h-[35vh] flex size-full items-center justify-center overflow-hidden border rounded-b-[40px] rounded-lg bg-background p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-balance text-6xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl ">
            Acara
            <LineShadowText className="italic" shadowColor={"white"}>
              Loka
            </LineShadowText>
          </h1>
          <p className="text-lg font-[family-name:var(--font-geist-mono)] text-white/80">
            Cari & promosikan acara seru di sekitarmu...
          </p>
          <BottomNav />
        </div>
        <GridPattern
          width={20}
          height={20}
          strokeDasharray={"4 2"}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] "
          )}
        />
      </div>
      <div className="mt-8 p-8 font-[family-name:var(--font-geist-sans)] space-y-6 flex   gap-4">
        <FilterEvent />
        <div>
          <h1 className="font-bold text-2xl border-b border-b-white w-fit px-4 py-2">
            Baru Ditambahkan
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {new Array(5).fill(0).map((_, i) => (
              <Card key={i} className="transition-all">
                <CardHeader className="gap-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="w-full h-[100px] lg:h-[200px] bg-red-200 rounded-lg overflow-hidden">
                        <Image
                          src={Test}
                          width={250}
                          height={250}
                          alt="Picture of the author"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-0">
                      <div className="relative h-[400px] w-full">
                        <Image
                          src={Test}
                          fill
                          alt="Picture of the author"
                          className="rounded-lg object-cover"
                          sizes="(max-width: 320px) 100vw, 320px"
                        />
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg lg:text-2xl font-bold">
                      Diraya Festival
                    </h3>
                    <p className="text-muted-foreground truncate text-xs lg:text-[14px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sapiente, et ad. Quas, quisquam numquam, cum consectetur
                      praesentium doloremque autem neque dignissimos quaerat
                      rerum in? Possimus natus inventore culpa odit facere
                      numquam laborum nulla, accusantium ducimus accusamus
                      facilis voluptas, explicabo eveniet dicta commodi illum.
                      Fugiat, officiis. Modi ad deserunt natus non?
                    </p>
                    <Badge className="w-fit">Musik Festival</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                      <p className="text-muted-foreground text-xs lg:text-[14px]">
                        Sleman, DIY
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                      <p className="text-muted-foreground text-xs lg:text-[14px]">
                        20 Mei 2023
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-muted-foreground text-xs lg:text-[14px]">
                      Diunggah{" "}
                      {formatDistanceToNow(
                        new Date("2025-01-30 15:43:31.426"),
                        {
                          addSuffix: true,
                          locale: id,
                        }
                      )}
                    </p>
                    <InteractiveHoverButton>
                      Lihat Detail
                    </InteractiveHoverButton>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
