

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import BudgetForm from "./_components/BudgetForm"
import { Budgets } from "./_components/budgets"
import { fetchBudgets } from "@/actions/budgetActions"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

 const BudgetPage = async()=>{
const user = await currentUser()
const budgets = await db.budget.findMany({
  where:{
    userId: user?.id
  },
  include:{
    categories: true
  }
})
  return (
    <div className="space-y-4 m-5">
      <Tabs defaultValue="budgets">
<TabsList className="grid w-full grid-cols-2 h-12 ">
<TabsTrigger 
className="h-10 font-bold"
value="budgets">Budgets</TabsTrigger>
<TabsTrigger 
className="h-10 font-bold"
value="addBudget">Add Budget</TabsTrigger>
</TabsList>
<TabsContent value="budgets">
<Budgets
budgets={budgets}
/>
</TabsContent>
<TabsContent value="addBudget">
<BudgetForm />
</TabsContent>
      </Tabs>
    </div>
  )
}

export default BudgetPage;