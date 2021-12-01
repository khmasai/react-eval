import React from 'react';

export default class Button extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
        return (
            <div>
                <button onClick={()=> this.props.buyNow()}>Buy Now</button>
            </div>
        )
    }

}