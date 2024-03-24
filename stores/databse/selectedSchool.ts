import { create } from 'zustand';
import type { School } from '@/types/modelType/school';

interface SelectedSchoolState {
    selectedSchool: School | null;
    setSelectedSchool: (school: School | null) => void;
}

const useSelectedSchool = create<SelectedSchoolState>()(set => ({
    selectedSchool: null,
    setSelectedSchool: school => set({ selectedSchool: school })
}));

export default useSelectedSchool;