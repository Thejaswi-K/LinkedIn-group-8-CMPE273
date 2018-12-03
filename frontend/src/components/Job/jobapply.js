import React, { Component } from 'react';
import Card from "@material-ui/core/Card/Card";
import ProfileNavbar from "../Navbar/applicantNavbar";
import {CONSTANTS} from '../../Constants';
class JobApply extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname:"",
            lastname:"",
            email:"",
            address: "",
            hearaboutus:"",
            sponsorship:"",
            diversity:"",
            disability:"",
            resume:"",
            coverletter:""
        }
        this.applyJobHandler = this.applyJobHandler.bind(this);
        this.valueChangeHandler = this.valueChangeHandler.bind(this);
        this.backHandler = this.backHandler.bind(this);
    }
    valueChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
            console.log(this.state);
    }
    applyJobHandler = (e) => {
        //apply job
    }
    backHandler = (e) => {
        window.close();
    }
    render() { 
        return ( 
            <div>
                <ProfileNavbar />
                <Card className="w-80 p-3 ml-5">
                    <form className="form-group">
                        <div className="row">
                            <div className="col">
                                <label>First name</label>
                                <input type="text" className="form-control" placeholder="First name" name="firstname" />
                            </div>
                            <div className="col">
                                <label>Last name</label>
                                <input type="text" className="form-control" placeholder="Last name" name="lastname" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress">email</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="email" name="email"  />
                        </div>
                        <br />
                        <br />
                        <div class="form-group">
                            <label for="inputAddress">Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St, city state zip" name="address" />
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
                        <div class= "form-group btn-toolbar">
                            <button type="button" className="btn btn-default" onClick={this.backHandler}>Back</button>
                            <button type="button" className="btn btn-primary" onClick={this.applyJobHandler}>Submit Application</button>
                        </div>
                    </form>
                </Card>
            </div>
         );
    }
}
 
export default JobApply;