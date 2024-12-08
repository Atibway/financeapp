"use client"
import {  useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { deleteIncome } from '@/actions/incomeActions';
import toast from 'react-hot-toast';
import { AlertModal } from '@/components/ui/AlertModel';
import { deleteBudget } from '@/actions/budgetActions';

type Budget = {
  id: string;
  period: string;
  totalLimit: number;
  startDate: Date;
  endDate: Date;
  categories: {
    id: string;
    category: string;
    limit: number;
  }[];
};

export  function Budgets({
    budgets
}:{
    budgets: Budget[]
}) {

    const [id, setId]= useState("")
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDelete = async() => {
        try {
          setLoading(true);
         await deleteBudget(id).then((res)=>{
            if(res.error){
                toast.error(`${res.error}`)
            }else{
                toast.success(`${res.success}`);
            }
         })
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            setOpen(false);
            window.location.reload()
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
   <div className="container mx-auto py-12">
  <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900">My Budgets</h1>
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {budgets.map((budget) => (
      <div 
        key={budget.id} 
        className="shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6">
          <h2 className="text-2xl font-bold">{budget.period}</h2>
          <p className="text-lg mt-2">Total Limit: Shs.{budget.totalLimit}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div>
            <dt className="font-semibold text-gray-600">Period:</dt>
            <dd className="text-gray-700">{budget.period}</dd>
          </div>
          <div className='flex justify-between'>
          <div>
            <dt className="font-semibold text-gray-600">Start Date:</dt>
            <dd className="text-gray-700">{new Date(budget.startDate).toLocaleDateString()}</dd>
          </div>

          <div>
            <dt className="font-semibold text-gray-600">End Date:</dt>
            <dd className="text-gray-700">{new Date(budget.endDate).toLocaleDateString()}</dd>
          </div>
          </div>
          <div>
                  <Badge className="bg-purple-100 text-purple-800">Budget Items</Badge>
                  <div className="mt-2">
  {budget.categories.map((category, index) => (
    <div 
      key={index} 
      className="flex justify-between text-gray-800 capitalize border-b py-2"
    >
      <span className="font-semibold">{category.category}:</span>
      <span>Shs.{category.limit}</span>
    </div>
  ))}
</div>

                </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-end space-x-4 bg-gray-50 border-t border-gray-200">
          <button 
            onClick={() => {
              setId(budget.id);
              setOpen(true);
            }} 
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


    </>
  );
}
