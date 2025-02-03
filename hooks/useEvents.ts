import { useQuery } from "@tanstack/react-query";
import { EventWithUserAndCategory } from "@/lib/type";

export const useEvents = () => {
    const { data } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const response = await fetch("/api/events");
            const data = await response.json();
            return data as EventWithUserAndCategory[];
        },
        refetchOnWindowFocus: false,
    });
    return {events: data};
}