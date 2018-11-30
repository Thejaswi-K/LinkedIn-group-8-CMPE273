import Card from "@material-ui/core/Card/Card";
import React, { Component } from 'react';
import axios from "axios";
import UserNavbar from "../Navbar/UserNavbar";

class JobDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicantId: "",
            //applicantId : this.props.location.state.applicantId,
            jobData: "",
            jobId: this.props.location.jobId,
            status:"",
            easyApply: false
        };
        this.saveHandler = this.saveHandler.bind(this);
        this.applyJobHandler = this.applyJobHandler.bind(this);
        this.easyApplyJobHandler = this.easyApplyJobHandler.bind(this);
    }
    componentDidMount(){
        console.log("Job details initial state", this.state);
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/jobs/" + "5bfc781ce8df91050d1b484f")
        .then(response => {
            console.log(response.data);
            this.setState({
                jobData: response.data
            });
            if (this.state.jobData.easyApply){
                this.setState({
                    easyApply: true
                });
            }   
        })
        .catch(function(error){
            console.log("error in receiving job details to front end", error);
        });
        //remove hardcode and add this.state.JobId
    }
    saveHandler = (e) => {
        e.preventDefault();
        //save API
        
    };
    applyJobHandler = (e) => {
        e.preventDefault();
        //applyJob API
    };
    easyApplyJobHandler = (e) => {
        e.preventDefault();
        //easyApply API
    };

    render() { 
        const easyApply = this.state.easyApply;
        let button;
        if(easyApply){
            button = <div className="btn btn-primary">Easy Apply</div>
        }
        else{
            button = <div className="btn btn-primary">Apply</div>
        }
        return ( 
            <div style={{margin:"10px"}}>
                {/* <UserNavbar/> */}
                <br />
                <Card className="w-75 p-3 ml-5">
                    <div className="card-body row" display="">
                        <div className="container col-xs-3" display="inline">
                            <a>
                                <img className="img-thumbnail" src="//vignette.wikia.nocookie.net/bungostraydogs/images/1/1e/Profile-icon-9.png/revision/latest?cb=20171030104015" />
                            </a>
                        </div>
                        <div className="container col-xs-9" display="inline">
                            <div className="card-title">Job Title</div>
                            <div className="container">
                                <span className="card-subtitle md-2 text-muted">Company name . Job location</span>
                            </div>
                            <div className="container">
                                <span className="card-subtitle md-2 text-muted">Posted Time . Views</span>
                            </div>
                            <div>
                                <span></span>
                            </div>
                            <div className="btn-toolbar">
                                <button type="button" className="btn btn-default" name="btn_save" text-color="blue">save</button>
                                {button}
                            </div>
                            
                        </div>
                    </div>
                </Card>
                <br />
                <Card className="w-75 p-3 ml-5">
                    <div className="card-body">
                        <div className="card-title">Job Description</div>
                        <div className="">
                            <span className="card-subtitle md-2 text-muted">description</span>
                        </div>
                    </div>
                </Card>
            </div>
         );
    }
}
 
export default JobDetails;