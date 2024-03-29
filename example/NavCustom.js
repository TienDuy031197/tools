import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class NavCustom extends Component {
    
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Quan Ly</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" target="_self"
                              to='/'>
                            <span>Home</span>
                        </Link>
                    {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" target="_self"
                              to='/addresourcecustom'>
                            <span>Add Resource</span>
                        </Link>
                    {/* <a className="nav-link" href="#">Add Resource</a> */}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" target="_self"
                              to='/addproject'>
                            <span>Add Project</span>
                        </Link>
                    {/* <a className="nav-link" href="#">Add Project</a> */}
                    </li>
                    {/* <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                </ul>
                </div>
            </nav>
        );
    }
}

export default NavCustom;