import axios from 'axios'
import React, { Component } from 'react'
import { FaStar } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import MovieStyle from './Movie.module.css'
export default class Movie extends Component {
    getPopular = async (index) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${this.props.MovieType}?api_key=52bbcddeda849047525b51d6f8a12361&page=${index}`);
        let oldData = this.state.Popular;
        this.setState({ Popular: oldData.concat(data.results) })
    }
    updateIndex = () => {
        this.setState({ Index: this.state.Index += 1 });
        this.getPopular(`${this.state.Index}`)
    }
    constructor() {
        super();
        this.state = ({ loadMore: 'none', Index: 1, Popular: [] })
    }

    componentDidMount() {
        this.getPopular(`${this.state.Index}`);
    }
    render() {
        if (this.state.Popular.length != 0) {
            this.state.loadMore = 'block';
        }
        return (
            <>
                <div className="container mt-100">
                    <div className="row">
                        {this.state.Popular.map((value, index) => {
                            return (
                                <NavLink id={`${MovieStyle.header}`} to={`/details/${value.title}`} key={index} className="col-lg-3 col-md-6 col-sm-6   mb-3 trns-down">
                                    <button onClick={() => { this.props.test(value); this.props.mediaType('movie') ; this.props.getpath(value.title );}} className="bg-transparent border-0" >
                                        <div className="item position-relative">
                                            <div className="popular-img position-relative overflow-hidden">
                                                <img id={value.id} name={this.state.path} className="w-100 vh-40 overflow-hidden" src={'https://image.tmdb.org/t/p/original' + value.poster_path} alt="" />
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
                            );
                        })}
                        <button style={{ display: `${this.state.loadMore}` }} onClick={this.updateIndex} className="btn btn-hover col-12 my-5"> <span>LOAD MORE</span></button>
                    </div>
                </div>
            </>
        )
    }
}
