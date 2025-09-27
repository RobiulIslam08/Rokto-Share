


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Filter,
  CheckCircle,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { recentUsers, systemStats } from "@/lib/dashboard/admin/adminData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserManagementSection = () => {
  return (
    // মূল কন্টেইনারে overflow-hidden যোগ করা হয়েছে যাতে কোনো চাইল্ড এলিমেন্ট বাইরে যেতে না পারে
    <div className="space-y-6 overflow-hidden">
      {/* হেডার সেকশন */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            User Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage all registered users and their accounts
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Input
            placeholder="Search users..."
            className="w-full sm:w-auto flex-grow"
          />
          <div className="flex w-full sm:w-auto items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent w-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="bg-red-500 hover:bg-red-600 w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      </div>

      {/* ইউজার পরিসংখ্যান */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {systemStats.totalUsers}
            </div>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        {/* অন্যান্য কার্ডগুলো এখানে থাকবে */}
         <Card className="border-0 shadow-md">
           <CardContent className="p-4 text-center">
             <div className="text-2xl font-bold text-green-600">2,456</div>
             <p className="text-sm text-muted-foreground">Active Users</p>
           </CardContent>
         </Card>
         <Card className="border-0 shadow-md">
           <CardContent className="p-4 text-center">
             <div className="text-2xl font-bold text-orange-600">391</div>
             <p className="text-sm text-muted-foreground">Inactive Users</p>
           </CardContent>
         </Card>
         <Card className="border-0 shadow-md">
           <CardContent className="p-4 text-center">
             <div className="text-2xl font-bold text-red-600">2,234</div>
             <p className="text-sm text-muted-foreground">Verified Users</p>
           </CardContent>
         </Card>
      </div>

      {/* ইউজার তালিকা */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>
            Latest user registrations and account status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-gray-200">
                    <AvatarFallback className="bg-blue-500 text-white font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* মূল সমাধান: min-w-0 টেক্সটকে র‍্যাপ হতে সাহায্য করে এবং ওভারফ্লো আটকায় */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                      <h3 className="font-semibold text-base truncate">{user.name}</h3>
                      {user.verified && (
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-200 bg-green-50 text-xs"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>ID: {user.id}</span>
                      <span>Blood: <span className="font-bold text-red-600">{user.bloodType}</span></span>
                      <span>Joined: {user.joinDate}</span>
                      <span>Requests: {user.requests}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end md:justify-start gap-2 flex-shrink-0">
                  <Badge
                    variant={user.status === "Active" ? "default" : "secondary"}
                    className={
                      user.status === "Active"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }
                  >
                    {user.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button size="icon" variant="outline" className="bg-transparent h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="bg-transparent h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="bg-transparent text-red-600 hover:bg-red-50 hover:text-red-700 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* পেজিনেশন */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <p className="text-sm text-muted-foreground">
              Showing 3 of {systemStats.totalUsers} users
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementSection;