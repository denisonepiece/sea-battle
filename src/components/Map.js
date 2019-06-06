import React, { Component } from 'react';
import Square from './Square'

class Map extends Component {
  constructor(props) {
    super(props);
    
    this.pcScore = 0;
    this.playerScore = 0;
    this.handleClick = this.handleClick.bind(this);
  }
 
  getField() {
    let field = document.querySelector('.field-pc').getElementsByClassName('square'),
        arr = [],
        k = 0;

    for( let i = 0; i < 10; i++) {
      arr[i] = [];
      for( let j = 0; j < 10; j++) {
        arr[i][j] = field[k];
        k++;
      }
    }

    return arr;
  }

  checkWinner(pc, player) {  
    if(pc >= 20 || player == 20) {
      this.props.message('Вы ' + ((pc == 20) ? 'проиграли' : 'победили'), 1);
    }
  }

  computerStep() {
    let field = this.getField(),
      x = getRandom(9),
      y = getRandom(9);  

    switch(global.human[x][y]) {
        case 0:
          global.human[x][y] = 2;
          field[x][y].classList.add('square-miss');
          this.props.message('Промах');
          this.props.whoStep(global.name || 'Эй, Вы')
          break;
        case 1:
          global.human[x][y] = 3;
          field[x][y].classList.add('square-strike');
          this.props.message('Попадение');
          this.pcScore++;
          this.computerStep();
          this.checkWinner(this.pcScore, this.playerScore);
          break;
        case 2:
          this.computerStep(); 
          break;
        case 3:
          this.computerStep(); 
          break;

        default: 
          console.log('Ошибка при заполнение массива');
      }
  }

  handleClick(e) {
    let x = e.target.getAttribute('data-x'),
        y = e.target.getAttribute('data-y');

    switch(global.computer[x][y]) {
      case 0:
        global.computer[x][y] = 2;
        e.target.classList.add('square-miss');
        this.props.message('Промах');
        this.props.whoStep(global.namePC || 'Комп');
        this.computerStep();
        break;
      case 1:
        global.computer[x][y] = 3;
        e.target.classList.add('square-strike');
        this.props.message('Попадение');
        this.playerScore++;
        this.checkWinner(this.pcScore, this.playerScore);
        break;
      case 2: 
        break;
      case 3: 
        break;
      default: 
        console.log('Ошибка при заполнение массива');
    }
  }

  mapForAttack(arr, memory) {
    arr = [];
    for(let i = 0; i < 10; i++) {
      arr[i] = [];
      for(let j = 0; j < 10; j++) {
        arr[i][j] = 
        <Square 
          className="square" 
          onClick={this.handleClick} 
          key={i + '' + j} 
          x={i} y={j}   
        />;
      }
    }  
    return arr;
  }

  renderMapFromArray(arr, memory) {
    arr = []
    for(let i = 0; i < 10; i++) {
      arr[i] = []
      for(let j = 0; j < 10; j++) {
        if(memory[i][j] == 1) {
          arr[i][j] = 
          <Square 
            className="square square-with-ship" 
            click={false} 
            key={i + '' + j}
            x={i} y={j}  
          />
        } else if(memory[i][j] == 3) {
          arr[i][j] = 
          <Square 
            className="square square-with-ship square-strike" 
            click={false} 
            key={i + '' + j}
            x={i} y={j}  
          />
        } else {
          arr[i][j] = 
            <Square
              className="square"
              click={false}
              key={i + '' + j}
              x={i} y={j}  
            />
        }
      }
    }
    return arr;
  }


  render() {
    return (
      <div className='map'>
        <h3>{this.props.title || 'Player'}</h3>
        <div className={'field ' + (this.props.computer ? 'field-pc' : 'field-hum')}>
          {this.props.status === 'show' ? this.renderMapFromArray(this.temp, global.human) : null}
          {this.props.status === 'attack' ? this.mapForAttack(this.temp, global.computer) : null}
        </div> 
      </div>
    );
  }
}

function getRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default Map;