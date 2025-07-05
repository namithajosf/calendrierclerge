// src/pages/PublicDashboard.jsx
import { useEffect, useState } from "react"
import axios from "axios"
import DashboardLayout from "./components/DashboardLayout/DashboardLayout"
import { FaChurch } from "react-icons/fa"

export default function PublicDashboard() {
  const [parishId, setParishId] = useState("")
  const [parishes, setParishes] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/api/parishes/")
      .then(res => setParishes(res.data))
      .catch(err => console.error("Failed to fetch parishes:", err))
  }, [])

  return (
    <DashboardLayout>
      
    </DashboardLayout>
  )
}
