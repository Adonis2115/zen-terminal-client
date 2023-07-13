import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "@/components/ui/use-toast";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

const FormSchema = z.object({
  index: z.string({
    required_error: "Please select an index.",
  }),
  trigger: z.coerce.number({
    required_error: "Please enter a trigger level.",
  }),
  action: z.string({
    required_error: "Please select candle stick action.",
  }),
  strike: z.coerce.number({
    required_error: "Please enter a strike price.",
  }),
  expiry: z.coerce.date({
    required_error: "Please select expiry date.",
  }),
});
enum Index {
  BANKNIFTY = "BANKNIFTY",
  NIFTY = "NIFTY",
  FINNIFTY = "FINNIFTY",
}
export default function Orders() {
  const [expiries] = useState(["2023-06-20", "2023-06-24", "2023-06-30"]);
  const [lots, setLots] = useState(1);
  const [indexs] = useState<Index[]>([
    Index.BANKNIFTY,
    Index.NIFTY,
    Index.FINNIFTY,
  ]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trigger: 0,
      strike: 0,
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="index"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Index</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Index" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {indexs.map((index, i) => (
                    <SelectItem key={i} value={index}>
                      {index}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trigger"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trigger</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Trigger Level" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Action" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="crossup">Cross Up</SelectItem>
                  <SelectItem value="crossdown">Cross Down</SelectItem>
                  <SelectItem value="touch">Touch</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Toggle aria-label="Toggle italic">
          <p>CE</p>
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <p>PE</p>
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <p>Buy</p>
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <p>Sell</p>
        </Toggle>
        <FormField
          control={form.control}
          name="strike"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strike Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Strike Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value as unknown as string}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Expiry Date" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {expiries.map((expiry, index) => (
                    <SelectItem key={index} value={expiry}>
                      {expiry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setLots((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="mr-2 ml-2">{lots}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setLots((prev) => prev + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
