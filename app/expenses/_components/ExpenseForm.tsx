'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addExpense } from '@/actions/expenseActions';

export  function ExpenseForm() {
  // State for managing form inputs
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the form data
    const expenseData = {
      amount,
      category,
      description,
      isRecurring,
      recurringFrequency: isRecurring ? recurringFrequency : null,
    };

    try {
      const result = await addExpense(expenseData);

      if (result.success) {
        // Reset form after successful submission
        setAmount('');
        setCategory('');
        setDescription('');
        setIsRecurring(false);
        setRecurringFrequency('');
      } else {
        console.error(result.error);
        alert('Failed to add expense. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            spellCheck={false}
          />
        </div>

        {/* Category Selector */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={category || undefined}
            onValueChange={(value) => setCategory(value)}
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
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            spellCheck={false}
            data-ms-editor={false}
          />
        </div>

        {/* Recurring Expense Selector */}
        <div className="space-y-2">
          <Label htmlFor="isRecurring">Recurring Expense</Label>
          <Select
            value={isRecurring ? 'yes' : 'no'}
            onValueChange={(value) => setIsRecurring(value === 'yes')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Is this a recurring expense?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recurring Frequency Selector */}
        {isRecurring && (
          <div className="space-y-2">
            <Label htmlFor="recurringFrequency">Recurring Frequency</Label>
            <Select
              value={recurringFrequency || undefined}
              onValueChange={(value) => setRecurringFrequency(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit">Add Expense</Button>
    </form>
  );
}
