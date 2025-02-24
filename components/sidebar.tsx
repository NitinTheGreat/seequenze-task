import { AlertCircle, Clock, Package } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-white p-6 border-r">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Expired Tasks</h3>
              <p className="text-2xl font-semibold">5</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium">All Active Tasks</h3>
              <p className="text-2xl font-semibold">7</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Completed Tasks</h3>
              <p className="text-2xl font-semibold">2/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

