import { db } from '@/lib/db'
import { PrismaClient, Prisma } from '@prisma/client'



export async function getDashboardData() {
  try {
    const [totalIncome, totalExpenses, recentTransactions, monthlyExpenses] = await Promise.all([
      db.income.aggregate({
        _sum: {
          amount: true,
        },
      }),
      db.expense.aggregate({
        _sum: {
          amount: true,
        },
      }),
      db.$queryRaw`
        SELECT 'income' as type, amount, source as description, date
        FROM \`Income\`
        UNION ALL
        SELECT 'expense' as type, amount, description, date
        FROM \`Expense\`
        ORDER BY date DESC
        LIMIT 5
      `,
      db.$queryRaw`
        SELECT 
          DATE_FORMAT(date, '%Y-%m') as month,
          SUM(amount) as total
        FROM \`Expense\`
        WHERE date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        GROUP BY DATE_FORMAT(date, '%Y-%m')
        ORDER BY month ASC
      `
    ])

    return {
      totalIncome: Number(totalIncome._sum.amount) || 0,
      totalExpenses: Number(totalExpenses._sum.amount) || 0,
      recentTransactions: (recentTransactions as Array<{
        type: 'income' | 'expense'
        amount: Prisma.Decimal
        description: string
        date: Date
      }>).map(transaction => ({
        ...transaction,
        amount: Number(transaction.amount)
      })),
      monthlyExpenses: (monthlyExpenses as Array<{
        month: string
        total: Prisma.Decimal
      }>).map(expense => ({
        month: expense.month,
        total: Number(expense.total)
      }))
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return {
      totalIncome: 0,
      totalExpenses: 0,
      recentTransactions: [],
      monthlyExpenses: []
    }
  }
}

