import { useQuery } from "@tanstack/react-query";
import { EventWithUserAndCategory } from "@/lib/type";
import { useFilterStore } from "@/stores/useFilterStore";
import { pickBy } from "lodash";
import { useDebounce } from "use-debounce";

export const useEvents = () => {
    const { select, provinsi, kabupaten, category } = useFilterStore();

    const [debouncedSelect] = useDebounce(select, 500);
    const [debouncedProvinsi] = useDebounce(provinsi, 500);
    const [debouncedKabupaten] = useDebounce(kabupaten, 500);
    const [debouncedCategory] = useDebounce(category, 500);

    const { data, isLoading } = useQuery({
        queryKey: ["events", debouncedSelect, debouncedProvinsi, debouncedKabupaten, debouncedCategory],
        queryFn: async () => {
            const rawQuery = pickBy({ select, provinsi, kabupaten, category });

            const query = Object.fromEntries(
                Object.entries(rawQuery).map(([key, value]) => [key, String(value)])
            );

            const url = Object.keys(query).length > 0 
                ? `/api/events?${new URLSearchParams(query)}`
                : `/api/events`;

            const response = await fetch(url);
            const {data} = await response.json();
            return data as EventWithUserAndCategory[];
        },
        refetchOnWindowFocus: false,
    });

    return { events: data, isLoading };
};