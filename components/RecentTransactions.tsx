import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Transaction {
  type: 'income' | 'expense'
  amount: number
  description: string
  date: Date
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="space-y-8">
      {transactions.map((transaction, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{transaction.type === 'income' ? 'IN' : 'EX'}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-sm text-muted-foreground">
              {transaction.date.toLocaleDateString()}
            </p>
          </div>
          <div className={`ml-auto font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
            {transaction.type === 'income' ? '+' : '-'}Shs.{transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}

