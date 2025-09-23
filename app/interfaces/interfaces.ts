export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface Instruction {
    _id?: string;
    user_id?: string;
    title: string;
    description?: string;
    format_type: string;
    is_published?: boolean;
    views_count?: number;

    banner_image?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    theme_settings?: {
        theme?: string;
    };
    steps?: Step[];
}

export interface InstructionResponse {
    success: boolean;
    message: string;
    instructions: Instruction[];
}

export interface Step {
    _id?: string;
    instruction_id?: string;
    step_order: number;
    title: string;
    description?: string;
    image_url?: string;
    video_url?: string;
}

export interface InstructionResponseById {
    success: boolean;
    message: string;
    instruction: Instruction;
}