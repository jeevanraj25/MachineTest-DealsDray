import z from "zod";



export const CheckEmployee = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneno: z.string().min(10).max(10),
    designation: z.string(),
    gender: z.string(),
    course: z.string(),
});

export const UpdateEmployee = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phoneno: z.string().min(10).max(10).optional(),
    designation: z.string().optional(),
    gender: z.string().optional(),
    course: z.string().optional(),
   
});