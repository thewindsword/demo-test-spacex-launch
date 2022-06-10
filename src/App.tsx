import { useState } from 'react'
import {
  useQuery,
  gql
} from "@apollo/client";
import logoSVG from './logo.svg'
import './App.css'

function App() {
  const { loading, error, data } = useQuery(GET_LAUNCHES)
  
  console.log('data: ', data);
  
  return (
    <div className="App">
      {/* <header className="App-header">
        Hello World
      </header> */}
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
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900"> Home </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900"> Launches </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

const GET_LAUNCHES = gql`
  query {
    launches(limit: 10) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        rocket_type
      }
      launch_success
      details
    }
  }  
`;

export default App
