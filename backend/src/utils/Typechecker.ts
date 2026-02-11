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