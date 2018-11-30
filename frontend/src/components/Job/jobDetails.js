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
            applicantData:"",
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
        //remove hardcode and add this.state.JobId
        axios.get("http://localhost:3001/jobs/" + "5bfc781ce8df91050d1b484f")
        .then(response => {
            console.log("response in then",response.data);
            // var data = JSON.parse(response.data);
            // console.log("parsed data",data);
            this.setState({
                jobData: response.data.data
            });
            if (this.state.jobData[0].easyApply){
                this.setState({
                    easyApply: true
                });
            }   
        })
        .catch(function(error){
            console.log("error in receiving job details to front end", error);
        });
        axios.get("http://localhost:3001/applicants/")
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
            button = <button className="btn btn-primary" data-toggle="modal" data-target="#easyApplyModalForm">Easy Apply</button>
        }
        else{
            button = <button className="btn btn-primary">Apply</button>
        }
        var allData = Array.prototype.slice.call(this.state.jobData);
        return ( 
            <div style={{margin:"10px"}}>
                {/* <UserNavbar/> */}
                <br />
                {allData.map((job,i)=>(
                    <div>
                    <Card className="w-75 p-3 ml-5">
                        <div className="card-body row" display="">
                            <div className="container col-3" display="inline">
                                <a>
                                    <img className="img-thumbnail" style={{width: "200px", height: "200px"}}src="//vignette.wikia.nocookie.net/bungostraydogs/images/1/1e/Profile-icon-9.png/revision/latest?cb=20171030104015" />
                                </a>
                            </div>
                            <div className="container col-9" display="inline">
                                <div className="card-title">{job.title}</div>
                                <div className="container">
                                    <span className="card-subtitle md-2 text-muted">{job.companyName} . {job.location}</span>
                                </div>
                                <div className="container">
                                    <span className="card-subtitle md-2 text-muted">Posted {Math.floor((Math.abs(new Date()-new Date(job.postedDate))/1000)/86400)} days ago . {job.noOfViews} views</span>
                                </div>
                                <div className="container">
                                    <span className="card-subtitle md-2 text-muted"> </span>
                                </div>
                                <div className="btn-toolbar">
                                    <button type="button" className="btn btn-default" name="btn_save" text-color="blue">save</button>
                                    {button}
                                </div>
                                <div className="modal fade" id="easyApplyModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-lg" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Job Application</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form className="form-group">
                                                    <div className="row">
                                                        <div className="col">
                                                            <label>First name</label>
                                                            <input type="text" className="form-control" placeholder="First name"/>
                                                        </div>
                                                        <div className="col">
                                                            <label>Last name</label>
                                                            <input type="text" className="form-control" placeholder="Last name"/>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div class="form-group">
                                                        <label for="inputAddress">Address</label>
                                                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St, city state zip"/>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        <label >How did you hear about us?</label>
                                                        <input type="text" className="form-control" placeholder="Type your response here"/>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        <label>Would you be requiring visa sponsorship to work in our company?</label>
                                                        <div class="form-check-inline">
                                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="yes"/>
                                                            <label className="form-check-label" for="exampleRadios2">Yes</label>
                                                            
                                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="no"/>
                                                            <label className="form-check-label" for="exampleRadios2">No</label>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="form-group">
                                                        <label for="inputState">Ethnicity</label>
                                                        <select id="inputState" className="form-control">
                                                            <option selected>Choose...</option>
                                                            <option>Asian</option>
                                                            <option>Latino</option>
                                                            <option>American</option>
                                                            <option>Hispanic</option>
                                                        </select>
                                                    </div>
                                                    <br />
                                                    <div className="form-group">
                                                        <label for="inputState">Do you have any disability?</label>
                                                        <select id="inputState" className="form-control">
                                                            <option selected>Choose...</option>
                                                            <option>Yes</option>
                                                            <option>No</option>
                                                        </select>
                                                    </div>
                                                    <br />
                                                    <div class="form-group">
                                                        <label>Upload your resume</label>
                                                        <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                                                    </div>
                                                    <br />
                                                    <div class="form-group">
                                                        <label>Upload your cover letter</label>
                                                        <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Submit Application</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <br />
                    <Card className="w-75 p-3 ml-5">
                        <div className="card-body">
                            
                            <div className="row">
                                <div className="col-8">
                                    <div className="card-title">Job Description</div>
                                    <div className="card-subtitle md-2 text-muted">{job.description}</div>
                                    <br />
                                    
                                </div>
                                <div className="col-4">
                                    <div className="card-title">Contact the job poster</div>
                                    <div className="card-subtitle md-2 text-muted">{job.recruiterId}</div>
                                    <br />
                                    <div className="card-title">Industry</div>
                                    <div className="card-subtitle md-2 text-muted">{job.industry}</div>
                                    <br />
                                    <div className="card-title">Employment Type</div>
                                    <div className="card-subtitle md-2 text-muted">{job.employmentType}</div>
                                    <br />
                                    <div className="card-title">Job Functions</div>
                                    <div className="card-subtitle md-2 text-muted">{job.jobFunction}</div>
                                </div>
                            </div>
                            
                        </div>
                    </Card>
                    </div>
                ))}
                
            </div>
         );
    }
}
 
export default JobDetails;