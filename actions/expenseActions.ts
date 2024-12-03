'use server'

import { revalidatePath } from 'next/cache'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addExpense(formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string)
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const isRecurring = formData.get('isRecurring') === 'yes'
  const recurringFrequency = formData.get('recurringFrequency') as string | null

  try {
    await prisma.expense.create({
      data: {
        amount,
        category,
        description,
        isRecurring,
        recurringFrequency: isRecurring ? recurringFrequency : null,
        userId: 'placeholder-user-id', // Replace with actual user ID when authentication is implemented
      },
    })

    revalidatePath('/expenses')
    return { success: true }
  } catch (error) {
    console.error('Failed to add expense:', error)
    return { success: false, error: 'Failed to add expense' }
  }
}

