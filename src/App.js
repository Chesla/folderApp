import React, { Component } from 'react';
import './App.css';
import Header from './pages/header';
import List from './pages/list';
import FolderStore from './stores/folderStores';
import {browserHistory} from 'react-router';

class App extends Component {
  constructor(props){
    super(props);
    if(FolderStore.getFolders('').length===0){
      browserHistory.replace('/');
    }
  }
  render() {
    return (
        <div>
            <Header folders={this.props.params.splat}/>
            <List folders={this.props.params.splat}/>
        </div>
    )
  }
}

export default App;
