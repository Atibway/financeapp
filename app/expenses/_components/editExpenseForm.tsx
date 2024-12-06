'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Expense } from '@prisma/client';
import { LoaderIcon } from 'lucide-react';
import { updateExpense } from '@/actions/expenseActions';

const formSchemaUpdate = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters." }),
  isRecurring: z.string(),
  recurringFrequency: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof formSchemaUpdate>;

export default function EditExpenseForm({
  setOpen,
  open,
  initialData
}: {
  setOpen: () => void;
  open: boolean;
  initialData: Expense | undefined;
}) {
  const [isRecurring, setIsRecurring] = useState('no');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(formSchemaUpdate),
    defaultValues: {
      amount: "",
      category: "",
      description: "",
      isRecurring: "no",
      recurringFrequency: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        amount: initialData.amount.toString(),
        category: initialData.category,
        description: initialData.description || "",
        isRecurring: initialData.isRecurring ? "yes" : "no",
        recurringFrequency: initialData.recurringFrequency || "",
      });
      setIsRecurring(initialData.isRecurring ? "yes" : "no");
    }
  }, [initialData, form]);

  const onSubmit = async (data: ExpenseFormValues) => {
    setLoading(true);
    try {
      const expenseData = {
        ...data,
        isRecurring: isRecurring === 'yes'
      };

      if (initialData) {
        await updateExpense(initialData.id, expenseData).then((res) => {
          if (res.error) {
            toast.error(`${res.error}`);
            setLoading(false);
          } else if (res.success) {
            toast.success(`Expense updated successfully!`);
            form.reset();
            setIsRecurring('no');
            setLoading(false);
            setOpen();
            window.location.reload()
          }
        });
      } else {
        toast.error('No expense data to update');
        setLoading(false);
      }
    } catch (error) {
      toast.error(`Something went wrong`);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Amount spent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tuition">Tuition</SelectItem>
                            <SelectItem value="rent">Rent</SelectItem>
                            <SelectItem value="groceries">Groceries</SelectItem>
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="entertainment">Entertainment</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          placeholder="Describe the expense"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isRecurring"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recurring Expense</FormLabel>
                      <FormControl>
                        <Select
                          value={isRecurring}
                          onValueChange={setIsRecurring}
                          disabled={loading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Is this a recurring expense?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isRecurring === 'yes' && (
                  <FormField
                    control={form.control}
                    name="recurringFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recurring Frequency</FormLabel>
                        <FormControl>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <div className="flex justify-between py-2">
                <Button type="button" variant="destructive" onClick={() => {
                  setOpen();
                  form.reset();
                }}>Cancel</Button>
                <Button
                  disabled={loading}
                  type="submit"
                >
                  {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
