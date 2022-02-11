import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'The best Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatPlaylistName = this.updatPlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    const isTrackPresent = this.state.playlistTracks.find(sTrack => sTrack.id === track.id)
    if(isTrackPresent !== undefined){
      return;
    }
      this.state.playlistTracks.push(track);
      this.setState({ playlistTracks: this.state.playlistTracks });
  }

  removeTrack(track){
   const newState = this.state.playlistTracks.filter(sTrack => sTrack.id !== track.id);
   this.setState({
     playlistTracks: newState
   })
  }

  updatPlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() =>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
         {/* <!-- Add a SearchBar component --> */}
          <SearchBar 
              onSearch={this.search}
          />
        <div className="App-playlist">
        {/* <!-- Add a SearchResults component --> */}
          <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
          />
        {/* <!-- Add a Playlist component --> */}
          <Playlist 
                playlistName={this.state.playlistName} 
                playlistTracks={this.state.playlistTracks} 
                onRemove={this.removeTrack}
                onNameChange={this.updatPlaylistName}
                onSave={this.savePlaylist}
          />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
