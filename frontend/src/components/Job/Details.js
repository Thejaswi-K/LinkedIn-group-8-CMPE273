import React from 'react';
import './jopost.css';
const details = (props) => {
    return(
        <div>
            <div className = "container">
            <h1 data-test-post-page-title="" className="jobs__main-title">
                <b>Step 1:</b> What job do you want to post?
            </h1>
            <form style ={{margin: '0 auto;', width:'250px;'}}>
                <div className="form-row">
                    <div className="col-md-3">
                        <label className = "label-job required" for="validationDefault01">Company</label>
                        <input type="text" className=" form-control input-fields" id="validationDefault01" placeholder="Company"
                            required />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className = "label-job required" for="validationDefault02">Job title</label>
                        <input type="text" className="form-control input-fields" id="validationDefault02" placeholder="Job title" 
                            required />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className = "label-job required" for="validationDefault02">Location</label>
                        <input type="text" className="form-control input-fields" id="validationDefault02" placeholder="Location" 
                            required />
                    </div>
                </div><br/>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label className = "label-job required" for="validationDefault03">Job function (Select up to 3) </label><br></br>
                        <input type="text" className="form-control input-fields" id="validationDefault03" placeholder="Enter Job functions" required />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className = "label-job required" for="validationDefault04">Employment type</label><br></br>
                        <select id="select-input-ember1718" required="" aria-describedby="select-input-error-text-ember1718" data-test-select="" className="form-control select-input__select">
                            <option value="" data-test-select-option="">Choose one…</option>
                            <option value="FULL_TIME" data-test-select-option="">
                                Temporary
                            </option>
                            <option value="PART_TIME" data-test-select-option="">
                                Part-time
                            </option>
                            <option value="CONTRACT" data-test-select-option="">
                                Full-time
                            </option>
                            <option value="TEMPORARY" data-test-select-option="">
                                Contract
                            </option>
                            <option value="VOLUNTEER" data-test-select-option="">
                                Volunteer
                            </option>
                            <option value="INTERNSHIP" data-test-select-option="">
                                Internship
                            </option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label className = "label-job required" for="validationDefault03">Company industry (Select up to 3) </label><br></br>
                        <input type="text" className="form-control input-fields" id="validationDefault03" placeholder="Enter Company industry" required />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className = "label-job required" for="validationDefault04">Seniority level</label><br></br>
                        <select id="select-input-ember1718" required="" aria-describedby="select-input-error-text-ember1718" data-test-select="" className="form-control select-input__select">
                            <option value="" data-test-select-option="">Choose one…</option>
                            <option value="FULL_TIME" data-test-select-option="">
                                Mid-Senior level
                            </option>
                            <option value="PART_TIME" data-test-select-option="">
                                Internship
                            </option>
                            <option value="CONTRACT" data-test-select-option="">
                                Associate
                            </option>
                            <option value="CONTRACT" data-test-select-option="">
                                Entry level
                            </option>
                            <option value="TEMPORARY" data-test-select-option="">
                                Director
                            </option>
                            <option value="VOLUNTEER" data-test-select-option="">
                                Executive
                            </option>
                            <option value="INTERNSHIP" data-test-select-option="">
                                Not Applicable
                            </option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-9">
                        <label className = "label-job required" for="validationDefault01">Job Description</label>
                        <textarea type="text" className=" form-control input-fields" id="validationDefault01" placeholder="Company"
                            required > </textarea>
                    </div>
                </div>
                <br/>
                <div className="row" >
                    <div id = "back-de" className="col-xs-4">
                        <a style = {{backgroundColor: "0073b1"}} className="btn btn-primary" data-toggle="tab" label="Back" href="#location"
                        type="button"><span >Back</span></a>
                        <div style ={{paddingLeft: '40px'}}>
                        <a  className="btn btn-default" data-toggle="tab" label="Back" href="#photos"
                        type="button"><span >Next</span></a>
                        </div>
                    </div>
                </div>
                {/* <div style ={{paddingTop: '10px', paddingBottom: '25px' , textAlign: 'center'}} >
                    <div className="row">
                        <div id = "back-de" className="col-md-6">
                            <a className="btn btn-primary continue-button" data-toggle="tab" label="Back" href="#location"
                            type="button"><span >Back</span></a>
                        </div>
                        <div id="next-de" className="col-md-6">
                        <a className="btn btn-primary btn-rounded btn-sm" label="Next" data-toggle="tab" href="#photos"
                            type="button"><span className="btn__label">Next</span></a></div>
                    </div>
                </div> */}
                {/* <button className="btn btn-primary" type="submit">Submit form</button> */}
            </form>
            </div>
        </div>
    )
}

export default details;