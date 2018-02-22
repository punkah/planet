import React, { Component } from 'react';
import logo from './Moon-256.png';
import './App.css';

class App extends Component {

  state = {
    planets: []
  };

  Livable = false;
  Farmable = false;
  Investment = false;

  classForLivableButton = "button";
  classForFarmableButton = "button";
  classForInvestmentButton = "button";

  componentDidMount() {
    this.callApi()
      .then(res => {
        const reponse = res.map((x) => ({ name: x.name, price: x.price }));
        this.setState({ planets: reponse });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/planets');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  toggleLivable() {
    this.Livable = !this.Livable;
    if(this.Livable){
      this.classForLivableButton = "button.selected"
    }
    else {
      this.classForLivableButton = "button"
    }
  }

  toggleFarmable() {
    this.Farmable = !this.Farmable;
    if(this.Farmable){
      this.classForFarmableButton = "button.selected"
    }
    else {
      this.classForFarmableButton = "button"
    }
  }

  toggleInvestment() {
    this.Investment = !this.Investment;
    if(this.Investment){
      this.classForInvestmentButton = "button.selected"
    }
    else {
      this.classForInvestmentButton = "button"
    }
  }

  toggleLivable = this.toggleLivable.bind(this);
  toggleFarmable = this.toggleFarmable.bind(this);
  toggleInvestment = this.toggleInvestment.bind(this);

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-title-container">
            <h1 className="App-title">Planet Real Estate</h1>
          </div>
        </div>
        <div className="App-content">
          <div className="buttons">
            <button class={this.classForLivableButton ? "button.selected" : "button"} onClick={this.toggleLivable}>Livable</button>
            <button class={this.classForFarmableButton} onClick={this.toggleFarmable}>Farmable</button>
            <button class={this.classForInvestmentButton} onClick={this.toggleInvestment}>Investment</button>
          </div>
          <div className="cards">
            {this.state.planets.map(x => {
              return (
                <div className="card-wrapper">
                  <div className="header">
                    <img className="avatar" src={logo} alt="avatar" />
                    <div className="name"> <h3>{x.name} </h3> </div>
                  </div>
                  <div className="content">
                    <ul className="contact-info">
                      <li><i className="fa fa-phone"></i>Price: {x.price}</li>
                      <li><i className="fa fa-envelope"></i>Distance: {x.price}</li>
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;