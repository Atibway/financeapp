"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BudgetForm from "./_components/BudgetForm"
import { useEffect, useState } from "react";

export default function Budget() {
    const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Or a loading spinner
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Budget</h1>
      <BudgetForm />
      <Card>
        <CardHeader>
          <CardTitle>Current Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Monthly Budget</p>
                <p className="text-sm text-muted-foreground">
                  June 1, 2023 - June 30, 2023
                </p>
              </div>
              <div className="ml-auto font-medium">$1000.00 / $1500.00</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="text-sm font-medium">Groceries</p>
                <span className="ml-auto text-sm font-medium">$200.00 / $300.00</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '66.67%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="text-sm font-medium">Transportation</p>
                <span className="ml-auto text-sm font-medium">$150.00 / $200.00</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="text-sm font-medium">Entertainment</p>
                <span className="ml-auto text-sm font-medium">$50.00 / $100.00</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

