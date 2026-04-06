import React, { useMemo, useState } from 'react'
import { layoutClasses, SORT_OPTIONS } from '../assets/dummy'
import { ListCheck,Filter,Plus, Clock } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import TaskItem from '../components/TaskItem'
import TaskModal from '../components/TaskModal'


const PendingPage = () => {

   const {tasks =[], refreshTasks}= useOutletContext();
  const [sortBy,setSortBy]= useState('newest')
  const [selectedTask,setSelectedTask]=useState(null)
  const [showModal, setShowModal] =useState(false)

  const sortedPendingTasks =useMemo(()=>{
    const filtered = tasks.filter(
      (t)=>!t.completed || (typeof t.completed === 'string' &&
        t.completed.toLowerCase()==='no'
      )
    )
    return filtered.sort((a,b)=>{
      if(sortBy==='newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if(sortBy==='oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      const order = {high: 3, medium: 2, low:1};
      return order[b.priority.toLowerCase()]- order[a.priority.toLowerCase()]
    },[tasks])
  
  return (
    <div className={layoutClasses.container}>
     <div className={layoutClasses.headerWrapper}>
      <div>
        
      </div>
     </div>
    </div>
  )
}

export default PendingPage