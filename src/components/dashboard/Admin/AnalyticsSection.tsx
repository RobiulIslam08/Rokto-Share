
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  
 

  
  Activity,
  
  TrendingUp,

  PieChart,
  Download,
 
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import {  systemStats } from "@/lib/dashboard/admin/adminData";
const AnalyticsSection = () => {
	  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Analytics & Reports
        </h2>
        <p className="text-muted-foreground">
          System performance metrics and insights
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">User Growth</span>
                <span className="text-sm font-bold text-green-600">+12%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Donor Growth</span>
                <span className="text-sm font-bold text-green-600">+8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Request Volume</span>
                <span className="text-sm font-bold text-blue-600">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-blue-500" />
              Blood Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">O+ (Universal)</span>
                <span className="text-sm font-bold">35%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">A+</span>
                <span className="text-sm font-bold">28%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">B+</span>
                <span className="text-sm font-bold">22%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Others</span>
                <span className="text-sm font-bold">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-purple-500" />
              Platform Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm flex items-center">
                  <Smartphone className="mr-1 h-3 w-3" />
                  Mobile
                </span>
                <span className="text-sm font-bold">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm flex items-center">
                  <Monitor className="mr-1 h-3 w-3" />
                  Desktop
                </span>
                <span className="text-sm font-bold">25%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm flex items-center">
                  <Tablet className="mr-1 h-3 w-3" />
                  Tablet
                </span>
                <span className="text-sm font-bold">7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Key metrics for the current month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-blue-700">New Users</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">89</div>
                <div className="text-sm text-red-700">New Donors</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">234</div>
                <div className="text-sm text-green-700">Requests Fulfilled</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">702</div>
                <div className="text-sm text-purple-700">Lives Impacted</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Technical performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Server Uptime</span>
                <Badge className="bg-green-500">
                  {systemStats.systemUptime}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Response Time</span>
                <Badge
                  variant="outline"
                  className="border-green-300 text-green-700"
                >
                  245ms
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Performance</span>
                <Badge className="bg-blue-500">Optimal</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Error Rate</span>
                <Badge
                  variant="outline"
                  className="border-green-300 text-green-700"
                >
                  0.02%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>
            Download detailed reports and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col bg-transparent">
              <Download className="h-5 w-5 mb-2" />
              <span className="text-sm">User Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col bg-transparent">
              <Download className="h-5 w-5 mb-2" />
              <span className="text-sm">Donor Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col bg-transparent">
              <Download className="h-5 w-5 mb-2" />
              <span className="text-sm">Request Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col bg-transparent">
              <Download className="h-5 w-5 mb-2" />
              <span className="text-sm">Full Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSection;