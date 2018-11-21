import {Component} from "react";
import Image from "react-bootstrap/es/Image";
import Profile from "../../../images/profile.jpg"
import Card from "@material-ui/core/Card/Card";
import Label from "react-bootstrap/es/Label";

var React = require('react');

class Summary extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Card className="w-75 p-3 ml-5" style={{overflow: "auto", height: "auto"}}>

                <div style={{margin: "1px"}}>

                    <div style={{
                        alignItems: 'center',
                        width: "100px",
                        height: "auto",

                        padding: "1px",
                        backgroundColor: "white"

                    }}>
                        <Image src={Profile} circle/>


                    </div>


                    <h3 className="ml-4">Akshat Goel</h3>

                    <h4 className="ml-4">Android Developer</h4>

                    <label className="ml-4">San Jose, California</label>

                    <hr/>

                    <h5 className="ml-4">Yo yo </h5>



                </div>


            </Card>


        )
    }

}

export default Summary