import z from "zod";

export const CheckEmployee = z.object({
  name: z.string({ message: "Name must be valid text." }),
  email: z.string().email({ message: "Email format is wrong." }),
  phoneno: z
    .string()
    .min(10, { message: "Phone number must be exactly 10 characters." })
    .max(10, { message: "Phone number must be exactly 10 characters." }),
  designation: z.string({ message: "Designation must be valid text." }),
  gender: z.string({ message: "Gender must be valid text." }),
  course: z.string({ message: "Course must be valid text." }),
});

export const UpdateEmployee = z.object({
  name: z.string({ message: "Name must be valid text." }).optional(),
  email: z.string().email({ message: "Email format is wrong." }).optional(),
  phoneno: z
    .string()
    .min(10, { message: "Phone number must be exactly 10 characters." })
    .max(10, { message: "Phone number must be exactly 10 characters." })
    .optional(),
  designation: z.string({ message: "Designation must be valid text." }).optional(),
  gender: z.string({ message: "Gender must be valid text." }).optional(),
  course: z.string({ message: "Course must be valid text." }).optional(),
});
