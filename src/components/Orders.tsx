import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
const indexs = [Index.BANKNIFTY, Index.NIFTY, Index.FINNIFTY];
export default function Orders() {
  const [expiries] = useState(["2023-06-20", "2023-06-24", "2023-06-30"]);
  const [lots, setLots] = useState(1);
  const [type, setType] = useState<"CE" | "PE">("CE");
  const [direction, setDirection] = useState<"buy" | "sell">("buy");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trigger: 0,
      strike: 0,
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="index"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <div className="flex gap-8">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={`${type === "CE" ? "default" : "outline"}`}
                size="icon"
                onClick={() => setType((prev) => (prev !== "CE" ? "CE" : prev))}
              >
                CE
              </Button>
              <Button
                type="button"
                variant={`${type === "PE" ? "default" : "outline"}`}
                size="icon"
                onClick={() => setType((prev) => (prev !== "PE" ? "PE" : prev))}
              >
                PE
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={`${direction === "buy" ? "default" : "outline"}`}
                size="icon"
                onClick={() =>
                  setDirection((prev) => (prev !== "buy" ? "buy" : prev))
                }
              >
                Buy
              </Button>
              <Button
                type="button"
                variant={`${direction === "sell" ? "default" : "outline"}`}
                size="icon"
                onClick={() =>
                  setDirection((prev) => (prev !== "sell" ? "sell" : prev))
                }
              >
                Sell
              </Button>
            </div>
          </div>
          <FormField
            control={form.control}
            name="strike"
            render={({ field }) => (
              <FormItem>
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
    </div>
  );
}
