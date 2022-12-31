import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import alakazam from '../images/alakazam.png';
import '../styles/error.css'

const Error = () => {
    return (
        <>
            <div className="p-4">
                <div className='flexy'>
                    <img className='error-page-img' src={alakazam} alt="" />
                </div>
                <div className='error404 flexy'>404</div>
                <div className='error-text flexy'>
                    This page is Not Available
                </div>
                <div className='flexy mt-4'>
                <Link exact to='/' className="py-2 px-4 rounded cursor-pointer btn-primary">Teleport</Link>
                </div>
            </div>
        </>
    )
}

export default Error