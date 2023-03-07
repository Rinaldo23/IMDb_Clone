import React, { useEffect, useState } from 'react'
import DownArrow from '../down-arrow.png'
import Pagination from './Pagination'

function Favourites() {

  let genreids = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV',
    53: 'Thriller', 10752: 'War', 37: 'Western'
  };

  const [currGenre, setCurrGenre] = useState("All Genre")
  const [favourites, setFavourites] = useState([])
  const [genres, setGenre] = useState([])
  const [rating, setRating] = useState(0)
  const [popularity, setPopularity] = useState(0)
  const [search, setSearch] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [rows, setRows] = useState(4)

  let filteredMovies = []
  filteredMovies = favourites.filter((movie) => currGenre === "All Genre" ? favourites : genreids[movie.genre_ids[0]] === currGenre)

  if (rating === 1) {
    filteredMovies = filteredMovies.sort((a, b) => {
      return a.vote_average - b.vote_average
    })
  } else if (rating === -1) {
    filteredMovies = filteredMovies.sort((a, b) => {
      return b.vote_average - a.vote_average
    })
  }

  if (popularity === 1) {
    filteredMovies = filteredMovies.sort((a, b) => {
      return a.popularity - b.popularity
    })
  } else if (popularity === -1) {
    filteredMovies = filteredMovies.sort((a, b) => {
      return b.popularity - a.popularity
    })
  }

  filteredMovies = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  let maxPage = Math.ceil(filteredMovies.length / rows)
  let si = (pageNumber - 1) * rows
  let ei = Number(si) + Number(rows)

  filteredMovies = filteredMovies.slice(si, ei)

  let previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  let nextPage = () => {
    if (pageNumber < maxPage) {
      setPageNumber(pageNumber + 1)
    }
  }

  let removeMovie = (movie) => {
    let newArr = favourites.filter((m) => {
      return m.id !== movie.id
    })
    setFavourites([...newArr])
    localStorage.setItem("imdb", JSON.stringify(newArr))
  }

  useEffect(() => {
    let oldFav = localStorage.getItem("imdb")
    oldFav = JSON.parse(oldFav) || []
    setFavourites([...oldFav])
  }, [])

  useEffect(() => {
    let temp = favourites.map((movie) => genreids[movie.genre_ids[0]])
    // console.log(temp)
    temp = new Set(temp)
    setGenre(["All Genre", ...temp])
  }, [favourites])

  return (
    <div className='bg-gray-900 h-[100vh]'>
      <div className='flex justify-center flex-wrap text-white p-2'>
        {
          genres.map((genre) => (
            <button className={
              currGenre === genre ?
                'border m-2 p-1 px-2 rounded-lg font-bold bg-cyan-700' :
                'border m-2 p-1 px-2 rounded-lg font-bold bg-blue-400 hover:bg-cyan-700'
            }
              onClick={() => setCurrGenre(genre)}
            >{genre}</button>
          ))
        }
      </div>

      <div className='text-center'>
        <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}
          className='w-[50vw] md:w-[30vw] lg:w-[25vw] border border-black m-2 rounded-md text-center ' />
        <input type="number" placeholder='Rows' value={rows} onChange={(e) => setRows(e.target.value)}
          className='w-[25vw] md:w-[25vw] lg:w-[10vw] border border-black m-2 rounded-md text-center' />
      </div>

      <div>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-center ">
                  <thead class="bg-gray-600 text-white min-w-full">
                    <tr>
                      <th scope="col" class="text-sm font-medium w-[40vw] px-6 py-4">
                        Name
                      </th>
                      <th scope="col" class="text-sm font-medium px-6 py-4">
                        <div className=' flex justify-center items-center'>
                          <img onClick={() => {
                            setPopularity(0)
                            setRating(-1)
                          }} className='h-[3vh] mr-2 rotate-180 ' src={DownArrow} alt="" />
                          Rating
                          <img onClick={() => {
                            setPopularity(0)
                            setRating(1)
                          }} className='h-[3vh] ml-2 mr-2' src={DownArrow} alt=""/>
                        </div>
                      </th>
                      <th scope="col" class="text-sm font-medium px-6 py-4">
                        <div className=' flex justify-center items-center'>
                          <img onClick={() => {
                            setRating(0)
                            setPopularity(-1)
                          }} className='h-[3vh] mr-2 rotate-180' src={DownArrow} alt=""/>
                          Popularity
                          <img onClick={() => {
                            setRating(0)
                            setPopularity(1)
                          }} className='h-[3vh] ml-2 ' src={DownArrow} alt=""/>
                        </div>
                      </th>
                      <th scope="col" class="text-sm font-medium px-6 py-4">
                        Genre
                      </th>
                      <th scope="col" class="text-sm font-medium px-6 py-4">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-black text-white divide-y divide-gray-200 '>
                    {
                      filteredMovies.map((movie) => (
                        <tr key={movie.id}>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-center'>
                            <div className='flex items-center'>
                              <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}
                                className='border-gray-300 border-2 rounded-full lg:rounded-xl mr-2 lg:mr-6 h-[3vh] w-[3vh] md:h-[5vh] md:w-[5vh] lg:h-[15vh] lg:w-[12vw] bg-center bg-cover' />
                              <div className='font-medium text-base'>{movie.title}</div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-center'>
                            <div>{movie.vote_average}</div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-center'>
                            <div>{movie.popularity}</div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-center'>
                            <div>{genreids[movie.genre_ids[0]]}</div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-center'>
                            <button onClick={() => removeMovie(movie)} className='text-red-600 hover:text-red-900'>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Pagination pageNumber={pageNumber} previousPage={previousPage} nextPage={nextPage} />

    </div>
  )
}

export default Favourites