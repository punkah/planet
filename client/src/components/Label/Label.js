import React from 'react';
import PropTypes from 'prop-types';
import './Label.css';

class Label extends React.Component {

    render() {

        if (this.props.value) {
            return (
                <div className="Label-text">{this.props.text}</div>
            );
        }
        return null;
    }
}
Label.propTypes = {
    text: PropTypes.string,
    value: PropTypes.bool
};
export default Label;