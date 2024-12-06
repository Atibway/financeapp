"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Income } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {useState } from "react"

import toast from "react-hot-toast"
import { deleteIncome, getSpecificIncome } from "@/actions/incomeActions"
import { AlertModal } from "@/components/ui/AlertModel"
import EditIncomeForm from "./editIncomeForm"

export  function Incomes({
    incomes
}:{
    incomes:Income[]
}) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<Income | undefined>()
    const [id, setId]= useState("")
    const[openUpdate , setOpenUpdate] = useState(false)
    
    const handleEdit = async(id: string)=> {
 await getSpecificIncome(id).then((res)=>{
    setData(res as Income)
})
setOpenUpdate(true)
    }

      const handleDelete = async() => {
    
            try {
              setLoading(true);
             await deleteIncome(id)
             window.location.reload()
             toast.success("Income Deleted");
            } catch (error) {
              toast.error("Something went wrong");
            } finally {
              setLoading(false);
              setOpen(false);
            }
       
      };
      
 
  return (
    <>
    <AlertModal
    isOpen={open}
    onClose={()=> setOpen(false)}
    onConfirm={handleDelete}
    loading={loading}
    />
    <EditIncomeForm
    open={openUpdate}
    setOpen={()=>setOpenUpdate(false)}
    initialData={data}
    />
    <div className="container mx-auto py-10">
    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Incomes</h1>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {incomes.map((income) => {
        
        return (
            <div 
            key={income.id} 
            className="shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-green-500 to-teal-500 text-white flex items-center justify-between">
              <h2 className="text-2xl font-bold">Shs.{income.amount}</h2>
              <span 
                className={`px-3 py-1 text-sm font-semibold rounded-md ${income.isRecurring ? 'bg-green-100 text-green-900' : 'bg-gray-100 text-gray-800'}`}
              >
                {income.isRecurring ? "Recurring" : "One-time"}
              </span>
            </div>
          
            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <dt className="text-gray-600 font-semibold">Source:</dt>
                  <dd className="capitalize text-gray-800">{income.source}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 font-semibold">Description:</dt>
                  <dd className="text-gray-800">{income.description || "No description provided"}</dd>
                </div>
                {income.isRecurring && (
                  <div>
                    <dt className="text-gray-600 font-semibold">Frequency:</dt>
                    <dd className="capitalize text-gray-800">{income.recurringFrequency}</dd>
                  </div>
                )}
              </div>
            </div>
          
            {/* Footer */}
            <div className="p-4 bg-gray-50 flex justify-end space-x-4 border-t border-gray-200">
              <button 
                onClick={() => handleEdit(income.id)} 
                className="px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  setId(income.id);
                  setOpen(true);
                }} 
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
          
        )
})}
    </div>
  </div>
    </>
  
  )
}

             