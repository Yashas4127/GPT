import {z} from "zod";

export const signupSchema=z.object({
    name:
        z.string()
        .trim()
        .min(3,"Minimum length of name should be 3")
        .max(30,"Maximum length of name should be 30"),
    age:
        z.number()
        .min(10,"Minimum age should be 10")
        .max(100,"Maximum age should be 100"),
    email: z.preprocess(
    (value) =>
        typeof value === "string"
            ? value.trim().toLowerCase()
            : "",
    z.email("Email must be valid")
),
    password:
        z.string()
        .min(3)
        .max(30)
        .regex(/[A-Z]/,"Your password should have atleast 1 captial letter")
        .regex(/[a-z]/,"Your password should have atleast 1 small letter")
        .regex(/["!@#$%^&*"]/,"Your password should have atleast 1 special letter")
        
})


export const loginSchema = z.object({
    email: z.preprocess(
        (value) =>
            typeof value === "string"
                ? value.trim().toLowerCase()
                : "",
        z.email("Email must be valid")
    ),

    password: z.string()
        .min(8, "Minimum password length should be 8")
        .max(30)
        .regex(/[A-Z]/, "Your password should have at least 1 capital letter")
        .regex(/[a-z]/, "Your password should have at least 1 small letter")
        .regex(/[!@#$%^&*]/, "Your password should have at least 1 special letter")
});