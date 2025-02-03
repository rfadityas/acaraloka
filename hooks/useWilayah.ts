import { Kabupaten, Provinsi } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";

export const useProvinsi = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["provinsi"],
        queryFn: async () => {
            const response = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
            const data = await response.json();
            return data as Provinsi[];
        },
        refetchOnWindowFocus: false,
    });
    return {provinsi: data, isLoading, isError};
}

export const useKabupaten = (provinsi: string) => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["kabupaten", provinsi],
        queryFn: async () => {
            const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsi}.json`);
            const data = await response.json();
            return data as Kabupaten[];
        },
        enabled: !!provinsi,
        refetchOnWindowFocus: false,
    });
    return {kabupaten: data, isLoading, isError};
}