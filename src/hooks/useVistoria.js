
import { useState } from 'react'
export default function useVistoria() {
  const [address, setAddress] = useState('')
  const [rooms, setRooms] = useState([])
  const addRoom = (room) => { if (room) setRooms(prev => [...prev, room]) }
  const removeRoom = (idx) => setRooms(prev => prev.filter((_, i) => i !== idx))
  return { address, setAddress, rooms, addRoom, removeRoom }
}
