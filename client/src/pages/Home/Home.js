import React, {Component} from 'react';
import logo from 'resources/images/Moon-256.png';
import './Home.css';
import ToggleButton from 'react-toggle-button';
import Card from 'components/Card/Card';

class Home extends Component {

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
          distance: x.distance,
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

  toggleLivable = this
    .toggleLivable
    .bind(this);
  toggleFarmable = this
    .toggleFarmable
    .bind(this);
  toggleInvestment = this
    .toggleInvestment
    .bind(this);

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo"/>
          <div className="Home-title-container">
            <h1 className="Home-title">
              Planet Real Estate
            </h1>
            <h2>We sell planets.</h2>
          </div>
          <div>
            <p>Contact us!<br/>
              Phone: 044 444 444<br/>
              Email: wesellplanets@universe.org</p>
          </div>
        </div>
        <div className="Home-content">
          <div className="Home-filter-wrapper">
           <p className="Home-filter-label">Filters:</p>
            <div className="Home-filter-button">
              <p>
                Liveable
              </p>
              <ToggleButton value={this.state.livable} onToggle={this.toggleLivable}/>
            </div>
            <div className="Home-plus">
              +
            </div>
            <div className="Home-filter-button">
              <p>
                Farmable
              </p>
              <ToggleButton value={this.state.farmable} onToggle={this.toggleFarmable}/>
            </div>
            <div className="Home-divider"/>
            <div className="Home-filter-button">
              <p>
                Investment
              </p>
              <ToggleButton value={this.state.investment} onToggle={this.toggleInvestment}/>
            </div>
          </div>
          <div className="Home-cards">
            {this
              .state
              .planets
              .map(x => {
                return (<Card key={x.key} value={x}/>)
              })}
          </div>
        </div>
      </div>
    )
  }
}

export default Home;