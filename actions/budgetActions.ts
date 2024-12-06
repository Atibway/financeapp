'use server';

import { revalidatePath } from 'next/cache';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';


export async function createBudget(data: {
  period: string;
  totalLimit: string;
  startDate: string;
  endDate: string;
  categories: { category: string; limit: string }[];
}) {
  const user = await currentUser()
  const { period, totalLimit, startDate, endDate, categories } = data;

  try {
    const budget = await db.budget.create({
      data: {
        period,
        totalLimit: parseFloat(totalLimit),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId: user?.id as string, 
      },
    });

    for (const category of categories) {
      await db.budgetCategory.create({
        data: {
          budgetId: budget.id,
          category: category.category,
          limit: parseFloat(category.limit),
        },
      });
    }

    revalidatePath('/budget');
    return { success: true };
  } catch (error) {
    console.error('Failed to create budget:', error);
    return { success: false, error: 'Failed to create budget' };
  }
}

export const  fetchBudgets = async()=>{
  try { 
    const user = await currentUser()

    const budgets = await db.budget.findMany({
      where:{
userId: user?.id
      },
       include: { categories: true, }, });
     
       return budgets;
      }  
        catch (error) { 
         return { error: 'Failed to fetch budgets' }; 
        }
}

export const deleteBudget =async(id:string)=>{
  const user = await currentUser()
  const budget = await db.budget.findUnique({
    where:{
      id
    }
  })
  
  if(user?.id !== budget?.userId){
    return {error:"Not Authorized"}
  }

   await db.budget.delete({
    where:{
      id:budget?.id
    }
  })

  return {success: "Successfully deleted Budget"}
}