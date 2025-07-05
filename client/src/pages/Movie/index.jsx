import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { showLoading, hideLoading } from '../../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import { getAllTheatresByMovie } from '../../apicalls/show'
import { getMovieById } from '../../apicalls/movie'
import { Input, Divider, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";


function Movie () {
    // const [ searchParams, setSearchParams ] = useSearchParams()
    console.log('movie component')
    const [ searchParams ] = useSearchParams()
    const { movieId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // declare date as state variable as this component has to re render on date change
    const [ date, setDate ] = useState(moment(searchParams.get('date')).format("YYYY-MM-DD"))
    const [ movie, setMovie ] = useState(null)
    const [ theatres, setTheatres ] = useState([])

    

    //api call for movie details
    useEffect(() => {
        const getMovie = async () => {
            try{
                dispatch(showLoading())
                const res = await getMovieById(movieId)
                if (res.success){
                    setMovie(res.data)
                } else{
                    alert(res.message)
                }
                dispatch(hideLoading())
            } catch(e) {
                alert(e.message)
            }
        }
        getMovie()
    }, [])

    //api call for theatre details on date
    useEffect(() => {
        const getAllTheatres = async () => {
            try{
                dispatch(showLoading())
                console.log('all theatres from client')
                const res = await getAllTheatresByMovie(movieId, date)
                if (res.success){
                    setTheatres(res.data)
                } else{
                    alert("No movies showing on this date")
                }
                dispatch(hideLoading())
            } catch(e) {
                alert(e.message)
            }
        }
        getAllTheatres()
    }, [date])

    console.log('date from movie page', date, movieId)

    const handleDate = (e) => {
        setDate(moment(e.target.value)).format("YYYY-MM-DD");
        navigate(`/movie/${params.movieId}?date=${e.target.value}`);
  };


    return (
      <>
        <div className="inner-container">
          {movie && (
            <div className="d-flex single-movie-div">
              <div className="flex-Shrink-0 me-3 single-movie-img">
                <img src={movie.poster} width={150} alt="Movie Poster" />
              </div>
              <div className="w-100">
                <h1 className="mt-0">{movie.title}</h1>
                <p className="movie-data">
                  Language: <span>{movie.language}</span>
                </p>
                <p className="movie-data">
                  Genre: <span>{movie.genre}</span>
                </p>
                <p className="movie-data">
                  Release Date:{" "}
                  <span>{moment(movie.date).format("MMM Do YYYY")}</span>
                </p>
                <p className="movie-data">
                  Duration: <span>{movie.duration} Minutes</span>
                </p>
                <hr />
                <div className="d-flex flex-column-mob align-items-center mt-3">
                  <label className="me-3 flex-shrink-0">Choose the date:</label>
                  <Input
                    onChange={handleDate}
                    type="date"
                    min={moment().format("YYYY-MM-DD")}
                    className="max-width-300 mt-8px-mob"
                    value={date}
                    placeholder="default size"
                    prefix={<CalendarOutlined />}
                  />
                </div>
              </div>
            </div>
          )}
          {theatres.length === 0 && (
            <div className="pt-3">
              <h2 className="blue-clr">
                Currently, no theatres available for this movie!
              </h2>
            </div>
          )}
          {theatres.length > 0 && (
            <div className="theatre-wrapper mt-3 pt-3">
              <h2>Theatres</h2>
              {theatres.map((theatre) => {
                return (
                  <div key={theatre._id}>
                    <Row gutter={24} key={theatre._id}>
                      <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                        <h3>{theatre.name}</h3>
                        <p>{theatre.address}</p>
                      </Col>
                      <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                        <ul className="show-ul">
                          {theatre.shows
                            .sort(
                              (a, b) =>
                                moment(a.time, "HH:mm") -
                                moment(b.time, "HH:mm")
                            )
                            .map((singleShow) => {
                              return (
                                <li
                                  key={singleShow._id}
                                  onClick={() =>
                                    navigate(`/book-show/${singleShow._id}`)
                                  }
                                >
                                  {moment(singleShow.time, "HH:mm").format(
                                    "hh:mm A"
                                  )}
                                </li>
                              );
                            })}
                        </ul>
                      </Col>
                    </Row>
                    <Divider />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
}
export default Movie