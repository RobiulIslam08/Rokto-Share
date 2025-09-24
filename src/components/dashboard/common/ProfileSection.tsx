
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {


  Star,
  CheckCircle,
 
  Award,
  Users,

} from "lucide-react"
import { userData } from "@/lib/dashboard/user/userData"
import { donorData } from "@/lib/dashboard/donor/donorData"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const ProfileSection = ({ userRole }: { userRole: "user" | "donor" }) => {
	  const currentData = userRole === "user" ? userData : donorData

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">
          Manage your {userRole === "user" ? "account" : "donor"} information and preferences
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue={currentData.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Type</label>
                  <Input defaultValue={currentData.bloodType} disabled />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input defaultValue={currentData.phone} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input defaultValue={currentData.email} />
                </div>
              </div>
              {userRole === "donor" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age</label>
                    <Input defaultValue="28" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weight (kg)</label>
                    <Input defaultValue="70" />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Textarea defaultValue={currentData.address} />
              </div>
              <Button className="bg-red-500 hover:bg-red-600">Update Profile</Button>
            </CardContent>
          </Card>

          {userRole === "user" ? (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Contact</label>
                    <Input placeholder="Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="+880 1XXX-XXXXXX" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Secondary Contact</label>
                    <Input placeholder="Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="+880 1XXX-XXXXXX" />
                  </div>
                </div>
                <Button variant="outline" className="bg-transparent">
                  Save Emergency Contacts
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Health Checkup</label>
                    <Input defaultValue="2024-01-15" type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Health Status</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Fair</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Medical Conditions (if any)</label>
                  <Textarea placeholder="List any medical conditions or medications..." />
                </div>
                <Button variant="outline" className="bg-transparent">
                  Update Health Info
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card
            className={`border-0 shadow-lg bg-gradient-to-br ${userRole === "user" ? "from-red-50 to-red-100" : "from-green-50 to-green-100"}`}
          >
            <CardHeader>
              <CardTitle className={userRole === "user" ? "text-red-900" : "text-green-900"}>
                {userRole === "user" ? "Account Status" : "Donor Status"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Avatar
                  className={`h-16 w-16 md:h-20 md:w-20 mx-auto mb-4 ring-4 ${userRole === "user" ? "ring-red-200" : "ring-green-200"}`}
                >
                  <AvatarFallback
                    className={`${userRole === "user" ? "bg-red-500" : "bg-green-500"} text-white text-lg md:text-2xl`}
                  >
                    AH
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-base md:text-lg">{currentData.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {userRole === "user"
                    ? `Member since ${currentData.memberSince}`
                    : `Hero Donor since ${currentData.memberSince}`}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verification Status</span>
                  <Badge className={userRole === "user" ? "bg-green-500" : "bg-green-500"}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                {userRole === "donor" && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Donor Level</span>
                      <Badge className="bg-yellow-500">
                        <Award className="w-3 h-3 mr-1" />
                        Hero
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Donations</span>
                      <Badge variant="outline">{donorData.totalDonations}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{donorData.rating}</span>
                      </div>
                    </div>
                  </>
                )}
                {userRole === "user" && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Requests</span>
                    <Badge variant="outline">{userData.totalRequests}</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {userRole === "donor" ? (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Award className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">Hero Donor</p>
                    <p className="text-xs text-muted-foreground">15+ donations</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Star className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">5-Star Donor</p>
                    <p className="text-xs text-muted-foreground">Excellent rating</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Life Saver</p>
                    <p className="text-xs text-muted-foreground">45+ lives impacted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Notifications</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Updates</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emergency Alerts</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Donor Responses</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
};

export default ProfileSection;