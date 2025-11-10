import React from 'react'
import { Settings } from 'lucide-react'

export default function Admin() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-5 h-5 text-gray-700" />
        <h2 className="text-2xl font-bold">Admin Dashboard (placeholder)</h2>
      </div>
      <p className="text-sm text-gray-600">Admin features will be implemented here.</p>
    </div>
  )
}
