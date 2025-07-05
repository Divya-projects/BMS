import { useState, useEffect } from "react"
import { getAllMovies } from "../../apicalls/movie"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { hideLoading, showLoading } from "../../redux/loaderSlice"
import { SearchOutlined } from "@ant-design/icons"
import moment from "moment"
import { Col, Row, Input } from "antd"

function Home () {
    const [ movies, setMovies ] = useState(null)
    const [ searchText, setSearchText ] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log('Home useEffect')
    useEffect(() => {
        const getData = async () => {
            try{
                dispatch(showLoading())
                const res = await getAllMovies()
                if (res.success){
                    setMovies(res.data)
                }
                else{
                    setMovies(null)
                }
                dispatch(hideLoading())
            } catch(err){
                console.log('error from getMovies home page', err.message)
                dispatch(hideLoading())
            }
        }
        getData()
    }, [])

    function handleSearch(e) {
        setSearchText(e.target.value)
    }
    
    function redirectToMoviesPage(movieId){
        navigate(`/movies/${movieId}?date=${moment().format("YYYY-MM-DD")}`)
    }


      if (!movies) return <h1>Loading...</h1>;
  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            placeholder="Type here to search for movies"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
        </Col>
        <br />
        <br />
        <br />
      </Row>
      <Row
        style={{ justifyContent: "center" }}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        {movies &&
          movies
            .filter((movie) =>
              movie.movieName.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((movie) => {
              return (
                <Col
                  className="gutter-row mb-5"
                  key={movie._id}
                  span={{ xs: 24, sm: 24, md: 12, lg: 10 }}
                >
                  <div
                    className="text-center"
                    role="button"
                    onClick={() => redirectToMoviesPage(movie._id)}
                  >
                    <img
                      src={movie.poster}
                      alt="Movie Poster"
                      width={200}
                      style={{ borderRadius: "8px" }}
                    />
                    <h3>{movie.movieName}</h3>
                  </div>
                </Col>
              );
            })}
      </Row>
    </>
  );
}
export default Home