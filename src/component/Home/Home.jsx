import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HomeStyle from './Home.module.css'
import { FaStar, FaCalendarDay, FaPlay, FaTimesCircle, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import ReactPlayer from "react-player";
import $ from 'jquery'
export default class Home extends Component {

    constructor() {
        super()
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
            }, caursl: [], tv: [], movies: [], all: [], roundom: [], popularTv: [], popularMovie: [], path: "tv", trailerbacgd: '', youtubeKey: '', playVideo: "none", videoStatus: false, item: '', caurslImgArr: [],
        }
    }
    componentDidMount() {
        this.getTrending('all', 'day');
        this.getTrending('movie', 'day');
        this.getTrending('tv', 'day');
        this.getPopular('tv', 'popularTv');
        this.getPopular('movie', 'popularMovie');
        this.getTrendingCarsul('all', 'day');
    }
    getTrending = async (trendingType, time) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${trendingType}/${time}?api_key=52bbcddeda849047525b51d6f8a12361`)
        this.setState({ [trendingType]: data.results });
        this.setState({ trailerbacgd: data.results[0].backdrop_path });
        if (trendingType === 'all') {
            data.results.slice(0, 10).map(item => this.state.caurslImgArr.push(`https://image.tmdb.org/t/p/original${item.backdrop_path}`))
        }
    }
    getTrendingCarsul = async (trendingType, time) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${trendingType}/${time}?api_key=52bbcddeda849047525b51d6f8a12361`)
        this.setState({ caursl: data.results });
    }

    getPopular = async (popularType, popularState) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${popularType}/popular?api_key=52bbcddeda849047525b51d6f8a12361`);
        this.setState({ [popularState]: data.results });
        this.setState({ roundom: this.state.popularTv })
    }
    setPopular = async (type) => {

        if (type === "tv") {
            this.setState({ path: "tv", roundom: this.state.popularTv });
        } else if (type === "movies") {
            this.setState({ path: "movie", roundom: this.state.popularMovie });

        }
    }
    getPopularDitails = (e) => {
        localStorage.setItem("id", e.target.id);
        localStorage.setItem("type", e.target.name);

    }
    getYotubeVideo = async (type, id) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=52bbcddeda849047525b51d6f8a12361`);
        this.setState({ youtubeKey: data.results[0].key });
        this.setState({ playVideo: "flex" })
        this.setState({ videoStatus: true })
    }
    changeBG = (bg) => {
        $('#tarilarBG').css('background-image', `url(https://image.tmdb.org/t/p/original${bg})`);
    }
    render() {

        return (
            <>
                {/* header section */}
                <OwlCarousel className='owl-theme' loop width="100%" nav items="1" autoplay dotsContainer="false" navContainer="false"  >
                    <section className={`${HomeStyle.header} `}>
                        {this.state.all.slice(3, 4)?.map((value, index) => {
                            return (
                                <div key={index} className="w-100 h-100">
                                    <div className="h-100" style={{ backgroundImage: `url(${'https://image.tmdb.org/t/p/original' + value?.backdrop_path})`, backgroundSize: `cover`, backgroundPosition: `center center` }}></div>
                                </div>
                            )
                        })}
                        <div className="layer">
                            {this.state.all.slice(3, 4)?.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <div className="h-100 header_caption  container-fluid">
                                            <h1 className="main_color font-weight-bold top_down"> {value?.name} {value?.title}</h1>
                                            <div className={`container-fluid row top_down delay_2`}>
                                                <div className="d-flex ">
                                                    <FaStar className={`${HomeStyle.icon}  mr-1`} />
                                                    <p className="mr-3">{value?.vote_average}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <FaCalendarDay className={`${HomeStyle.icon}  mr-1`} />
                                                    <p className="ml-1 ">{value?.first_air_date}</p>
                                                </div>

                                            </div>


                                            <p className="w-50 top_down delay_4 text-muted">{value.overview}</p>
                                            <div className="top_down delay_6">
                                                <NavLink to={`/details/${value?.title}`}>
                                                    <button id={value?.id} name={this.state.path} className="btn btn-hover" onClick={() => { this.props.test(value); this.props.mediaType(value?.media_type); this.props.getpath(value?.title); }}> <span name={this.state.path} id={value?.id}>SEE MORE</span></button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </section>

                    <section className={`${HomeStyle.header} `}>
                        {this.state.all?.slice(0, 1)?.map((value, index) => {
                            return (
                                <div key={index} className="w-100 h-100">
                                    <div className="h-100" style={{ backgroundImage: `url(${'https://image.tmdb.org/t/p/original' + value?.backdrop_path})`, backgroundSize: `cover`, backgroundPosition: `center center` }}></div>
                                </div>
                            )
                        })}
                        <div className="layer">
                            {this.state.all?.slice(0, 1)?.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <div className="h-100 header_caption  container-fluid">
                                            <h1 className="main_color font-weight-bold top_down"> {value?.name} {value?.title}</h1>
                                            <div className={`container-fluid row top_down delay_2`}>
                                                <div className="d-flex ">
                                                    <FaStar className={`${HomeStyle.icon}  mr-1`} />
                                                    <p className="mr-3">{value?.vote_average}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <FaCalendarDay className={`${HomeStyle.icon}  mr-1`} />
                                                    <p className="ml-1">{value?.first_air_date}</p>
                                                </div>

                                            </div>


                                            <p className="w-50 top_down delay_4 text-muted">{value?.overview}</p>
                                            <div className="top_down delay_6">
                                                <NavLink to={`/details/${value?.title}`}>
                                                    <button id={value?.id} name={this.state.path} className="btn btn-hover" onClick={() => { this.props.test(value); this.props.mediaType(value?.media_type); this.props.getpath(value?.title); }}> <span name={this.state.path} id={value.id}>SEE MORE</span></button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </section>



                    <section className={`${HomeStyle.header} `}>
                        {this.state.all?.slice(2, 3)?.map((value, index) => {
                            return (
                                <div key={index} className="w-100 h-100">
                                    <div className="h-100" style={{ backgroundImage: `url(${'https://image.tmdb.org/t/p/original' + value?.backdrop_path})`, backgroundSize: `cover`, backgroundPosition: `center center` }}></div>

                                </div>
                            )
                        })}
                        <div className="layer">
                            {this.state.all?.slice(2, 3)?.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <div className="h-100 header_caption  container-fluid">
                                            <h1 className="main_color font-weight-bold top_down"> {value?.name} {value?.title}</h1>
                                            <div className={`container-fluid row top_down delay_2`}>
                                                <div className="d-flex ">
                                                    <FaStar className={`${HomeStyle.icon}  mr-1`} />
                                                    <p className="mr-3">{value?.vote_average}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <FaCalendarDay className={`${HomeStyle.icon}  mr-1`} />
                                                    <p className="ml-1">{value?.first_air_date}</p>
                                                </div>

                                            </div>


                                            <p className="w-50 top_down delay_4 text-muted">{value?.overview}</p>
                                            <div className="top_down delay_6">
                                                <NavLink to={`/details/${value?.title}`}>
                                                    <button id={value?.id} name={this.state.path} className="btn btn-hover" onClick={() => { this.props.test(value); this.props.mediaType(value?.media_type); this.props.getpath(value?.title); }}> <span name={this.state.path} id={value?.id}>SEE MORE</span></button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </section>

                    <section className={`${HomeStyle.header} `}>
                        {this.state.all?.slice(4, 5)?.map((value, index) => {
                            return (
                                <div key={index} className="w-100 h-100">
                                    <div className="h-100" style={{ backgroundImage: `url(${'https://image.tmdb.org/t/p/original' + value?.backdrop_path})`, backgroundSize: `cover`, backgroundPosition: `center center` }}></div>
                                </div>
                            )
                        })}
                        <div className="layer">
                            {this.state.all?.slice(4, 5)?.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <div className="h-100 header_caption  container-fluid">
                                            <h1 className="main_color font-weight-bold top_down"> {value?.name} {value?.title}</h1>
                                            <div className={`container-fluid row top_down delay_2`}>
                                                <div className="d-flex ">
                                                    <FaStar className={`${HomeStyle.icon}  mr-1`} />
                                                    <p className="mr-3">{value?.vote_average}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <FaCalendarDay className={`${HomeStyle.icon}  mr-1`} />
                                                    <p className="ml-1">{value?.first_air_date}</p>
                                                </div>

                                            </div>


                                            <p className="w-50 top_down delay_4 text-muted">{value?.overview}</p>
                                            <div className="top_down delay_6">
                                                <NavLink to={`/details/${value?.title}`}>
                                                    <button id={value?.id} name={this.state.path} className="btn btn-hover" onClick={() => { this.props.test(value); this.props.mediaType(value?.media_type); this.props.getpath(value?.title); }}> <span name={this.state.path} id={value?.id}>SEE MORE</span></button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </section>



                </OwlCarousel>
                {/* popular section */}
                <div className="container mt-5 ">


                    <div className="popular">
                        <div className="row w-100 d-flex align-items-center mb-3">
                            <h5 className="font-weight-bold mx-3">WHAT's POPULAR</h5>
                            <div className="popular_actions ml-3">


                                <div className="btn-group btn-group-toggle " data-toggle="buttons">
                                    <label className="btn  active" >
                                        <input onClick={() => { this.setPopular('tv') }} type="radio" name="options" id="tv" defaultChecked /> ON TV
                                    </label>
                                    <label className="btn">
                                        <input onClick={() => { this.setPopular('movies') }} type="radio" name="options" id="movies" />IN THEATERS
                                    </label>

                                </div>


                            </div>
                        </div>



                        <OwlCarousel className='owl-theme vh-50' loop nav autoplay dotsContainer="false" navContainer="false" slideBy="4" responsive={this.state.responsive}>

                            {this.state.roundom.map((value, index) => {
                                if (value.title === undefined) {
                                    value.title = value.name;
                                }
                                return (
                                    <NavLink to={`/details/${value.title}`} key={index} className="w-100 vh-50 ">

                                        <button onClick={() => { this.props.test(value); this.props.mediaType(this.state.path); this.props.getpath(value.title); }} className="bg-transparent border-0" >
                                            <div className="item position-relative">
                                                <div className="popular-img position-relative overflow-hidden">
                                                    <img id={value.id} name={this.state.path} className="w-100 vh-40 overflow-hidden" src={'https://image.tmdb.org/t/p/original' + value.poster_path} alt="img" />
                                                    <span className={`vote`}>
                                                        <div className="position-relative d-flex justify-content-center align-items-center">
                                                            <FaStar id={value.id} name={this.state.path} className={`vote_icon`} />
                                                            <div id={value.id} name={this.state.path} className={`centring`}>{value.vote_average}</div>

                                                        </div>
                                                    </span>
                                                    {/* <FaStar className="love_icon"></FaStar> */}
                                                </div>
                                                <h6 id={value.id} name={this.state.path} className="mt-2 text-white"> {value.title} </h6>
                                            </div>
                                        </button>
                                    </NavLink>
                                )

                            })}
                        </OwlCarousel>

                    </div>






                </div>

                {/* tarilar section  */}
                <div id="tarilarBG" className=" my-5 vh-50  d-flex align-items-center flex-column justify-content-center smooth"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${this.state.trailerbacgd})`, backgroundSize: "cover", }}
                >
                    <div className="w-100 text-left my-2 container">
                        <h5 className="font-weight-bold">LATEST TRAILERS</h5>
                    </div>
                    {this.state.all.length && (
                        <OwlCarousel className='container owl-theme  w-100 ' loop width="100%" padding={0} nav dotsContainer="false" navContainer="false" responsive={this.state.responsive}>
                            {this.state.all.slice(0, 10)?.map((value, index) => {
                                return (
                                    <button onClick={() => { this.setState({ item: value.title }); this.getYotubeVideo(value.media_type, value.id) }} key={index} className="btn w-100 p-0 m-0 overflow-hidden" onMouseEnter={() => { this.changeBG(value.backdrop_path) }} onTouchMove={() => { this.changeBG(value.backdrop_path) }}>
                                        <div className="w-100 p-0 m-0 rounded position-relative overflow-hidden">
                                            <div className={` position-relative d-flex justify-content-center align-items-center overflow-hidden ${HomeStyle.img_hover}`}>
                                                <img className="w-100 h-100 rounded overflow-hidden" src={this.state.caurslImgArr[index]} alt="img" />
                                                <FaPlay className={`${HomeStyle.img_icon}`}></FaPlay>
                                            </div>
                                            <h6 className="text-white font-weight-bold">{value.title} {value.name}</h6>
                                        </div>
                                    </button>
                                )
                            })}
                        </OwlCarousel>

                    )}

                </div>

                {/* video player popup */}
                <div className={`${HomeStyle.youtube_video}`} style={{ display: `${this.state.playVideo}` }}>
                    <div className={`text-left  m-0 p-2 ${HomeStyle.youtube_heder}`}>
                        <h4 className="m-0 p-0">{this.state.item}</h4>
                        <button className="btn m-0 p-0" onClick={() => { this.setState({ playVideo: "none" }); this.setState({ videoStatus: false }); }}><FaTimesCircle className={`${HomeStyle.icon2}`}></FaTimesCircle></button>

                    </div>
                    <ReactPlayer
                        className={` rounded-bottom  p-0 m-0    ${HomeStyle.youtube_play}`}
                        controls
                        url={`https://www.youtube.com/watch?v=${this.state.youtubeKey}`}
                        playing={this.state.videoStatus}

                    >

                    </ReactPlayer>
                </div>

                {/* TRENDING section */}
                <div className="container mt-5 ">


                    <div className="popular">
                        <div className="row w-100 d-flex align-items-center mb-3">
                            <h5 className="font-weight-bold mx-3">TRENDING</h5>
                            <div className="popular_actions ml-3">


                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className="btn  active" >
                                        <input onClick={() => { this.getTrendingCarsul('all', 'day') }} type="radio" name="options" id="tv" defaultChecked />TODAY
                                    </label>
                                    <label className="btn">
                                        <input onClick={() => { this.getTrendingCarsul('all', 'week') }} type="radio" name="options" id="movies" />THIS WEEK
                                    </label>

                                </div>


                            </div>
                        </div>
                        <OwlCarousel className='owl-theme vh-50' loop nav items="4" autoplay dotsContainer="false" navContainer="false" slideBy="4" responsive={this.state.responsive}>
                            {this.state.caursl?.map((value, index) => {
                                return (
                                    <NavLink to={`/details/${value.title}`} key={index} className="w-100 vh-50 ">
                                        {value.title === undefined && (value.title = value.name)}
                                        <button onClick={() => { this.props.test(value); this.props.mediaType(value.media_type); this.props.getpath(value.title); }} className="bg-transparent border-0" >
                                            <div className="item position-relative">
                                                <div className="popular-img position-relative overflow-hidden">
                                                    <img id={value.id} name={this.state.path} className="w-100 vh-40 overflow-hidden" src={'https://image.tmdb.org/t/p/original' + value.poster_path} alt="img" />
                                                    <span className={`vote`}>
                                                        <div className="position-relative d-flex justify-content-center align-items-center">
                                                            <FaStar id={value.id} name={this.state.path} className={`vote_icon`} />
                                                            <div id={value.id} name={this.state.path} className={`centring`}>{value.vote_average}</div>

                                                        </div>
                                                    </span>
                                                </div>
                                                <h6 id={value.id} name={this.state.path} className="mt-2 text-white"> {value.title} </h6>
                                            </div>
                                        </button>
                                    </NavLink>
                                )

                            })}
                        </OwlCarousel>

                    </div>






                </div>
                {/* footer */}
                <footer className="mt-5 w-100">
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-md-9">
                                <h5 className="mb-3 main_color">ABOUT ME</h5>
                                <p className="text-muted">I am studying engineering in the software engineering department of the Egyptian Chinese University. <br />I have 4 months of experience with front-end development. </p>
                            </div>
                            <div className="col-md-3">
                                <h5 className="mb-3 main_color">KEEP In TOUTCH </h5>
                                <p className="text-muted">Phone: +01064598472</p>
                                <p className="text-muted">E-mail: asdddghjh@gmail.com</p>
                                <p className="text-muted">abdelrahmanabdallah9800@gmail.com</p>
                                <div className=" d-flex justify-content-between align-items-center col-5  p-0">
                                    <a href="https://www.facebook.com/abdelrahman.elsherif.397?_rdc=1&_rdr" target="_blank" rel="noreferrer" ><FaFacebookF className={`text-muted ${HomeStyle.social}`} ></FaFacebookF></a>
                                    <a href="https://www.linkedin.com/in/abdelrahman-abdallah-85b5481ab/" target="_blank" rel="noreferrer" ><FaLinkedinIn className={`text-muted ${HomeStyle.social}`}></FaLinkedinIn></a>
                                    <a href="https://www.instagram.com/abdo_code/?hl=en" target="_blank" rel="noreferrer" ><FaInstagram className={`text-muted ${HomeStyle.social}`}></FaInstagram></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>



            </>
        )
    }
}
