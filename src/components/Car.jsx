import React from 'react';
import axios from 'axios';
import Button from './Button';
import User from './User';

export default class Car extends React.Component{
    constructor(props){
        super(props)
        this.state={buttonClicked: false}
    }

    buyNow = () => {
        this.setState({buttonClicked:true})
    }

    closeModal = () => {
        this.setState({buttonClicked: false})
    }

    render(){
        return (
            <div>
            <div>
                <img src={this.props.img}></img>
                <h1>{this.props.id}</h1>
                <h1>{this.props.price}</h1>
                <h1>{this.props.year}</h1>
                <h1>{this.props.type}</h1>
            </div>
            <div>
            <button onClick={this.buyNow}>Buy Now</button>
            </div>
            {this.state.buttonClicked ? <User isOpen={this.state.buttonClicked} onClose={this.closeModal} carId={this.props.id}/>: null}
            </div>
        )
    }

}