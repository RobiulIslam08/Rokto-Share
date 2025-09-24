import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



import { Button } from "@/components/ui/button"


import {

  Calendar,


 
  CheckCircle,
  XCircle,

} from "lucide-react"
import { donorData } from "@/lib/dashboard/donor/donorData";
const DonorScheduleSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">My Schedule</h2>
        <p className="text-muted-foreground">Manage your donation appointments and availability</p>
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming appointments</p>
                <Button className="mt-4 bg-red-500 hover:bg-red-600">Schedule Donation</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Availability Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Preferred Days</label>
                  <div className="grid grid-cols-7 gap-2 mt-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Button key={day} variant="outline" size="sm" className="text-xs bg-transparent">
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Preferred Time</label>
                  <select className="w-full p-2 border rounded-lg mt-2">
                    <option>Morning (8AM - 12PM)</option>
                    <option>Afternoon (12PM - 5PM)</option>
                    <option>Evening (5PM - 8PM)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Maximum Distance</label>
                  <select className="w-full p-2 border rounded-lg mt-2">
                    <option>Within 5km</option>
                    <option>Within 10km</option>
                    <option>Within 20km</option>
                    <option>Anywhere in city</option>
                  </select>
                </div>
                <Button className="w-full bg-red-500 hover:bg-red-600">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader>
              <CardTitle className="text-red-900">Donation Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="p-3 md:p-4 bg-red-500 rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="font-semibold text-base md:text-lg text-red-900">Eligible to Donate</h3>
                <p className="text-sm text-red-700">Next eligible: {donorData.nextEligible}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Last Donation</span>
                  <span className="font-medium">{donorData.lastDonation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Days Since</span>
                  <span className="font-medium">89 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Gap</span>
                  <span className="font-medium">90 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-500 hover:bg-green-600">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Available
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <XCircle className="mr-2 h-4 w-4" />
                Mark Unavailable
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Break
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
};

export default DonorScheduleSection;