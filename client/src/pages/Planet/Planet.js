import React, {Component} from 'react';
import logo from 'resources/images/Moon-256.png';
import './Planet.css';
import {Link} from 'react-router-dom';

class Planet extends Component {

    state = {
        planet: {
            key: "",
            name: "",
            price: "",
            distance: "",
            livable: "",
            farmable: "",
            investment: ""
        }
    };

    componentDidMount() {
        this.loadData();
    }

    callApi = async() => {
        const response = await fetch('/api/planets/' + this.props.match.params.id);
        const body = await response.json();

        if (response.status !== 200) 
            throw Error(body.message);
        return body;
    };

    loadData() {
        if (Number(this.props.match.params.id)) {
            this
                .callApi()
                .then(res => {
                    const reponse = ({
                        key: res.key,
                        name: res.name,
                        price: res.price,
                        distance: res.distance,
                        livable: res.isLivable,
                        farmable: res.isFarmable,
                        investment: res.isInvestment
                    });
                    this.setState({planet: reponse});

                })
                .catch(err => console.log(err));
        } else {
            this
                .props
                .history
                .push('/');
        }
    }

    render() {
        return (
            <div className="Planet">
                <div className="Planet-header">
                    <Link to="/">
                        <img src={logo} className="Planet-logo" alt="logo"/>
                    </Link>
                    <div className="Planet-title-container">
                        <p>Planet name:</p>
                        <h1 className="Planet-title">
                            {this.state.planet.name || "Loading..."}
                        </h1>
                    </div>
                    <div className="contactUs">
                        <p>Contact us!<br/>
                            Phone: 044 444 444<br/>
                            Email: wesellplanets@universe.org</p>
                    </div>
                </div>
                {this.state.planet.key === "" || <div className="Planet-content">
                    <div>
                        <div key={this.state.planet.key}>
                            <div>
                                <ul>
                                    <li>
                                        Price: {this.state.planet.price}</li>
                                    <li>
                                        Distance: {this.state.planet.distance}</li>
                                    <li>
                                        Livable: {this.state.planet.livable
                                            ? "Yes"
                                            : "No"}
                                    </li>
                                    <li>
                                        Farmable: {this.state.planet.farmable
                                            ? "Yes"
                                            : "No"}
                                    </li>
                                    <li>
                                        Investment: {this.state.planet.investment
                                            ? "Yes"
                                            : "No"}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>}
            </div>
        )
    }
}

export default Planet;