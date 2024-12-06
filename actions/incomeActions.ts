"use server"

import * as z from "zod"
import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'


const formSchema = z.object({
  source: z.string().min(2, {
    message: "Source must be at least 2 characters.",
  }),
  recurringFrequency: z.string().optional(),
  description: z.string().min(5, {
    message: "description must be at least 5 characters.",
  }),
  isRecurring: z.boolean(),
  amount: z.string().min(1, {
    message: "Amount is required"
  })
})

const formSchemaUpdate = z.object({
  source: z.string().min(2, {
    message: "Source must be at least 2 characters.",
  }),
  recurringFrequency: z.string().optional(),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  isRecurring: z.boolean(),
  amount: z.string().min(1, {
    message: "Amount is required"
  })
});

export type IncomeFormValues = z.infer<typeof formSchemaUpdate>;

export const addIncome = async (values: z.infer<typeof formSchema>) => {
  const user = await currentUser()
  
  if (!user) {
    return redirect('/auth/login')
  }

  const validateFields = formSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid Fields" }
  }

  const { isRecurring, amount, source, recurringFrequency, description } = validateFields.data

  try {
    await db.income.create({
      data: {
        amount: parseInt(amount),
        source,
        description,
        isRecurring,
        recurringFrequency: isRecurring ? recurringFrequency : null,
        userId: user.id as string
      },
    })
    return { success: "Income Created successfully" }
  } catch (error) {
    console.log('Failed to add income:', error)
    return { success: false, error: 'Failed to add income' }
  }
}
export const updateIncome = async (id: string, data: IncomeFormValues) => { 
  
  try { 

    await db.income.update({
       where: { id },
        data: { 
          amount: parseInt(data.amount), 
          source: data.source,
          description: data.description, 
          isRecurring: data.isRecurring, 
          recurringFrequency: data.recurringFrequency || null, 
        },
       });

     return { success: true }; }
         catch (error) { 
           console.log('Failed to update income:', error);
     return { success: false, error: 'Failed to update income' }; 
              
        } };

export const deleteIncome = async (id: string)=> {
  const user = await currentUser()
  const income = await db.income.findUnique({
    where:{
      id
    }
  })
  
  if(user?.id !== income?.userId){
    return {error:"Not Authorized"}
  }

   await db.income.delete({
    where:{
      id:income?.id
    }
  })

  return {success: "Successfully deleted Income"}
}
export const getSpecificIncome = async (id: string)=> {

  const income = await db.income.findUnique({
    where:{
      id
    }
  })
  
  return income;
}
