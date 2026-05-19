import { useState } from 'react'
import './App.css'
import ChatCategoryTabs from './components/chat/ChatCategoryTabs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="p-10">
        <ChatCategoryTabs />
      </div>
    </>
  )
}

export default App
