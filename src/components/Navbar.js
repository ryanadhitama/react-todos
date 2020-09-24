import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component{
    render(){
        return(
            <div>
                <Link className="mr-3" to="/">State</Link>
                <Link to="/hook">Hook</Link>
                <hr/>
            </div>
        )
    }
}