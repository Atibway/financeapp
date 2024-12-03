"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {ExpenseForm} from "./_components/ExpenseForm"

 function Expenses() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Expenses</h1>
      <ExpenseForm />
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Groceries</p>
                <p className="text-sm text-muted-foreground">
                  June 15, 2023
                </p>
              </div>
              <div className="ml-auto font-medium">-$50.00</div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Transportation</p>
                <p className="text-sm text-muted-foreground">
                  June 14, 2023
                </p>
              </div>
              <div className="ml-auto font-medium">-$25.00</div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Books</p>
                <p className="text-sm text-muted-foreground">
                  June 13, 2023
                </p>
              </div>
              <div className="ml-auto font-medium">-$100.00</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Expenses;
