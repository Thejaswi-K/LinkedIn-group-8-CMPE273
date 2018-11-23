import {Component} from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Card from "@material-ui/core/Card/Card";
import moment from "moment";

var React = require('react');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;


function Experience(props) {

    var exp = props.experience;


    return (
        <Card className="w-75 p-3 ml-5">

            <div className="card-header">
                Experience
            </div>
            <ul className="list-group list-group-flush">
                <div className="mt-4">
                    {exp.map((experience, index) => (
                        <li key={index} className="ml-5">
                            <h4><strong>{experience.title}</strong>
                                <button className="btn btn-default ml-4">
                                    <span className="glyphicon glyphicon-pencil" title="Edit Experience"></span>
                                </button>
                            </h4>
                            <h5>{experience.company}</h5>
                            <h6>{moment(experience.from).format("YYYY")} - {moment(experience.to).format("YYYY")}</h6>
                            <h6>{experience.location}</h6>
                            <h6>
                                <pre style={{
                                    margin: "5px 0px 0px 0px",
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


export default Experience;