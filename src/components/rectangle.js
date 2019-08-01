import React from 'react';

export default class Rectangle extends React.Component {
    constructor(props){
        super(props);
        this.state = {i: 0};
    }

    componentDidMount() {
        setInterval(() => this.setState({i: this.state.i + 5}), 500);
    }

    render() {
        return (
            <context strokeStyle={this.props.strokeStyle}>
                <strokeRect x={this.props.x + this.state.i} y={this.props.y} width={this.props.width} height={this.props.height}/>
            </context>
        )
    }
}