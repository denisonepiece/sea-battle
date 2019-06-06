import React from 'react'
import Map from './Map'

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      step: 'Привет'
    }
    this.changeMessgae = this.changeMessgae.bind(this);
    this.whoStep = this.whoStep.bind(this);
  }

  changeMessgae(str, gameFinish) {
    this.setState({
      message: str,
    });

    if(gameFinish) {
      document.querySelector('.modal').classList.add('modal--show');
    } 
  }

  whoStep(str) {
    this.setState({
      step: str,
    });
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    return ( 
      <div className="wrapper">
        <h1 className="headline headline-another">Battle</h1>
        <div className="row" style={{marginBottom: 50 + 'px', width: 900 + 'px', justifyContent: 'space-between'}}>
          <Map
            title= {global.namePC}  
            status='show'
            click= {false}
            computer={true} 
          />
          <div className="info">
            <h3>{this.state.message}</h3>
            <h4>{this.state.step}, ваш ход!</h4>
          </div>
          <Map 
            title= {global.name}  
            status='attack'
            message={this.changeMessgae}
            whoStep={this.whoStep}
          />
        </div>
        <div className='modal '>
          <h2 className='modal__header'>{this.state.message}</h2>
          <button className="btn btn-start" onClick={ this.refreshPage }>Начать заново</button>
        </div>
      </div>
    )
  }
}

export default Battle