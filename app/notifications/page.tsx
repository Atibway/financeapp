import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Notifications() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Budget Limit Alert</p>
                <p className="text-sm text-muted-foreground">
                  You've reached 80% of your monthly budget for groceries.
                </p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">2 hours ago</div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Upcoming Payment</p>
                <p className="text-sm text-muted-foreground">
                  Your rent payment is due in 3 days.
                </p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">1 day ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

