'use server'

import { revalidatePath } from 'next/cache'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addIncome(formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string)
  const source = formData.get('source') as string
  const description = formData.get('description') as string
  const isRecurring = formData.get('isRecurring') === 'yes'
  const recurringFrequency = formData.get('recurringFrequency') as string | null

  try {
    await prisma.income.create({
      data: {
        amount,
        source,
        description,
        isRecurring,
        recurringFrequency: isRecurring ? recurringFrequency : null,
        userId: 'placeholder-user-id', // Replace with actual user ID when authentication is implemented
      },
    })

    revalidatePath('/income')
    return { success: true }
  } catch (error) {
    console.error('Failed to add income:', error)
    return { success: false, error: 'Failed to add income' }
  }
}

