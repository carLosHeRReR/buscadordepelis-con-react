import { useState } from "react"

export const BuscadorPeliculas = () => {
  
  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = '3e977a86c1c7ae8946502b47c45166ae'

  const [busqueda, setBusqueda] = useState('')
  const [peliculas, setpeliculas] = useState([])

  const handleInputChange = (e) => {
    setBusqueda(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPeliculas()
  }

  const fetchPeliculas = async () => {
    try {
        const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
        const data = await response.json()
        setpeliculas(data.results)
    }catch (error) {
        console.error('Pero que ah pasao: ', error)
    }
  };

  return (
    <div className="container">

        <h1 className="tittle">Buscador de Películas </h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Busca alguna pelicula" 
            value={busqueda} onChange={handleInputChange} />
            <button type="submit" className="search-button">Buscar</button>
        </form>

        <div className="movie-list">
            {peliculas.map((pelicula) => (
                <div key={pelicula.id} className="movie-card">
                    <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                    <h2>{pelicula.title}</h2>
                    <p>{pelicula.overview}</p>
                </div>
            ))}
        </div>
    </div>
  )
}