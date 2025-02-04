import { create } from 'zustand'

type FilterStore = {
    select: string,
    setSelect: (select: string) => void,
    category: string,
    setCategory: (category: string) => void,
    provinsi: string,
    setProvinsi: (provinsi: string) => void,
    kabupaten: string,
    setKabupaten: (kabupaten: string) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
    select: 'new',
    setSelect: (select: string) => set({ select }),
    category: '',
    setCategory: (category: string) => set({ category }),
    provinsi: "",
    setProvinsi: (provinsi: string) => set({ provinsi }),
    kabupaten: "",
    setKabupaten: (kabupaten: string) => set({ kabupaten }),
}))