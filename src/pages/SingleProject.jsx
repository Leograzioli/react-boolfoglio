import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Project() {
    const [project, setProject] = useState([])
    let { slug } = useParams()
    console.log(slug);

    let url = `http://127.0.0.1:8000/api/projects/${slug}`

    // fetching data 
    useEffect(() => {
        axios.get(url).then(resp => {
            setProject(resp.data.results);
            console.log(resp.data.results);
        })
    }, [url])

    return (

        <div className="container">
            <h2 className="text-3xl font-bold my-8 text-center">Project:</h2>
            {/* project  */}
            {project && (<div className='p-6 mb-2 border-2 rounded shadow-md w-1/2 m-auto'>

                {/*  Project title  */}
                <h2 className="text-2xl font-bold text-center mb-2">{project.title}</h2>

                {/* Project type */}
                {project.type && (<p className='text-md text-gray-600 font-bold text-center mb-2'>{project.type.name}</p>)}

                {/* technologies for the project */}
                {project.technologies && project.technologies.map((tech) => (
                    <div className='text-gray-600 inline-flex mb-2' key={tech.id}>#{tech.name}</div>
                ))}

                {/* description */}
                <p>{ project.description }</p>

            </div>
            )}
        </div>
    )
}
