
import { Link, Outlet } from 'react-router-dom'
import logoSVG from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="App h-screen flex flex-col">
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Spacex</span>
                <img className="h-8 w-auto sm:h-10" src={logoSVG} alt="logo" />
              </a>
            </div>

            <nav className="md:flex space-x-10 lg:flex-2">
              <Link to="/" className="text-base font-medium text-gray-500 hover:text-gray-900"> Home </Link>
              <Link to="launches" className="text-base font-medium text-gray-500 hover:text-gray-900"> Launches </Link>
            </nav>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default App
