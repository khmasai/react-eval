import React from 'react';
import axios from 'axios';
import Car from './Car';

export default class Cars extends React.Component{
    constructor(props){
        super(props);
        this.carsToDisplay = [];
        this.state = {"originalCars": [{}], "carsCopy": [{}], selectedType: "N/A", selectedYear: "N/A", selectedPrice:"N/A"}
    }

    async _getCars(){
        try{
            const cars = await axios.get('http://127.0.0.1:3000/cars');
            this.setState({originalCars: cars.data, carsCopy:cars.data});
        }catch(e){
            console.log('Error', e)
        }
        
    }
    componentDidMount(){
        this._getCars()
    }

    displayCars(){
        const cars = this.state.carsCopy.map((car) => {
            return <Car {...car}/>
        });
        return cars;
    }

    changeType = (e) => {
        this.setState({selectedType: e.target.value}, () => {
          this.commonComputation();
        })
    }

    inPriceRange = (value) => {
        console.log(value)
        const [low, high] = this.state.selectedPrice.split("-")
        return value >= low && value <= high
    }

    commonComputation = () => {
        const newCars = this.state.originalCars.filter((car) => {
            if(this.state.selectedYear !== "N/A" && this.state.selectedType !== "N/A" && this.state.selectedPrice !== "N/A"){
                return car.type === this.state.selectedType && car.year.toString() === this.state.selectedYear && this.inPriceRange(car.price)
            }
            else if(this.state.selectedYear !== "N/A"){
                return car.year.toString() === this.state.selectedYear
            }
            else if(this.state.selectedType !== "N/A"){
                return car.type === this.state.selectedType
            }
            else if(this.state.selectedPrice !== "N/A"){
                return this.inPriceRange(car.price);
            }
            return car
        });
        this.setState({carsCopy: newCars});
    }

    changeYear = (e) => {
        this.setState({selectedYear: e.target.value}, () => {
            this.commonComputation();
        })
    }
    changePrice = (e) => {
        this.setState({selectedPrice: e.target.value}, () => {
            this.commonComputation();
        })
    }
   
    
    render(){
        return (
            <div>
                <select value="type" defaultValue={this.state.selectedType} onChange={this.changeType} value={this.state.selectedType}> 
                    <option value="N/A">N/A</option>   
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                </select>
                <select value="year" defaultValue={this.state.selectedYear} onChange={this.changeYear} value={this.state.selectedYear}> 
                    <option value="N/A">N/A</option>   
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                </select>
                <select value="price" defaultValue={this.state.selectedPrice} onChange={this.changePrice} value={this.state.selectedPrice}> 
                    <option value="N/A">N/A</option>   
                    <option value="1-7">Below 8 Lakh</option>
                    <option value="8-10">8-10 Lakh</option>
                    <option value="10-20">10-20 Lakh</option>
                </select>
                {this.displayCars()}
            </div>
        )
    }

}