


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {

  Phone,
 
  MessageSquare,

} from "lucide-react"
const MessagesSection = ({ userRole }: { userRole: "user" | "donor" }) => {
	  const userMessages = [
    {
      from: "Rahman Ali",
      message: "I'm available for donation tomorrow morning. Please confirm the hospital location.",
      time: "2 hours ago",
      type: "donor",
      unread: true,
    },
    {
      from: " RoktoShare Support",
      message: "Your blood request REQ-U001 has been successfully completed. Thank you!",
      time: "1 day ago",
      type: "system",
      unread: false,
    },
  ]

  const donorMessages = [
    {
      from: "Ahmed Hassan",
      message: "Thank you so much for saving my life. I am forever grateful for your donation.",
      time: "1 hour ago",
      type: "recipient",
      unread: true,
    },
    {
      from: " RoktoShare Support",
      message: "Congratulations! You've reached 15 donations and earned the Hero Donor badge.",
      time: "2 days ago",
      type: "system",
      unread: false,
    },
  ]

  const messages = userRole === "user" ? userMessages : donorMessages

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">
          Communication with {userRole === "user" ? "donors and support team" : "recipients and support team"}
        </p>
      </div>

      <div className="grid gap-4 md:gap-4 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex space-x-3 p-3 md:p-4 rounded-lg border transition-colors ${
                  msg.unread ? "bg-red-50 border-red-200" : "bg-gray-50"
                }`}
              >
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarFallback
                    className={
                      msg.type === "donor" || msg.type === "recipient"
                        ? "bg-green-500 text-white"
                        : msg.type === "system"
                          ? "bg-blue-500 text-white"
                          : "bg-purple-500 text-white"
                    }
                  >
                    {msg.from
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <p className={`text-sm font-medium ${msg.unread ? "text-red-900" : ""}`}>{msg.from}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">{msg.time}</p>
                      {msg.unread && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                    </div>
                  </div>
                  <p className={`text-sm ${msg.unread ? "text-red-800" : "text-muted-foreground"}`}>{msg.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-red-500 hover:bg-red-600">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Phone className="mr-2 h-4 w-4" />
              Emergency Hotline
            </Button>
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-medium text-sm">Message Categories</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">{userRole === "user" ? "Donor Messages" : "Thank You Messages"}</span>
                  <Badge variant="outline">{userRole === "user" ? "3" : "8"}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">System Updates</span>
                  <Badge variant="outline">{userRole === "user" ? "1" : "3"}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">Medical Team</span>
                  <Badge variant="outline">{userRole === "user" ? "2" : "5"}</Badge>
                </div>
                {userRole === "donor" && (
                  <div className="flex items-center justify-between p-2 rounded border">
                    <span className="text-sm">Urgent Requests</span>
                    <Badge variant="destructive">2</Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};

export default MessagesSection;