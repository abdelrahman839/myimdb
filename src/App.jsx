import { Component } from "react";
import Home from "./component/Home/Home";
import Navbar from "./component/Navbar/Navbar";
import { Route, Switch, Redirect } from 'react-router-dom'
import OneMovieTv from "./component/OneMovieTv/OneMovieTv";
import Person from "./component/Person/Person";
import Movie from "./component/Movie/Movie";
import Tv from "./component/Tv/Tv";

class App extends Component {
  state = { item: [], type: '', Cast: [], FavoriteList: [], changeNav: false, MovieType: 'popular', TvType: 'popular',PATH:'' };
  test = (TVME) => {
    let items = [TVME]
    this.setState({ item: items });
  }
  mediaType = (Type) => {
    this.setState({ type: Type })
  }
  cast = (value) => {
    let castDetails = [value];
    this.setState({ Cast: castDetails })
  }
  favList = (value) => {
    this.setState({ FavoriteList: value })
    console.log(this.state.FavoriteList);
  }
  movieType = (value) => {
    this.setState({ MovieType: value, TvType: 'popular' });

  }
  typeTV = (value) => {
    this.setState({ TvType: value, MovieType: 'popular' });
  }

  getpath = (value) => {
    this.setState({PATH:value});
  }

  render() {
    
    return <>

      <Navbar movieType={this.movieType} MoviePath={this.state.MovieType} typeTV={this.typeTV} TvPath={this.state.TvType} test={this.test} mediaType={this.mediaType} getpath={this.getpath}/>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home"   ><Home test={this.test} mediaType={this.mediaType} getpath={this.getpath}/></Route>
        <Route path={`/movie/${this.state.MovieType}`} > <Movie test={this.test} mediaType={this.mediaType} MovieType={this.state.MovieType} getpath={this.getpath}/> </Route>
        <Route path={`/details/${this.state.PATH}`}  ><OneMovieTv MTV={this.state.item} Type={this.state.type} cast={this.cast} test={this.test} mediaType={this.mediaType} getpath={this.getpath}/></Route>
        <Route path="/perosn" > <Person Cast={this.state.Cast} test={this.test} mediaType={this.mediaType} getpath={this.getpath}/> </Route>
        <Route path={`/tv/${this.state.TvType}`}> <Tv test={this.test} mediaType={this.mediaType} TvType={this.state.TvType} getpath={this.getpath}/> </Route>
      </Switch>



    </>
  }
}
export default App