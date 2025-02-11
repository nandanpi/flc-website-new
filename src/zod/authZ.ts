import { z } from "zod";

const signUpZ = z
  .object({
    name: z.string().min(3, {
      message: "Name is required",
    }),
    email: z
      .string()
      .email({
        message: "Email is required",
      })
      .refine((email) => email.endsWith("@nmamit.in"), {
        message: "Email must be from NMAMIT",
      }),
    phone: z.string().regex(/^\d{10}$/, { message: "Invalid phone number" }),
    year: z.string(),
    branchId: z.string().min(1, {
      message: "Please select a branch",
    }),
    password: z.string().min(8, {
      message: "Password should consist of minimum 8 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const loginZ = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .refine(
      (email) => {
        if (email.endsWith("@nmamit.in")) {
          return true;
        }
        return false;
      },
      {
        message: "Email must be from NMAMIT",
      },
    ),
  password: z.string().min(1, { message: "Password is required" }),
});

const registerZ = z.object({
  reasonToJoin: z.string().min(10, {
    message: "Answer should be atleast 10 characters",
  }),
  expectations: z.string().min(10, {
    message: "Answer should be atleast 10 characters",
  }),
  contribution: z.string().min(10, {
    message: "Answer should be atleast 10 characters",
  }),
});

const sendVerifyEmailZ = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .refine((email) => email.endsWith("@nmamit.in"), {
      message: "Email must be from NMAMIT",
    }),
});

const sendPasswordResetZ = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .refine((email) => email.endsWith("@nmamit.in"), {
      message: "Email must be from NMAMIT",
    }),
});

const resetPasswordZ = z
  .object({
    token: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const verifyEmailZ = z.object({
  token: z.string(),
});

const refreshTokenZ = z.object({
  refreshToken: z.string(),
});

export {
  signUpZ,
  loginZ,
  registerZ,
  sendVerifyEmailZ,
  sendPasswordResetZ,
  resetPasswordZ,
  verifyEmailZ,
  refreshTokenZ,
};
