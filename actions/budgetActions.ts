'use server'

import { revalidatePath } from 'next/cache'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createBudget(formData: FormData) {
  const period = formData.get('period') as string
  const totalLimit = parseFloat(formData.get('totalLimit') as string)
  const startDate = new Date(formData.get('startDate') as string)
  const endDate = new Date(formData.get('endDate') as string)
  const categories = JSON.parse(formData.get('categories') as string)

  try {
    const budget = await prisma.budget.create({
      data: {
        period,
        totalLimit,
        startDate,
        endDate,
        userId: 'placeholder-user-id', // Replace with actual user ID when authentication is implemented
      },
    })

    for (const category of categories) {
      await prisma.budgetCategory.create({
        data: {
          budgetId: budget.id,
          category: category.category,
          limit: parseFloat(category.limit),
        },
      })
    }

    revalidatePath('/budget')
    return { success: true }
  } catch (error) {
    console.error('Failed to create budget:', error)
    return { success: false, error: 'Failed to create budget' }
  }
}

