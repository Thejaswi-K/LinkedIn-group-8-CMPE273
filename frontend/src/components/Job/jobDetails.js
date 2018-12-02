import Card from "@material-ui/core/Card/Card";
import React, { Component } from 'react';
import axios from "axios";
import UserNavbar from "../Navbar/UserNavbar";
import jwt_decode from "jwt-decode";

class JobDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobData: "",
            applicantData:"",
            jobId: this.props.location.jobId,
            savedStatus:false,
            appliedStatus:false,
            easyApply: false,
            hearaboutus:"",
            sponsorship:"",
            diversity:"",
            disability:"",
            resume:"",
            coverletter:""
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
                resume:  e.target.files
            });
        }else if(e.target.name == 'coverletter'){
            console.log("Target files",e.target.files);
            this.setState({
                coverletter:  e.target.files[0].name
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
        console.log("BEARER TOKEN", localStorage.getItem("applicantToken"));
        console.log("email in state", this.state.email);
        //localStorage.getItem("applicantToken")
        axios.get("http://localhost:3001/applicants/"+"ak@gmail.com",{headers: {'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrQGdtYWlsLmNvbSIsImlzUmVjcnVpdGVyIjpmYWxzZSwiaWF0IjoxNTQzNzE4OTAyLCJleHAiOjE1NDM3MjI1MDJ9.iQ-4zEUwwDDvxtrZijUPQBxyzLxKpMnUO6jP_gfscvc"}}) 
        .then(response => {
            console.log("response in applicant details retrieval",response.data);
            this.setState({
                applicantData: response.data
            })
        })
        .catch(function(error){
            console.log("error in receiving applicant details to front end", error);
        })
    }
    
    saveHandler = (e) => {
        e.preventDefault();
        // axios.post("http://localhost:3001/applicants/"+"ak@gmail.com"+"/jobs/"+"5bfc781de8df91050d1b4852"+"/save")
        // .then(response=>{
        //     this.setState({
        //         savedStatus: true
        //     })
        // })
        // .catch(function(error){
        //     console.log(error);
        // });
    };

    applyJobHandler = (e) => {
        e.preventDefault();
        window.open('http://localhost:3000/jobApply',"_blank");
    };
    easyApplyJobHandler = (e) => {
        e.preventDefault();
        //easyApply API
        axios.defaults.withCredentials = true;
        const { resume } = this.state;
        let formData = new FormData();
        formData.append('resume', resume);
        axios.post("http://localhost:3001/api/documentsUpload/uploadResume", formData)
        .then((result=>{
            console.log("upload successful");
            const data = {
                firstName: this.state.applicantData.firstName,
                lastName: this.state.applicantData.lastName,
                email: this.state.applicantData.email,
                address: this.state.applicantData.address,
                hearAboutUs: this.state.hearaboutus,
                sponsorship: this.state.sponsorship,
                diversity: this.state.diversity,
                disablility: this.state.disability,
                resume: this.state.resume[0].name,
                coverLetter: this.state.coverletter
            }
            console.log("submit data",data);
    
            axios.post("http://localhost:3001/applicants/"+"ak@gmail.com"+"/jobs/"+"5bfc781de8df91050d1b4852", data)
            .then(response=>{
                this.setState({
                    appliedStatus: true
                })
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
            save = <button type="button" className="btn btn-default" name="btn_save" text-color="blue">save</button>
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
        var prefillData = this.state.applicantData;
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
                                                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St, city state zip" name="address" value={prefillData.address + ", " + prefillData.city + " " + prefillData.state + " " + prefillData.zipcode}/>
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
                                                        <label>Upload your resume</label>
                                                        <input type="file" className="form-control-file" id="exampleFormControlFile1" name="resume" onChange={this.valueChangeHandler}/>
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
 
export default JobDetails;