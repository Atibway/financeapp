import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import IncomeForm from "./_components/IncomeForm"

export default function Income() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Income</h1>
      <IncomeForm />
      <Card>
        <CardHeader>
          <CardTitle>Recent Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Part-time Job</p>
                <p className="text-sm text-muted-foreground">
                  June 15, 2023
                </p>
              </div>
              <div className="ml-auto font-medium">+$200.00</div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Scholarship</p>
                <p className="text-sm text-muted-foreground">
                  June 1, 2023
                </p>
              </div>
              <div className="ml-auto font-medium">+$1000.00</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

