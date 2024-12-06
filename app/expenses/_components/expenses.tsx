import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { deleteExpense, getAllExpenses, getSpecificExpense } from '@/actions/expenseActions';
import { Expense } from '@prisma/client';
import { AlertModal } from '@/components/ui/AlertModel';
import { deleteIncome } from '@/actions/incomeActions';
import toast from 'react-hot-toast';
import EditExpenseForm from './editExpenseForm';



export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Expense | undefined>()
  const [id, setId]= useState("")
  const[openUpdate , setOpenUpdate] = useState(false)
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
       
        const data = await getAllExpenses()
        setExpenses(data);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);
  const handleEdit = async(id: string)=> {
    await getSpecificExpense(id).then((res)=>{
       setData(res as Expense)
   })
   setOpenUpdate(true)
       }
  const handleDelete = async() => {
    try {
      setLoading(true);
     await deleteExpense(id)
     window.location.reload()
     toast.success("Income Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }

};

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
     <AlertModal
    isOpen={open}
    onClose={()=> setOpen(false)}
    onConfirm={handleDelete}
    loading={loading}
    />
     <EditExpenseForm
    open={openUpdate}
    setOpen={()=>setOpenUpdate(false)}
    initialData={data}
    />
    <div className="container mx-auto py-12">
  <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900">My Expenses</h1>
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {expenses.map((expense) => (
      <div 
        key={expense.id} 
        className="shadow-md rounded-lg overflow-hidden border border-gray-300 bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-purple-400 text-white p-6">
          <h2 className="text-3xl font-semibold">Shs.{expense.amount}</h2>
          <p className="text-lg mt-2">{expense.category}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
            <div className='flex justify-between'>
          <div className="flex items-center">
            <span className="text-gray-700 font-bold mr-2">Date:</span>
            <span className="text-gray-600">{new Date(expense.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 font-bold  mr-2">Category:</span>
            <span className="text-gray-600">{expense.category}</span>
          </div>
            </div>
          <div className="">
            <p className="text-gray-700 font-bold mr-2">Description:</p>
            <span className="text-gray-600">{expense.description || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700  font-bold mr-2">Recurring:</span>
            <span className={`px-2 py-1 rounded text-sm font-medium ${expense.isRecurring ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {expense.isRecurring ? 'Yes' : 'No'}
            </span>
          </div>
          {expense.isRecurring && (
            <div className="flex items-center">
              <span className="text-gray-700 font-bold mr-2">Frequency:</span>
              <span className="text-gray-600">{expense.recurringFrequency}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-between items-center bg-gray-50 border-t border-gray-200">
          <button 
          onClick={() => handleEdit(expense.id)}
            className="px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-300 rounded hover:bg-gray-100 transition">
            Edit
          </button>
          <button 
            onClick={() => {
                setId(expense.id);
                setOpen(true);
              }} 
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition">
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
