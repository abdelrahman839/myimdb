import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';

export default class Person extends Component {
    constructor() {
        super();
        this.state = ({ Id: '', creditID: '', personDetails: [], credit: [], allCredits: [] });
    }
    getPerson = async (id) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=52bbcddeda849047525b51d6f8a12361`);
        this.setState({ personDetails: data });
    }
    getCredits = async (id) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/credit/${id}?api_key=52bbcddeda849047525b51d6f8a12361`)
        this.setState({ credit: data.person.known_for });

    }
    getAllCredits = async (id) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=52bbcddeda849047525b51d6f8a12361`)
        this.setState({ allCredits: data.cast });
    }
    componentDidMount() {
        this.getPerson(this.state.Id);
        this.getCredits(this.state.creditID);
        this.getAllCredits(this.state.Id);
    }
    render() {
        try {
            this.state.creditID = this.props.Cast[0].credit_id;
            this.state.Id = this.props.Cast[0].id;
        } catch (error) {

        }

        return (
            <>
                <div className="container mt-100">
                    <div className="row position-relative">
                        <div className=" col-md-3 text-left trns-right person_fixed">
                            <img src={'https://image.tmdb.org/t/p/original' + this.state.personDetails.profile_path} className="w-100 rounded img-fluid" />
                            <div className="personal-info p-0 m-0 trns-right">
                                <h3 className="font-weight-bold main_color my-2">PERSONAL INFO </h3>

                                <h6 className="font-weight-bold">Birthday</h6>
                                <p className="text-muted">{this.state.personDetails.birthday}</p>
                                <h6 className="font-weight-bold">PLACE OF BIRTH </h6>
                                <p className="text-muted">{this.state.personDetails.place_of_birth}</p>
                            </div>
                        </div>
                        <div className="col-md-8  BIOGRAPHY trns-down offset-md-4  ">
                            <h1 className="main_color font-weight-bold">{this.state.personDetails.name}</h1>
                            <h3 className="font-weight-bold mt-4">BIOGRAPHY</h3>
                            <p className="text-muted ">{this.state.personDetails.biography}</p>
                            <h3 className="font-weight-bold mt-4">KNOWN FOR</h3>
                            <div className="row mb-3 w-100">
                                {this.state.credit?.map((value, index) => {
                                    return (
                                        <NavLink to={`/details/${value.title}`} key={index} className="col-3">
                                            <button className="btn" onClick={() => { this.props.test(value); this.props.mediaType(value.media_type); this.props.getpath(value.title); }}>
                                                <img src={'https://image.tmdb.org/t/p/original' + value.poster_path} className="w-100 rounded" />
                                                <h6 className="text-white">{value.title}</h6>
                                            </button>
                                        </NavLink>
                                    );
                                })}
                            </div>
                            {this.state.allCredits?.map((value, index) => {
                                if (value.title === undefined) {
                                    value.title = value.name;
                                }
                                return (
                                    <NavLink to={`/details/${value.title}`} key={index} className=" border rounded my-1 p-1 main_colorHover  row  mx-1 ">
                                        <button className="btn d-flex align-items-center" onClick={() => { this.props.test(value); this.props.mediaType(value.media_type); this.props.getpath(value.title); }}>
                                            <div className="w-7">
                                                <img src={'https://image.tmdb.org/t/p/original' + value.poster_path} className="w-100 rounded" />
                                            </div>
                                            <div className="col-10 d-flex align-items-center font-weight-bold text-white">
                                                <h6> {value.title}</h6>
                                            </div>
                                        </button>
                                    </NavLink>

                                )
                            })}


                        </div>
                    </div>
                </div>
            </>
        )
    }
}
