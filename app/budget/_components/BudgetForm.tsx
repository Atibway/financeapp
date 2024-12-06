'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createBudget } from '@/actions/budgetActions';
import toast from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const categorySchema = z.object({
  category: z.string().nonempty("Category is required"),
  limit: z.string().min(1, "Limit is required").regex(/^\d+$/, "Limit must be a number"),
});

const formSchema = z.object({
  period: z.string().min( 1,"Period is required"),
  totalLimit: z.string().min(1, "Total limit is required").regex(/^\d+$/, "Total limit must be a number"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  categories: z.array(categorySchema).nonempty("At least one category is required"),
});

type BudgetFormValues = z.infer<typeof formSchema>;

export default function BudgetForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      period: "",
      totalLimit: "",
      startDate: "",
      endDate: "",
      categories: [{ category: '', limit: '' }],
    },
  });

  const { fields, append, update } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const onSubmit = async (data: BudgetFormValues) => {
    setLoading(true);
    try {
      const result = await createBudget(data); // Assumes createBudget is updated to accept the correct data format
      if (result.success) {
        toast.success("Budget Created Successfully");
        form.reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="period">Budget Period</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="one-time">One Time</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="totalLimit">Total Budget Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter total budget limit"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="startDate">Start Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="endDate">End Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Budget Items</h3>
          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`categories.${index}.category`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`category-${index}`}>Budget Item</FormLabel>
                    <FormControl>
                      <Input
                        id={`category-${index}`}
                        placeholder="Enter category"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`categories.${index}.limit`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`limit-${index}`}>Cost</FormLabel>
                    <FormControl>
                      <Input
                        id={`limit-${index}`}
                        type="number"
                        placeholder="Enter limit"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button type="button" onClick={() => append({ category: '', limit: '' })}>Add Budget Item</Button>
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Budget "}</Button>
      </form>
    </Form>
  );
}
