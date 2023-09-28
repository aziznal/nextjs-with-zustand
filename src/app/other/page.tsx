"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCounterStore } from "@/lib/stores/counter";
import {
  ExampleForm,
  formSchema,
  useExampleFormStore,
} from "@/lib/stores/example-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Home() {
  const { toast } = useToast();
  const { count, increment, decrement } = useCounterStore();

  const formStore = useExampleFormStore();

  const form = useForm<ExampleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: formStore.email,
      password: formStore.password,
    },
  });

  const onFormSubmit = form.handleSubmit((values) => {
    if (values.email) formStore.setEmail(values.email);
    if (values.password) formStore.setPassword(values.password);

    toast({
      title: "Form Saved",
      description: <span className="text-xl">Try refreshing your screen!</span>,
      className: "bg-green-600 text-white",
    });
  });

  if (!window) {
    return <>Loading</>;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-12">

      <Link href="/">Main</Link>

      <span className="text-gray-400 italic">
        {`The Counter's value is persisted even if you refresh your tab!`}
      </span>

      {/* Counter Example */}
      <div className="flex items-center justify-between gap-12 w-[450px] mb-24">
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

      <span className="text-gray-400 italic">
        The values of the form below will be only be persisted if the fields are
        valid
      </span>

      {/* Form Example */}
      <div className="flex flex-col gap-8">
        <Form {...form}>
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-5 w-[400px]"
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

                  <FormMessage />
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

                  <FormMessage />
                </FormItem>
              )}
            />

            <HoverCard openDelay={0} closeDelay={200}>
              <HoverCardTrigger className="w-fit self-end">
                <Button type="submit">Save</Button>
              </HoverCardTrigger>

              <HoverCardContent>
                <HoverCard openDelay={0} closeDelay={200}>
                  <HoverCardTrigger>Zustand is aweosme</HoverCardTrigger>

                  <HoverCardContent>Also Shadcn</HoverCardContent>
                </HoverCard>
              </HoverCardContent>
            </HoverCard>
          </form>
        </Form>
      </div>
    </div>
  );
}
