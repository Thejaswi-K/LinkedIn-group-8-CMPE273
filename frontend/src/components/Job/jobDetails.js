import Card from "@material-ui/core/Card/Card";
import React, { Component } from 'react';
import axios from "axios";
import ProfileNavbar from "../Navbar/applicantNavbar";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { jobDetalsByID } from "../../actions/jobSearchActions"; 
import { withRouter } from "react-router-dom";
import { CONSTANTS } from '../../Constants';

class JobDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobData: "",
            applicantData:"",
            savedStatus:false,
            appliedStatus:false,
            easyApply: false,
            hearaboutus:"",
            sponsorship:"",
            diversity:"",
            disability:"",
            resume:"",
            coverletter:"",
            companyPhoto:""
        };
        if (localStorage.getItem("applicantToken")) {
            let token = localStorage.getItem("applicantToken");
            this.decodedApplicant = jwt_decode(token);
            this.isApplicantLoggedIn = true;
            this.email = this.decodedApplicant.email;
        }
        this.saveHandler = this.saveHandler.bind(this);
        this.applyJobHandler = this.applyJobHandler.bind(this);
        this.easyApplyJobHandler = this.easyApplyJobHandler.bind(this);
        this.valueChangeHandler = this.valueChangeHandler.bind(this);
    }
    valueChangeHandler = (e) => {
        if(e.target.name == 'resume'){
            console.log("Target files",e.target.files);
            this.setState({
                resume:  e.target.files[0]
            });
        }else if(e.target.name == 'coverletter'){
            console.log("Target files",e.target.files);
            this.setState({
                coverletter:  e.target.files[0]
            });
        }
        else{
            this.setState({ [e.target.name]: e.target.value });
            console.log(this.state);
        } 
    };

    componentDidMount(){
        console.log("Job details initial state", this.state);
        axios.defaults.withCredentials = true;
        axios.put(CONSTANTS.BACKEND_URL+"/recruiters/jobs/logs/click-count",{ "jobid": this.props.jobSearchReducer.jobDetailsByID})
        .then(response => {
            console.log("click count successful");
        })
        .catch(function(error){
            console.log("error in incrementing click count", error);
        });
        axios.get(CONSTANTS.BACKEND_URL+"/applicants/"+this.email,{headers: {'Authorization': localStorage.getItem("applicantToken")}}) 
        .then(response => {
            console.log("response in applicant details retrieval",response.data);
            this.setState({
                ...this.state,
                applicantData: response.data
            });
            axios.get(CONSTANTS.BACKEND_URL+"/jobs/" + this.props.jobSearchReducer.jobDetailsByID)
            .then(response => {
                console.log("response in then",response.data.data[0].companyLogo[0]);
                if(response.data.data[0].companyLogo[0]){
                    axios.post(CONSTANTS.BACKEND_URL+"/api/photos/download/"+ response.data.data[0].companyLogo[0])
                    .then(response => {
                        console.log("Image res: ", response);
                        let imagePreview = "data:image/jpg;base64, "+ response.data;
                        console.log(imagePreview);
                        this.setState({
                            companyPhoto: imagePreview
                        });
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                }
                this.setState({
                    jobData: response.data.data
                });
                if (this.state.jobData[0].easyApply){
                    this.setState({
                        easyApply: true
                    });
                } 
                if(this.state.jobData[0].savedBy.indexOf(this.email) > -1) {
                    this.setState({
                        savedStatus: true
                    });
                }
                console.log("applicantData", this.state.applicantData);
                console.log("JobID", this.props.jobSearchReducer.jobDetailsByID); 
                if(this.state.applicantData.appliedJobs.indexOf(this.props.jobSearchReducer.jobDetailsByID) > -1){
                    this.setState({
                        appliedStatus: true
                    });
                }
                console.log("finally state before rendering", this.state);  
            })
            .catch(function(error){
                console.log("error in receiving job details to front end", error);
            });
        })
        .catch(function(error){
            console.log("error in receiving applicant details to front end", error);
        })
    }
    
    saveHandler = (e) => {
        e.preventDefault();
        console.log("save call", CONSTANTS.BACKEND_URL+"/applicants/"+this.email+"/jobs/"+this.props.jobSearchReducer.jobDetailsByID+"/save");
        axios.post(CONSTANTS.BACKEND_URL+"/applicants/"+this.email+"/jobs/"+this.props.jobSearchReducer.jobDetailsByID+"/save")
        .then(response=>{
            this.setState({
                savedStatus: true
            })
        })
        .catch(function(error){
            console.log(error);
        });
    };
    applyJobHandler = (e) => {
        e.preventDefault();
        sessionStorage.setItem("jobId",this.props.jobSearchReducer.jobDetailsByID);
        window.open(CONSTANTS.ROOTURL+"/jobApply","_blank");
    };
    easyApplyJobHandler = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const { resume } = this.state;
        const { coverletter } = this.state;
        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('coverletter', coverletter);
        axios.post(CONSTANTS.BACKEND_URL+"/api/documentsUpload/uploadResume", formData)
        .then((result=>{
            console.log("upload successful");
            const data = {
                firstName: this.state.applicantData.firstName,
                lastName: this.state.applicantData.lastName,
                email: this.state.applicantData.email,
                address: this.state.address,
                hearAboutUs: this.state.hearaboutus,
                sponsorship: this.state.sponsorship,
                diversity: this.state.diversity,
                disablility: this.state.disability,
                resume: this.state.resume.name,
                coverLetter: this.state.coverletter.name
            }
            console.log("submit data",data);
    
            axios.post(CONSTANTS.BACKEND_URL+"/applicants/"+this.email+"/jobs/"+this.props.jobSearchReducer.jobDetailsByID, data)
            .then(response=>{
                this.setState({
                    appliedStatus: true
                })
                alert("Job applied successfully");
            })
            .catch(function(error){
                console.log(error);
            });
        }))
        .catch((error)=>{
            console.log("unable to upload");
        });
        
    };

    render() { 
        const easyApply = this.state.easyApply;
        const savedStatus = this.state.savedStatus;
        const appliedStatus = this.state.appliedStatus;
        let button;
        let save;
        if(savedStatus){
            save = <button className="btn btn-default" name="btn_save" disabled>saved</button>
        }
        else{
            save = <button type="button" className="btn btn-default" name="btn_save" text-color="blue" onClick={this.saveHandler}>save</button>
        }
        if(appliedStatus){
            button = <button className="btn btn-primary" disabled>Applied</button>
        }
        else{
            if(easyApply){
                button = <button className="btn btn-primary" data-toggle="modal" data-target="#easyApplyModalForm">Easy Apply</button>
            }
            else{
                button = <button className="btn btn-primary" onClick={this.applyJobHandler}>Apply</button>
            }
        }
        
        var allData = Array.prototype.slice.call(this.state.jobData);
        console.log("jod details fetched",allData);
        var prefillData = this.state.applicantData;
        return ( 
            <div style={{margin:"10px"}}>
                <ProfileNavbar />
                <br />
                {allData.map((job,i)=>(
                    <div>
                    <Card className="w-75 p-3 ml-5">
                        <div className="card-body row" display="">
                            <div className="container col-3" display="inline">
                                <a>
                                    <img className="img-thumbnail" style={{width: "200px", height: "200px"}}
                                    src={this.state.companyPhoto}
                                    alt="//vignette.wikia.nocookie.net/bungostraydogs/images/1/1e/Profile-icon-9.png/revision/latest?cb=20171030104015" />
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
                                    {save}
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
                                                            <input type="text" className="form-control" placeholder="First name" name="firstname" value={prefillData.firstName} />
                                                        </div>
                                                        <div className="col">
                                                            <label>Last name</label>
                                                            <input type="text" className="form-control" placeholder="Last name" name="lastname" value={prefillData.lastName} />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="inputAddress">email</label>
                                                        <input type="text" className="form-control" id="inputAddress" placeholder="email" name="email" value={prefillData.email} />
                                                    </div>
                                                    <br />
                                                    <br />
                                                    <div class="form-group">
                                                        <label for="inputAddress">Address</label>
                                                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St, city state zip" name="address"/>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        <label >How did you hear about us?</label>
                                                        <input type="text" className="form-control" placeholder="Type your response here" name="hearaboutus" onChange={this.valueChangeHandler}/>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        <label>Would you be requiring visa sponsorship to work in our company?</label>
                                                        <div class="form-check-inline">
                                                            <input className="form-check-input" type="radio" name="sponsorship" id="sponsorship" value="yes" onChange={this.valueChangeHandler}/>
                                                            <label className="form-check-label" for="sponsorship" value="yes">Yes</label>
                                                            
                                                            <input className="form-check-input" type="radio" name="sponsorship" id="sponsorship" value="no" onChange={this.valueChangeHandler}/>
                                                            <label className="form-check-label" for="sponsorship" value="no">No</label>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="form-group">
                                                        <label for="inputState">Ethnicity</label>
                                                        <select id="inputState" className="form-control" name="diversity" onChange={this.valueChangeHandler}>
                                                            <option selected>Choose...</option>
                                                            <option value="Asian">Asian</option>
                                                            <option value="Latino">Latino</option>
                                                            <option value="American">American</option>
                                                            <option value="Hispanic">Hispanic</option>
                                                        </select>
                                                    </div>
                                                    <br />
                                                    <div className="form-group">
                                                        <label for="inputState">Do you have any disability?</label>
                                                        <select id="inputState" className="form-control" name="disability" onChange={this.valueChangeHandler}>
                                                            <option selected>Choose...</option>
                                                            <option value="yes">Yes</option>
                                                            <option value="no">No</option>
                                                        </select>
                                                    </div>
                                                    <br />
                                                    <div class="form-group">
                                                    {(this.state.applicantData.resume)?
                                                    <div>
                                                        <label>{this.state.applicantData.resume}</label>
                                                        <input type="file" className="form-control-file" id="exampleFormControlFile1" name="resume" onChange={this.valueChangeHandler} disabled/>
                                                        </div>:
                                                        <div>
                                                        <label>Upload your resume</label>
                                                        <input type="file" className="form-control-file" id="exampleFormControlFile1" title = "Choose a video please" name="resume" onChange={this.valueChangeHandler} />
                                                        </div>
                                                    }
                                                    </div>
                                                    <br />
                                                    <div class="form-group">
                                                        <label>Upload your cover letter</label>
                                                        <input type="file" className="form-control-file" id="exampleFormControlFile1" name="coverletter" onChange={this.valueChangeHandler}/>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={this.easyApplyJobHandler}>Submit Application</button>
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

const mapStateToProps = state => ({
    jobSearchReducer: state.jobSearchReducer,
    applicantProfile: state.applicantProfile
  });
  
  export default connect(
    mapStateToProps,
    { jobDetalsByID }
  )(withRouter(JobDetails));