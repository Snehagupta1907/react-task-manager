
import './App.css'
import Navbar from './components/Navbar'
import Todo from './components/Todo'


function App() {


  return (
    <div className='dark:bg-gray-900 min-h-screen'>
    <Navbar/>
      <Todo/>
    </div>
  )
}

export default App
