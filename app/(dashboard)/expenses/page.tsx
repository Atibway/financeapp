"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {ExpenseForm} from "./_components/ExpenseForm"
import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Expenses from "./_components/expenses";
 function ExpensesPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="space-y-4 m-5">
      <Tabs defaultValue="expenses">
<TabsList className="grid w-full grid-cols-2 h-12 ">
<TabsTrigger 
className="h-10 font-bold"
value="expenses">Expenses</TabsTrigger>
<TabsTrigger 
className="h-10 font-bold"
value="addExpense">Add Expense</TabsTrigger>
</TabsList>
<TabsContent value="expenses">
<Expenses/>
</TabsContent>
<TabsContent value="addExpense">
<ExpenseForm />
</TabsContent>
      </Tabs>
    </div>
  )
}

export default ExpensesPage;
