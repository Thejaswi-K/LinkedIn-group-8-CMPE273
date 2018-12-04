import React, { Component } from 'react';
import { CONSTANTS } from '../../Constants';
import axios from "axios";
import Card from "@material-ui/core/Card/Card";
import ProfileNavbar from "../Navbar/applicantNavbar";
import jwt_decode from "jwt-decode";

class SavedJobsList extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            savedJobsList: ""
        };
        if (localStorage.getItem("applicantToken")) {
            let token = localStorage.getItem("applicantToken");
            this.decodedApplicant = jwt_decode(token);
            this.isApplicantLoggedIn = true;
            this.email = this.decodedApplicant.email;
        }
        this.viewJobHandler = this.viewJobHandler.bind(this);
    }

    viewJobHandler = (e) => {
        console.log(e.target.value);
        localStorage.setItem('jobId', e.target.value);
        this.props.history.push("/jobDetails");
    }

    componentDidMount(){
        axios.defaults.withCredentials = true;
        axios.get(CONSTANTS.BACKEND_URL+"/jobs/savedjobs/"+this.email)
        .then(response => {
            this.setState({
                savedJobsList: response.data
            })
        })
        .catch(function (error) {
            console.log("saved jobs fetching error");
            console.log(error);
        });
        // this.setState({
        //     savedJobsList: [
        //         // {
        //         //     _id: "1",
        //         //     title: "job 1",
        //         //     companyName: "Company 1",
        //         //     location: "location 1"
        //         // },
        //         // {
        //         //     _id: "2",
        //         //     title: "job 2",
        //         //     companyName: "Company 2",
        //         //     location: "location 2"
        //         // }
        //     ]
        // })
    }

    render() { 
        let renderthis = null;
        if(this.state.savedJobsList.length === 0) {
            renderthis =(
                <div>
                    <label>You have no Saved jobs</label>
                </div>
            )
        }
        var allSavedJobs = Array.prototype.slice.call(this.state.savedJobsList)
        return (     
            <div>
                <ProfileNavbar />
                <br />
                {renderthis}
                {allSavedJobs.map((job, i) => (
                    // <ul className="list-group list-group-flush">
                    //     <li className="list-group-item" key={i}>
                            <div>
                                <Card className="w-75 p-3 ml-5">
                                    <div className="card-body row" display="">
                                        <div className="container col-8" display="inline">
                                            <div className="container">
                                                <div className="card-title">{job.title}</div>
                                            </div>
                                            <div className="container">
                                                <span className="card-subtitle md-2 text-muted">{job.companyName} . {job.location}</span>
                                            </div>
                                        </div>
                                        <div className="container col-4" display="inline">
                                            <div className="btn-toolbar">
                                                <button className="btn btn-primary" value = {job._id} onClick={this.viewJobHandler}>View Job</button>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </Card>
                                <br />
                            </div> 
                    //     </li>
                    // </ul>
                    
                ))}
            </div> 
        );
    }
}
 
export default SavedJobsList;