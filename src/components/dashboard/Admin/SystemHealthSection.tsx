
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Activity,
  CheckCircle,
  Database,
  Mail,
  FileText,
  Upload,
  AlertTriangle,
  Globe,
} from "lucide-react";
const SystemHealthSection = () => {
	  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          System Health
        </h2>
        <p className="text-muted-foreground">
          Monitor system performance and infrastructure
        </p>
      </div>

      {/* System Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-lg font-bold text-green-600">Operational</div>
            <div className="text-sm text-muted-foreground">All Systems</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-blue-600">Healthy</div>
            <div className="text-sm text-muted-foreground">Database</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-purple-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-purple-600">Online</div>
            <div className="text-sm text-muted-foreground">API Services</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-orange-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Mail className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-lg font-bold text-orange-600">Active</div>
            <div className="text-sm text-muted-foreground">Notifications</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Real-time system performance data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">CPU Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Memory Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "62%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">62%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Disk Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Network I/O</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent System Events</CardTitle>
            <CardDescription>Latest system activities and logs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Database backup completed
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Activity className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">System update deployed</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    High memory usage detected
                  </p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
          <CardDescription>
            Administrative tools and maintenance options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 flex-col bg-blue-500 hover:bg-blue-600 text-white">
              <Database className="h-5 w-5 mb-2" />
              <span className="text-sm">Backup Database</span>
            </Button>
            <Button className="h-16 flex-col bg-green-500 hover:bg-green-600 text-white">
              <Upload className="h-5 w-5 mb-2" />
              <span className="text-sm">System Update</span>
            </Button>
            <Button className="h-16 flex-col bg-orange-500 hover:bg-orange-600 text-white">
              <AlertTriangle className="h-5 w-5 mb-2" />
              <span className="text-sm">Clear Cache</span>
            </Button>
            <Button className="h-16 flex-col bg-purple-500 hover:bg-purple-600 text-white">
              <FileText className="h-5 w-5 mb-2" />
              <span className="text-sm">View Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealthSection;