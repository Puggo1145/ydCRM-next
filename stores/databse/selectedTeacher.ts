import { create } from 'zustand';
import type { Teacher } from '@/types/modelType/teacher';

interface SelectedTeacherState {
    selectedTeacher: Teacher | null;
    setSelectedTeacher: (Teacher: Teacher | null) => void;
}

const useSelectedTeacher = create<SelectedTeacherState>()(set => ({
    selectedTeacher: null,
    setSelectedTeacher: Teacher => set({ selectedTeacher: Teacher })
}));

export default useSelectedTeacher;