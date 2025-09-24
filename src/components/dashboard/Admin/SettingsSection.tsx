
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  
  Database,
 
  Download,
 
} from "lucide-react";
import { systemStats } from "@/lib/dashboard/admin/adminData";
const SettingsSection = () => {
 return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          System Settings
        </h2>
        <p className="text-muted-foreground">
          Configure system preferences and administrative options
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">System Name</label>
              <Input defaultValue="BloodConnect" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin Email</label>
              <Input defaultValue="admin@bloodconnect.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Emergency Hotline</label>
              <Input defaultValue="999" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">System Timezone</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Asia/Dhaka (GMT+6)</option>
                <option>UTC (GMT+0)</option>
                <option>Asia/Kolkata (GMT+5:30)</option>
              </select>
            </div>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS Alerts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Emergency Alerts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">System Maintenance Alerts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              System security and access control
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Session Timeout (minutes)
              </label>
              <Input defaultValue="30" type="number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password Policy</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Strong (8+ chars, mixed case, numbers, symbols)</option>
                <option>Medium (6+ chars, mixed case, numbers)</option>
                <option>Basic (6+ chars)</option>
              </select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-Factor Authentication</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Login Attempt Monitoring</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">IP Whitelist</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Database and data handling options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Data Retention Period (days)
              </label>
              <Input defaultValue="365" type="number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Backup Frequency</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto Backup</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Encryption</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Audit Logging</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                <Database className="mr-2 h-4 w-4" />
                Backup Now
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Current system details and version information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">v2.1.0</div>
              <div className="text-sm text-blue-700">System Version</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {systemStats.systemUptime}
              </div>
              <div className="text-sm text-green-700">Uptime</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                PostgreSQL
              </div>
              <div className="text-sm text-purple-700">Database</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">AWS</div>
              <div className="text-sm text-orange-700">Cloud Provider</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;