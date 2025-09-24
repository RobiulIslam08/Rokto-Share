
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
	CheckCircle,
  Heart,
  Phone,
  
} from "lucide-react"
const RequestBloodSection = () => {
	  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Request Blood
        </h2>
        <p className="text-muted-foreground mt-2">Submit a new blood donation request</p>
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        {/* Request Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl text-red-900">Blood Request Form</CardTitle>
              <CardDescription>Please fill in all required information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Type *</label>
                  <select className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Units Needed *</label>
                  <Input
                    type="number"
                    placeholder="e.g., 2"
                    className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hospital/Medical Center *</label>
                <Input
                  placeholder="e.g., Dhaka Medical College Hospital"
                  className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency Level *</label>
                <select className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">Select Urgency</option>
                  <option value="Critical">Critical (Within 2 hours)</option>
                  <option value="Urgent">Urgent (Within 6 hours)</option>
                  <option value="Normal">Normal (Within 24 hours)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient Name *</label>
                  <Input
                    placeholder="Full name of patient"
                    className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Number *</label>
                  <Input
                    placeholder="+880 1XXX-XXXXXX"
                    className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Information</label>
                <Textarea
                  placeholder="Any additional details about the patient's condition or special requirements..."
                  className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={4}
                />
              </div>

              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white h-10 md:h-12">
                  <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Submit Request
                </Button>
                <Button variant="outline" className="md:px-8 h-10 md:h-12 bg-transparent">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Guidelines */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-blue-900">Request Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Provide accurate patient information</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Select appropriate urgency level</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Include hospital contact details</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Be available for donor coordination</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-red-900">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="p-3 md:p-4 bg-red-500 rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto flex items-center justify-center">
                  <Phone className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-red-900">24/7 Emergency Hotline</p>
                  <p className="text-xl md:text-2xl font-bold text-red-600">999</p>
                  <p className="text-sm text-red-700">For critical blood emergencies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
};

export default RequestBloodSection;