import React, {Component} from 'react';
import logo from './Moon-256.png';
import './App.css';
import ToggleButton from 'react-toggle-button';
import Label from './Label';
//import { browserHistory } from 'react-router';

class App extends Component {

  state = {
    planets: [],
    livable: false,
    farmable: false,
    investment: false
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.livable !== prevState.livable || this.state.farmable !== prevState.farmable || this.state.investment !== prevState.investment) 
      this.loadData();
    }
  
  callApi = async() => {
    const response = await fetch('/api/planets?livable=' + this.state.livable + '&farmable=' + this.state.farmable + '&investment=' + this.state.investment);
    const body = await response.json();

    if (response.status !== 200) 
      throw Error(body.message);
    return body;
  };

  loadData() {
    this
      .callApi()
      .then(res => {
        const reponse = res.map((x) => ({
          key: x.key,
          name: x.name,
          price: x.price,
          livable: x.isLivable,
          farmable: x.isFarmable,
          investment: x.isInvestment
        }));
        this.setState({planets: reponse});
      })
      .catch(err => console.log(err));
  }

  toggleLivable() {
    if (this.state.livable === false) {
      this.setState({
        livable: !this.state.livable,
        investment: false
      });
    } else {
      this.setState({
        livable: !this.state.livable
      });
    }
  }

  toggleFarmable() {
    if (this.state.farmable === false) {
      this.setState({
        farmable: !this.state.farmable,
        investment: false
      });
    } else {
      this.setState({
        farmable: !this.state.farmable
      });
    }
  }

  toggleInvestment() {
    if (this.state.investment === false) {
      this.setState({
        investment: !this.state.investment,
        livable: false,
        farmable: false
      });
    } else {
      this.setState({
        investment: !this.state.investment
      });
    }
  }

  toggleLivable = this.toggleLivable.bind(this);
  toggleFarmable = this.toggleFarmable.bind(this);
  toggleInvestment = this.toggleInvestment.bind(this);

  render() {
    return (
      <div className="App">
        <div className="App-header">
          < img src={logo} className="App-logo" alt="logo"/>
          <div className="App-title-container">
            <h1 className="App-title">
              Planet Real Estate
            </h1>
          </div>
        </div>
        <div className="App-content">
          <div className="button-wrapper">
            <div className="button">
              <p>
                Liveable
              </p>
              <ToggleButton value={this.state.livable} onToggle={this.toggleLivable}/>
            </div>
            <div className="plus">
              +
            </div>
            <div className="button">
              <p>
                Farmable
              </p>
              <ToggleButton value={this.state.farmable} onToggle={this.toggleFarmable}/>
            </div>
            <div className="divider"/>
            <div className="button">
              <p>
                Investment
              </p>
              <ToggleButton value={this.state.investment} onToggle={this.toggleInvestment}/>
            </div>
          </div>
          <div className="cards">
            {this
              .state
              .planets
              .map(x => {
                return (
                  <div className="card-wrapper" key={x.key} onClick={this.onCardClick(x.key)}>
                    <div className="header">
                      <img className="avatar" src={logo} alt="avatar"/>
                      <div className="name">
                        < h3>
                          {x.name}
                        </h3>
                      </div>
                    </div>
                    <div className="content">
                      <ul className="contact-info">
                        <li>
                          <i className="fa fa-phone"></i>Price: {x.price}</li>
                        <li>
                          <i className="fa fa-envelope"></i>Distance: {x.price}</li>
                      </ul>
                      <div className="label-wrapper">
                        <Label text="Livable" value={x.livable}/>
                        <Label text="Farmable" value={x.farmable}/>
                        <Label text="Investment" value={x.investment}/>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    )
  }
}

export default App;