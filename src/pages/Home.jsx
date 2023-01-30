import { useState, useEffect } from 'react'
import axios from 'axios'
import './Home.css'
import { Link } from 'react-router-dom'


export default function Home() {
  const [projects, setProjects] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const maxLength = 150;
  const url = `http://127.0.0.1:8000/api/projects?page=${currentPage}`

  // fetching data 
  useEffect(() => {
    axios.get(url).then(resp => {
      setProjects(resp.data.results.data);
      setLastPage(resp.data.results.last_page);
    })
  }, [url])

  return (
    <div className="Home">
      <div className="container">
        <h2 className="text-3xl font-bold my-8 text-center">Our Project List:</h2>

        {/* projects  */}
        {projects && projects.map((proj) => (
          <div className='p-6 mb-2 border-2 rounded shadow-md w-1/2 m-auto' key={proj.id}>

            {/* title and project type  */}
            <h2 className="text-2xl font-bold text-center mb-2">{proj.title}</h2>
            <p className='text-md text-gray-600 font-bold text-center mb-2'>{proj.type.name}</p>

            {/* technologies for the projects */}
            {projects && proj.technologies.map((tech) => (
              <div className='text-gray-600 inline-flex mb-2' key={tech.id}>#{tech.name}</div>
            ))}

            {/* description with a max lenght  */}
            {proj.description.length > maxLength ? (<p className='mb-5'>{proj.description.substring(0, maxLength) + '...'}</p>) : (<p className='mb-2'>{proj.description}</p>)}

            {/* link for the sigle project */}
            <div className='text-center mt-2'>
              <Link className='p-2 bg-blue-600 rounded text-white' to={`/project/${proj.slug}`}> See More</Link>
            </div>
          </div>
        ))}

        {/* prev and next buttons */}
        <div className='flex justify-center mt-4 mb-8'>
          <button
            onClick={() => { setCurrentPage(currentPage - 1) }}
            disabled={currentPage === 1}
            className='p-2 bg-blue-600 rounded text-white mr-2 cursor-pointer'
          >Prev
          </button>

          <button
            onClick={() => { setCurrentPage(currentPage + 1) }}
            disabled={currentPage == lastPage}
            className='p-2 bg-blue-600 rounded text-white cursor-pointer'
          >next
          </button>
        </div>
      </div>
    </div>
  )
}
