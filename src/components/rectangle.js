import React from 'react';

export default class Rectangle extends React.Component {
    render() {
        return (
            <context strokeStyle={this.props.strokeStyle}>
                <strokeRect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}/>
            </context>
        )
    }
}