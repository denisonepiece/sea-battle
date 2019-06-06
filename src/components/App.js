import React, {Component} from 'react';
import Start from './Start';
import Battle from './Battle'
import './global';

class App extends Component {
  constructor(props) {
    super(props);

    this.startGame = this.startGame.bind(this);
    this.state = {
      gameStep: 'start',
    }
  }

  startGame() {
    this.setState({gameStep: 'battle'})
  }

  render() {
    if(this.state.gameStep === 'start') {
        return <Start onClick={this.startGame}/>
    } else if(this.state.gameStep === 'battle') {
      return <Battle/>
    }
  }
}


export default App;