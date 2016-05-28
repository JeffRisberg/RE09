import React, { Component } from 'react';

class Toggle extends Component {
    constructor() {
        super();
        this.state = {value: false};
    }

    componentWillReceiveProps(newProps) {
        this.setState({value: newProps.value});
    }

    handleClick(event) {
        let newValue = !this.state.value;
        this.setState({value: newValue});
    }

    render() {
        let className = "btn btn-default";

        if (this.state.value) {
            className += " btn-primary";
        }
        return (
            <button className={className} onClick={this.handleClick.bind(this)}>
                {this.props.label}
            </button>
        );
    }
}

export default Toggle;
