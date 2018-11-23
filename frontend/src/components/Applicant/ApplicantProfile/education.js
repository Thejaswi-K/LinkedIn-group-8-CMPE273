import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Card from "@material-ui/core/Card/Card";
import moment from "moment";

function Education(props) {

    var exp = props.education ;


    return (
        <Card className="w-75 p-3 ml-5">
            <div className="card-header">
                Education
            </div>
            <ul className="list-group list-group-flush">
                <div className="mt-4">
                    {exp.map((experience, index) => (
                        <li key={index} className="ml-5">
                            <h4><strong>{experience.degreeLevel}</strong>
                                <button className="btn btn-default ml-5">
                                    <span className="glyphicon glyphicon-pencil" title="Edit Experience"></span>
                                </button>
                            </h4>
                            <h5>{experience.school}</h5>
                            <h6>{experience.location}</h6>
                            <h6>{moment(experience.from).format("YYYY")} - {moment(experience.to).format("YYYY")}</h6>
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

export default Education