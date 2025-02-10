import { useState } from "react";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProvinsi, useCategories, useKabupaten } from "@/hooks";
import { useFilterStore } from "@/stores/useFilterStore";

export default function FilterEvent() {
  const [provinsiId, setProvinsiId] = useState<string>("");
  const { category } = useCategories();
  const {
    select,
    category: categoryState,
    provinsi: provinsiState,
    kabupaten: kabupatenState,
    setSelect,
    setCategory,
    setProvinsi,
    setKabupaten,
  } = useFilterStore();
  const { provinsi } = useProvinsi();
  const { kabupaten } = useKabupaten(provinsiId);

  const handleSelect = (value: string) => {
    setSelect(value);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
  };

  const handleProvinsi = (value: string) => {
    const getId = provinsi?.find((prov) => prov.name === value)?.id;
    setProvinsi(value);
    setProvinsiId(getId ?? "");
  };

  const handleKabupaten = (value: string) => {
    setKabupaten(value);
  };

  return (
    <div className="flex flex-col justify-items-center p-10 --font-geist-sans gap-2 h-fit">
      <h1 className="text-xl font-bold">Filter</h1>
      <div className="w-[300px] h-full rounded-lg bg-primary-foreground p-6 flex flex-col items-center gap-2">
        <Select value={select} onValueChange={handleSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Urut Berdasarkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="new">Baru ditambahkan</SelectItem>
              <SelectItem value="nearby">Acara terdekat</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={categoryState.toString()} onValueChange={handleCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="0">Semua Kategori</SelectItem>
              {category?.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={provinsiState} onValueChange={handleProvinsi}>
          <SelectTrigger className="w-full text-left">
            <SelectValue placeholder="Pilih Provinsi" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {provinsi?.map((provinsi) => (
                <SelectItem key={provinsi.id} value={provinsi.name}>
                  {provinsi.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={kabupatenState}
          onValueChange={handleKabupaten}
          disabled={!provinsiState}
        >
          <SelectTrigger className="w-full text-left">
            <SelectValue placeholder="Pilih Kabupaten" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {kabupaten?.map((kabupaten) => (
                <SelectItem key={kabupaten.id} value={kabupaten.name}>
                  {kabupaten.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
