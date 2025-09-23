// app/dashboard/instructions/[instruction_id]/page.tsx
import React from 'react';
import type { Instruction, InstructionResponseById } from '@/app/interfaces/interfaces';
import { api } from '@/app/services/api';
import InstructionBlogView from '@/app/instruction/InstructionBlogView';


type Props = {
    params: {
        instruction_id: string;
    };
};

export default async function Page({ params }: Props) {
    const { instruction_id } = params;

    let instructionData: Instruction;

    try {
        const response = await api.getInstructionsById(instruction_id) as InstructionResponseById;
        instructionData = response.instruction;

        console.log('Fetched instruction:', instructionData);
    } catch (err) {
        console.error('Error fetching instruction by id:', instruction_id, err);
        throw err;
    }

    return <InstructionBlogView instruction={instructionData} />;
}