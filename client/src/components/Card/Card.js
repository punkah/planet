import React, {Component} from 'react';
import logo from 'resources/images/Moon-256.png';
import './Card.css';
import Label from 'components/Label/Label';
import {LinkContainer} from 'react-router-bootstrap';

class Card extends Component {

    state = {
        planet: {
            key: "",
            name: "",
            price: "",
            distance: "",
            livable: false,
            farmable: false,
            investment: false
        }
    };

    componentDidMount() {
        var planet = this.props.value;
        this.setState({planet: planet});
    }

    render() {
        return (
            <LinkContainer to={`/planet/${this.state.planet.key}`} key={this.state.planet.key}>
                <div className="card-wrapper" key={this.state.planet.key}>
                    <div className="header">
                        <img className="avatar" src={logo} alt="avatar"/>
                        <div className="name">
                            < h3>
                                {this.state.planet.name}
                            </h3>
                        </div>
                    </div>
                    <div className="content">
                        <ul>
                            <li>
                                Price: {this.state.planet.price}</li>
                            <li>
                                Distance: {this.state.planet.distance}</li>
                        </ul>
                        <div className="label-wrapper">
                            <Label text="Livable" value={this.state.planet.livable}/>
                            <Label text="Farmable" value={this.state.planet.farmable}/>
                            <Label text="Investment" value={this.state.planet.investment}/>
                        </div>
                    </div>
                </div>
            </LinkContainer>
        )
    }
}

export default Card;