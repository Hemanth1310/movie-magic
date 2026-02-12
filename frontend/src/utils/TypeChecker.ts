import { z } from 'zod';

// Defining Email rules 
const EmailRules = z.string().email("Invalid email format").trim().toLowerCase()

// Define password rules ONCE so they are identical everywhere
const passwordRules = z.string()
    .min(8, "Please enter at least 8 characters")
    .regex(/[!@#$%^&*]/, "At least one special character needed");

export const loginDetailSchema = z.object({
    email: EmailRules,
    password: passwordRules,
})


export const userCoreSchema = z.object({
    firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
    lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email format").trim().toLowerCase(),
});


// 2. REGISTRATION SCHEMA (Core + Password + Match Check)
export const registerSchema = userCoreSchema.extend({
    password: passwordRules,
    repassword: z.string(),
}).refine(data => data.password === data.repassword, {
    message: "Passwords mismatch",
    path: ["repassword"],
});
