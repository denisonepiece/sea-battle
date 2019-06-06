import React, {Component} from 'react';
import Input from './Input';


class Start extends Component {
  constructor(props) {
    super(props);

    this.message = '';
    this.handleClick = this.handleClick.bind(this);
    this.inputValidate = this.inputValidate.bind(this);
  }

  handleClick(e) {
    let inputBlock = document.getElementById('input-name');
    let inputNext = document.getElementById('input-next');
    let inputPC = document.getElementById('input-pc');
    let inputToGame = document.getElementById('input-to-game');
 
    inputNext.focus();
    inputBlock.classList.add('input-block--show');
    e.target.classList.add('hidden');
    inputNext.addEventListener("keyup", (e) => {
      e.preventDefault();
      if(e.keyCode === 13) {
        global.name = e.target.value;
        inputBlock.classList.add('hidden');
        inputPC.classList.add('input-block--show');
        inputToGame.focus();
      }
    });
    inputToGame.addEventListener("keyup", (e) => {
      e.preventDefault()
      if(e.keyCode === 13) {
        global.namePC = e.target.value;
        inputPC.classList.add('hidden');
        this.props.onClick();
      }
    });
  }

  inputValidate(str) {
    if(str === '' || !isNaN(str)) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="headline headline-prev">Sea Battle</h1>
        <button className="btn btn-start" onClick={this.handleClick}>To battle</button>
        <Input 
          title="Enter your name"
          blockId="input-name"
          inputId="input-next"
          message={this.message}
        />
        <Input 
          title="Enter PC name"
          blockId="input-pc"
          inputId="input-to-game"
        />
      </div>
    );
  }
}

export default Start;
