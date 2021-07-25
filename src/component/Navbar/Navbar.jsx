import React, { Component } from 'react'
import NavbarStyle from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import $ from 'jquery'
export default class Navbar extends Component {
    constructor() {
        super();
        this.state = { Search: [], type: 'tv' }
    }
    getSearch = async (e) => {
        if (e.target.value == '') {
            this.setState({ Search: [] })
        } else {
            let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${e.target.value}&api_key=52bbcddeda849047525b51d6f8a12361`);
            this.setState({ Search: data.results });
        }

    }
    arrowDown = (num)=>{
        $(`#arrowDown${num}`).toggle(500)
    }

    render() {
        return (
            <>
                <nav className={`  navbar navbar-expand-lg navbar-dark  fixed-top  ${NavbarStyle.nav_bg}`}>
                    <div className="container ">
                        <NavLink className="navbar-brand font-weight-bold text-white" to="/home"> <span >M </span>Y I <span>M </span> D B </NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse   " id="navbarSupportedContent">

                            <ul className="navbar-nav mr-auto  d-flex align-items-center justify-content-center ">

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/home">HOME</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink  className={`nav-link d-flex align-items-center justify-content-center ${NavbarStyle.movie_hover}`} to={`/movie/${this.props.MoviePath}`}><span className="text-center">MOVIES<FaArrowAltCircleDown onClick={()=>{this.arrowDown(1)}} className={`${NavbarStyle.arrow_hover}`}/>
                                        <div id="arrowDown1" className={`  align-items-center flex-column p-0 rounded ${NavbarStyle.movie_hover_items}`} to="/movie">
                                            <button className="btn text-white" onClick={() => { this.props.movieType('now_playing'); }}>NOW PLAYING</button>
                                            <button className="btn text-white" onClick={() => { this.props.movieType('upcoming'); }}>UPCOMING</button>
                                            <button className="btn text-white" onClick={() => { this.props.movieType('top_rated'); }}>TOP RATED</button>
                                        </div></span></NavLink>

                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link   d-flex align-items-center justify-content-center ${NavbarStyle.movie_hover}`} to={`/tv/${this.props.TvPath}`}><span className=" text-center">SERIES<FaArrowAltCircleDown onClick={()=>{this.arrowDown(2)}} className={`${NavbarStyle.arrow_hover}`}/>
                                        <div id="arrowDown2" className={`  align-items-center flex-column p-0 rounded ${NavbarStyle.movie_hover_items}`} to="/movie">
                                            <button className="btn text-white" onClick={() => { this.props.typeTV('airing_today'); }}>AIRING TODAY</button>
                                            <button className="btn text-white" onClick={() => { this.props.typeTV('top_rated'); }}>TOP RATED</button>
                                        </div></span></NavLink>
                                </li>





                            </ul>
                            <form className="d-flex justify-content-center align-items-center col-md-5 m-0  position-relative">
                                <input className="form-control mx-2 " type="search" placeholder="Search" aria-label="Search" onChange={this.getSearch}></input>
                                <div className="search_list">{this.state.Search.slice(0, 5).map((value, index) => {
                                    return (
                                        <NavLink to={`/details/${value.title}`} key={index} className=" border rounded my-1 p-1 main_colorHover  row   ">
                                            <button className="btn d-flex align-items-center" onClick={() => { this.props.test(value); this.props.mediaType('movie'); ; this.props.getpath(value.title );this.state.Search = []; }}>
                                                <div className="w-7">
                                                    <img src={'https:image.tmdb.org/t/p/original' + value.poster_path} className="w-100 rounded" />
                                                </div>
                                                <div className="col-10 d-flex align-items-center font-weight-bold text-white">
                                                    <h6>{value.name} {value.title}</h6>
                                                </div>
                                            </button>
                                        </NavLink>
                                    )
                                })}</div>


                            </form>

                        </div>
                    </div>

                </nav>

            </>
        )
    }
}
