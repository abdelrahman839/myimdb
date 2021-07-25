import React, { Component } from 'react'
import ONEStyle from './OneMovieTv.module.css'
import { FaStar, FaPlay, FaTimesCircle } from 'react-icons/fa'
import axios from 'axios'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { NavLink } from 'react-router-dom';
import ReactPlayer from "react-player";
export default class OneMovieTv extends Component {
  constructor() {
    super();
    this.state = {
      responsive: {
        0: {
          items: 2,
        },
        450: {
          items: 2,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 4,
        },
      }, simelar: [], check: 0, item: [], cast: [], type: '', youtubeKey: '', playVideo: "none", videoStatus: false
    };
  }
  favourite = () => {
    if (this.state.check == 0) {
      this.state.check = 1;
      console.log(this.state.item);
      return this.state.item;
    } else {
      this.state.check = 0;
    }
  }
  test = (t) => {
    console.log(t);
  }
  componentDidMount() {
    this.getCast(this.state.type);
    this.getSimilar();
  }
  getCast = async (type) => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${this.state.item[0].id}/credits?api_key=52bbcddeda849047525b51d6f8a12361`);
    this.setState({ cast: data.cast });
  }
  getSimilar = async () => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${this.state.item[0].id}/similar?api_key=52bbcddeda849047525b51d6f8a12361`);
    this.setState({ simelar: data.results });
  }
  getYotubeVideo = async () => {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${this.state.type}/${this.state.item[0].id}/videos?api_key=52bbcddeda849047525b51d6f8a12361`);
    this.setState({ youtubeKey: data.results[0].key });
    this.setState({ playVideo: "flex" })
    this.setState({ videoStatus: true })
  }

  render() {
    this.state.type = this.props.Type;
    this.state.item = this.props.MTV;
    return (
      <>
        <div className={`${ONEStyle.youtube_video}`} style={{ display: `${this.state.playVideo}` }}>
          <div className={`text-left  m-0 p-2 ${ONEStyle.youtube_heder}`}>
            <h4 className="m-0 p-0">{this.state.item[0].title}</h4>
            <button className="btn m-0 p-0" onClick={() => { this.setState({ playVideo: "none" }); this.setState({ videoStatus: false }); }}><FaTimesCircle className={`${ONEStyle.icon}`}></FaTimesCircle></button>

          </div>
          <ReactPlayer
            className={` rounded-bottom  p-0 m-0 ${ONEStyle.youtube_play}`}
            controls
            url={`https://www.youtube.com/watch?v=${this.state.youtubeKey}`}
            playing={this.state.videoStatus}

          >

          </ReactPlayer>
        </div>

        {this.state.item.map((value, index) => {
          if (value.title === undefined) {
            value.title = value.name;
          }
          return (
            <section key={index} className={`${ONEStyle.header} `} style={{ backgroundImage: `url(${'https:image.tmdb.org/t/p/original' + value.backdrop_path})`, backgroundSize: `cover`, backgroundPosition: `center center` }} >
              <div className="layer justify-content-center">
                <div className="row h-90 w-100 container d-flex justify-content-center align-items-center">
                  <div className="col-md-3 h-100 p-0  my-3 popular-img position-relative overflow-hidden trns-right  activee">
                    <img className="w-100 h-100 rounded " src={'https:image.tmdb.org/t/p/original' + value.poster_path} />
                    <span className={`vote py-2`}>
                      <div className="position-relative d-flex justify-content-center align-items-center">
                        <FaStar id={value.id} name={this.state.path} className={`vote_icon`} />
                        <div id={value.id} name={this.state.path} className={`centring`}>{value.vote_average}</div>

                      </div>
                    </span>
                  </div>
                  <div className="col-md-9 h-100 px-5 trns-left">
                    <h1 className="main_color font-weight-bold mt-3"> {value.title} </h1>
                    <h3>OVERVIEW</h3>
                    <p className="text-muted ">{value.overview}</p>
                    <div className="d-flex justify-content-start align-items-center">
                      <button onClick={this.getYotubeVideo} className="btn btn-hover mr-3"> <span className="d-flex justify-content-center align-items-center"><FaPlay /> PLAY TRAILAR</span></button>
                    </div>

                  </div>
                </div>
              </div>
            </section>

          )
        })}




        <div className="container  my-5">
          <h2>CAST</h2>
          {this.state.cast.length && (
            <OwlCarousel className='owl-theme  w-100 ' loop margin={10} padding={0} nav items="4" slideBy="4" autoplay dotsContainer="false" navContainer="false" responsive={this.state.responsive}>
              {this.state.cast.slice(0, 10).map((value, index) => {
                return (
                  <NavLink to="/perosn" key={index} className="w-100 " >
                    <button className="btn w-100 " onClick={() => {
                      this.props.cast(value);
                    }}>
                      <div className="w-100 h-100  chracter rounded-circle position-relative overflow-hidden bg-danger ">
                        <img className="w-100 h-100 rounded-circle " src={'https:image.tmdb.org/t/p/original' + value.profile_path} />
                        <div className="chracter-caption text-white rounded-circle  w-100 h-100 text-center position-absolute d-flex justify-content-center align-items-center flex-column">
                          <h6>{value.name}</h6>
                          <p>{value.character}</p>
                        </div>


                      </div>
                    </button>
                  </NavLink>
                )
              })}
            </OwlCarousel>

          )}



        </div>


        <div className="container mt-5 ">


          <div className="popular">
            <div className="row w-100 d-flex align-items-center mb-3">
              <h5 className="font-weight-bold mx-3">RECOMMENDADIONS </h5>

            </div>
            {this.state.simelar.length && (
              <OwlCarousel className='owl-theme vh-50' loop nav items="4" autoplay dotsContainer="false" navContainer="false" slideBy="4" responsive={this.state.responsive}>

                {this.state.simelar.map((value, index) => {
                  if (value.title === undefined) {
                    value.title = value.name;
                  }
                  return (
                    <NavLink to={`/details/${value.title}`} key={index} className="w-100 vh-50 ">

                      <button onClick={() => { this.props.test(value); this.props.mediaType(value.media_type); this.props.getpath(value.title); this.getCast('movie'); this.getSimilar(); }} className="bg-transparent border-0" >
                        <div className="item position-relative">
                          <div className="popular-img position-relative overflow-hidden">
                            <img className="w-100 vh-40 overflow-hidden" src={'https://image.tmdb.org/t/p/original' + value.poster_path} alt="" />
                            <span className={`vote`}>
                              <div className="position-relative d-flex justify-content-center align-items-center">
                                <FaStar className={`vote_icon`} />
                                <div className={`centring`}>{value.vote_average}</div>

                              </div>
                            </span>
                          </div>
                          <h6 className="mt-2 text-white"> {value.title} </h6>
                        </div>
                      </button>
                    </NavLink>
                  )

                })}
              </OwlCarousel>

            )}


          </div>






        </div>





      </>
    )
  }
}
