import {Component} from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Card from "@material-ui/core/Card/Card";

var React = require('react');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

class Experience extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        this.exp = [{
            employer: "Ora",
            position: "soft",
            startDate:"24343",
            endDate:"34332",
            description:"fndfbdk"
        },{

            employer: "Ora",
            position: "soft",
            startDate:"24343",
            endDate:"34332",
            description:"fndfbdk"

        }];


        return (
            <Card className="w-75 p-3 ml-5">

                    <div className="card-header">
                        Experience
                    </div>
                    <ul className="list-group list-group-flush">
                        <div>
                            {this.exp.map((experience, index) => (
                                <li key={index} className="ml-5">
                                    <h4><strong>{experience.employer}</strong>
                                        <button className="btn btn-default">
                                            <span className="glyphicon glyphicon-pencil" title="Edit Experience"></span>
                                        </button>
                                    </h4>
                                    <h5>{experience.position}</h5>
                                    <h6>{experience.startDate} - {experience.endDate}</h6>
                                    <h6>
                                <pre style={{
                                    margin: "-10px 0px 0px -10px",
                                    fontFamily: "helvetica",
                                    border: "none",
                                    width: "100%",
                                    background: "none",
                                    whiteSpace: "pre-wrap"
                                }}>{experience.description}</pre>
                                        <hr/>
                                    </h6>
                                </li>
                            ))}
                        </div>
                    </ul>

            </Card>
        )
    }

}


export default Experience;