
import IncomeForm from "./_components/IncomeForm"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {Incomes } from "./_components/incomes"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
 const Income = async()=>{
const user = await currentUser()
const incomes = await db.income.findMany({
  where:{
    userId: user?.id
  }
})
  return (
    <div className="space-y-4 m-5">
      <Tabs defaultValue="incomes">
<TabsList className="grid w-full grid-cols-2 h-12 ">
<TabsTrigger 
className="h-10 font-bold"
value="incomes">Incomes</TabsTrigger>
<TabsTrigger 
className="h-10 font-bold"
value="addIncome">Add Income</TabsTrigger>
</TabsList>
<TabsContent value="incomes">
<Incomes
incomes={incomes}
/>
</TabsContent>
<TabsContent value="addIncome">
<IncomeForm />
</TabsContent>
      </Tabs>
    </div>
  )
}

export default Income;