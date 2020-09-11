import React from 'react';
import GlobalStyle from './global-styles'
import Header from '../../compontents/Header'
import Tab from '../../compontents/Tab'
import {Switch, Route, Redirect} from 'react-router-dom'
import RecommendPage from '../RecommendPage'
import SingerPage from '../SingerPage'
import RankPage from '../RankPage'
import SearchPage from '../SearchPage'
import UserPage from '../UserPage'
import Player from '../Player'
import {connect} from 'react-redux'

function App({ currentSong }) {
  return (
    <div>
      <Header />
      <Tab />
      <GlobalStyle />
      <Switch>
        <Redirect exact from='/' to='/recommend' />
        <Route path='/recommend' component={RecommendPage}></Route>
        <Route path='/singer' component={SingerPage}></Route>
        <Route path='/rank' component={RankPage}></Route>
        <Route path='/search' component={SearchPage}></Route>
        <Route path='/user' component={UserPage}></Route>
      </Switch>
      {
        currentSong &&
        <Player />
      }
    </div>
  );
}
function mapSateToProps(state) {
  const { playlist, currentIndex } = state.playerReducer
  return {
    currentSong: playlist[currentIndex] 
  }
}

export default connect(mapSateToProps, null)(App);
