import { Category } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
    const { data } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const response = await fetch("/api/categories");
            const data = await response.json();
            return data as Category[];
        },
        refetchOnWindowFocus: false,
    });
    return { category: data };
};