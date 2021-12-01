import React from 'react';
import axios from 'axios';
import Button from './Button';
import Modal from 'react-modal'

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {modelIsOpen : this.props.isOpen}
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {name : event.target[0].value, mobileNumber: event.target[1].value, carId: this.props.carId}
        this.addToOrders(data)
    }

    addToOrders = async (data) => {
        console.log(data)
        const response = await axios.post("http://127.0.0.1:3000/orders", data)
        alert("Ordered Placed Successfully !!");
    }
    closeModal = () => {
        this.setState({modelIsOpen: false})
    }


    render(){
        return (
            <Modal isOpen={this.state.modelIsOpen}
            onRequestClose={this.props.onClose}>
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <input type="text" placeholder="Enter Name" name="name"></input>
                <br/>
            
                <label>Mobile Number:</label>
                <input type="text" placeholder="Enter Mobile Number" name="name"></input>
                <br/><br/>
                <input type="submit"  value="Submit"/>
            </form>
            <br/><br/><br/><br/><br/><br/>
            <button onClick={this.closeModal}>Close </button>
            </Modal>
        )
    }

}