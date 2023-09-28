"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCounterStore } from "@/lib/stores/counter";
import {
  ExampleForm,
  formSchema,
  useExampleFormStore,
} from "@/lib/stores/example-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Home() {
  const { count, increment, decrement } = useCounterStore();

  const formStore = useExampleFormStore();

  const form = useForm<ExampleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: formStore.email,
      password: formStore.password,
    },
  });

  form.watch((values) => {
    if (values.email) formStore.setEmail(values.email);
    if (values.password) formStore.setPassword(values.password);
  });

  if (!window) {
    return <>Loading</>;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-12">
      {/* Counter Example */}
      <div className="flex items-center justify-between gap-12 w-[450px]">
        <h1 className="text-6xl">Counter: {count}</h1>

        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            onClick={increment}
            className="bg-green-600 text-white"
          >
            +
          </Button>

          <Button
            size="lg"
            onClick={decrement}
            className="bg-slate-600 text-white"
          >
            -
          </Button>
        </div>
      </div>

      {/* Form Example */}
      <div className="flex flex-col gap-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              console.log("Form submitted with below values:");
              console.log(values);
            })}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
