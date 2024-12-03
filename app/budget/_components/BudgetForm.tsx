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
import { createBudget } from '@/actions/budgetActions';

export default function BudgetForm() {
  const [period, setPeriod] = useState('');
  const [totalLimit, setTotalLimit] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categories, setCategories] = useState([{ category: '', limit: '' }]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const budgetData = {
      period,
      totalLimit: parseFloat(totalLimit),
      startDate,
      endDate,
      categories,
    };

    try {
      const result = await createBudget(budgetData);

      if (result.success) {
        // Reset form
        setPeriod('');
        setTotalLimit('');
        setStartDate('');
        setEndDate('');
        setCategories([{ category: '', limit: '' }]);
      } else {
        console.error(result.error);
        alert('Failed to create budget. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  const addCategory = () => {
    setCategories([...categories, { category: '', limit: '' }]);
  };

  const updateCategory = (index: number, field: 'category' | 'limit', value: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat, i) =>
        i === index ? { ...cat, [field]: value } : cat
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Budget Period */}
        <div className="space-y-2">
          <Label htmlFor="period">Budget Period</Label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="term">Term</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Total Budget Limit */}
        <div className="space-y-2">
          <Label htmlFor="totalLimit">Total Budget Limit</Label>
          <Input
            id="totalLimit"
            type="number"
            placeholder="Enter total budget limit"
            value={totalLimit}
            onChange={(e) => setTotalLimit(e.target.value)}
            required
          />
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Budget Categories */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Budget Categories</h3>
        {categories.map((cat, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`category-${index}`}>Category</Label>
              <Input
                id={`category-${index}`}
                placeholder="Enter category"
                value={cat.category}
                onChange={(e) => updateCategory(index, 'category', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`limit-${index}`}>Limit</Label>
              <Input
                id={`limit-${index}`}
                type="number"
                placeholder="Enter limit"
                value={cat.limit}
                onChange={(e) => updateCategory(index, 'limit', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <Button type="button" onClick={addCategory}>
          Add Category
        </Button>
      </div>

      {/* Submit Button */}
      <Button type="submit">Create Budget</Button>
    </form>
  );
}
