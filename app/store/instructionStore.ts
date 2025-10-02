

import { create } from 'zustand';
import { Instruction } from '@/app/interfaces/interfaces';

interface InstructionState {
    instructions: Instruction[];
    selectedInstruction: Instruction | null;
    setInstructions: (data: Instruction[]) => void;
    addInstruction: (instruction: Instruction) => void;
    removeInstruction: (id: string) => void;
    updateInstruction: (updated: Instruction) => void;
    setSelectedInstruction: (instruction: Instruction | null) => void;
}

export const useInstructionStore = create<InstructionState>((set) => ({
    instructions: [],
    selectedInstruction: null,

    setInstructions: (data) => set({ instructions: data }),

    addInstruction: (instruction) =>
        set((state) => ({
            instructions: [...state.instructions, instruction],
        })),

    removeInstruction: (id) =>
        set((state) => ({
            instructions: state.instructions.filter((inst) => inst._id !== id),
        })),

    updateInstruction: (updated) =>
        set((state) => ({
            instructions: state.instructions.map((inst) =>
                inst._id === updated._id ? updated : inst
            ),
        })),

    setSelectedInstruction: (instruction) =>
        set({ selectedInstruction: instruction }),
}));
