import React from 'react'
import Logo from '../IMDB.png'
import { Link } from 'react-router-dom'

// NavBar
function NavBar() {
    return (
        <div className='bg-black opacity-100 flex items-center pl-2 md:pl-10 py-1 md:py-2 space-x-2 md:space-x-8'>
            <img src={Logo} alt="IMDb" className='object-cover h-8 md:h-10 m-1 md:m-2 rounded-lg' />
            <Link to='/movies' className='text-white text-md md:text-2xl lg:text-3xl font-bold'>Movies</Link>
            <Link to={'/favourites'} className='text-white text-md md:text-2xl lg:text-3xl font-bold'>Favourites</Link>
        </div>
    )
}

export default NavBar