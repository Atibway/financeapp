'use server';

import { currentUser } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

type ExpenseData = {
  amount: string;
  category: string;
  description: string;
  isRecurring: boolean;
  recurringFrequency?: string;
};

export async function addExpense(data: ExpenseData) {
  const { amount, category, description, isRecurring, recurringFrequency } = data;
const user = await currentUser()
  try {
    await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        category,
        description,
        isRecurring,
        recurringFrequency: isRecurring ? recurringFrequency : null,
        userId: user?.id as string, // Replace with actual user ID when authentication is implemented
      },
    });

    revalidatePath('/expenses');
    return { success: true };
  } catch (error) {
    console.error('Failed to add expense:', error);
    return { success: false, error: 'Failed to add expense' };
  }
}

export async function updateExpense(id: string, data: ExpenseData) {
  const { amount, category, description, isRecurring, recurringFrequency } = data;

  try {
    await prisma.expense.update({
      where: { id },
      data: {
        amount: parseFloat(amount),
        category,
        description,
        isRecurring,
        recurringFrequency: isRecurring ? recurringFrequency : null,
      },
    });

    revalidatePath('/expenses');
    return { success: true };
  } catch (error) {
    console.error('Failed to update expense:', error);
    return { success: false, error: 'Failed to update expense' };
  }
}

export const getAllExpenses =async()=>{
const user = await currentUser()

const expenses = await prisma.expense.findMany({
  where:{
    userId: user?.id
  }
})

return expenses;
}

export const deleteExpense = async (id: string)=> {
  const user = await currentUser()
  const expense = await prisma.expense.findUnique({
    where:{
      id
    }
  })
  
  if(user?.id !== expense?.userId){
    return {error:"Not Authorized"}
  }

   await prisma.expense.delete({
    where:{
      id:expense?.id
    }
  })

  return {success: "Successfully deleted Expense"}
}
export const getSpecificExpense = async (id: string)=> {

  const expense = await prisma.expense.findUnique({
    where:{
      id
    }
  })
  
  return expense;
}