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
import { Income } from '@prisma/client';
import { LoaderIcon } from 'lucide-react';
import { updateIncome } from '@/actions/incomeActions';

 const formSchemaUpdate = z.object({
  source: z.string().min(2, {
    message: "Source must be at least 2 characters.",
  }),
  recurringFrequency: z.string().optional(),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  isRecurring: z.string(),
  amount: z.string().min(1, {
    message: "Amount is required"
  })
});

export type IncomeFormValues = z.infer<typeof formSchemaUpdate>;

export default function EditIncomeForm({
  setOpen,
  open,
  initialData
}: {
  setOpen: () => void;
  open: boolean;
  initialData: Income | undefined;
}) {
  const [isRecurring, setIsRecurring] = useState('no'); // Change to string
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(formSchemaUpdate),
    defaultValues: {
      source: "",
      description: "",
      amount: "",
      isRecurring: "no",
      recurringFrequency: ""
    }
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        source: initialData.source,
        description: initialData.description || "",
        amount: initialData.amount.toString(),
        isRecurring: initialData.isRecurring ? "yes" : "no", // Use string
        recurringFrequency: initialData.recurringFrequency || ""
      });
      setIsRecurring(initialData.isRecurring ? "yes" : "no"); // Update state
    }
  }, [initialData, form]);

  const onSubmit = async (data: IncomeFormValues) => {
    setLoading(true);
    try {
      const incomeData = {
        ...data,
        isRecurring: isRecurring === 'yes'
      };

      if (initialData) {
        // Update existing income
        await updateIncome(initialData.id, incomeData).then((res) => {
          if (res.error) {
            toast.error(`${res.error}`);
            setLoading(false);
          } else if (res.success) {
            toast.success(`Income updated successfully!`);
            form.reset();
            setIsRecurring('no'); // Reset isRecurring to default value
            setLoading(false);
            router.refresh(); // Refresh the page or data
            setOpen()
          }
        })
      } else {
        // Handle the case when there's no initialData
        toast.error('No income data to update');
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
          <DialogTitle>Edit Income</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 ">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="amount earned"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scholarship">Scholarship</SelectItem>
                            <SelectItem value="part-time job">Part-time Job</SelectItem>
                            <SelectItem value="allowance">Allowance</SelectItem>
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
                          placeholder="write about your income"
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
                      <FormLabel>Recurring Income</FormLabel>
                      <FormControl>
                        <Select
                          value={isRecurring} // Use string value
                          onValueChange={setIsRecurring}
                          disabled={loading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Is this a recurring income?" />
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
