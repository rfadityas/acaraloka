import { create } from 'zustand'

type FilterStore = {
    select: string,
    setSelect: (select: string) => void,
    category: number,
    setCategory: (category: number) => void,
    provinsi: string,
    setProvinsi: (provinsi: string) => void,
    kabupaten: string,
    setKabupaten: (kabupaten: string) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
    select: 'new',
    setSelect: (select: string) => set({ select }),
    category: 1,
    setCategory: (category: number) => set({ category }),
    provinsi: "",
    setProvinsi: (provinsi: string) => set({ provinsi }),
    kabupaten: "",
    setKabupaten: (kabupaten: string) => set({ kabupaten }),
}))