import React from 'react'
import {BASE_URL} from '../../api-urls'

const MovieHeader = (props)=>{

    return (
        <nav className="nav">
            <a className="nav-link active" href={props.url[0]}>Movies</a>
            <a className="nav-link" href={props.url[1]}>Halls</a>

        </nav>
    )
}

export default MovieHeader