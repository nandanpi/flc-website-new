import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { sendPasswordResetZ } from "~/zod/authZ";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SendResetForm = ({ className }: { className?: string }) => {
  const sendPasswordResetEmail = api.auth.sendPasswordResetEmail.useMutation();

  const formSchema = sendPasswordResetZ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Sending verification email...");
    sendPasswordResetEmail.mutate(
      {
        email: values.email,
      },
      {
        onSuccess: () => {
          toast.dismiss(toastId);
          toast.success("Verification email sent! Please check your email");
        },
        onError: ({ message }) => {
          toast.dismiss(toastId);
          toast.error(message);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-8")}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button className="bg-yellow-300 hover:bg-yellow-300" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SendResetForm;
