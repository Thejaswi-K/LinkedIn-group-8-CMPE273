import React, { Component } from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import './jopost.css';
import $ from 'jquery';
import Welcome from './Welocome';
// import Details from './Details';
import Photos from './Photos';
import JobNavbar from '../Navbar/JobNavbar';
import * as Validate from '../../validation/ValidationUtil';
import jwtDecode from 'jwt-decode';
// import {postPropertyData} from '../../actions/index';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom';
import {CONSTANTS} from '../../Constants';

class PostJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
                email: jwtDecode(localStorage.getItem('recruiterToken')).email,
                jobCompany: "",
                jobTitle: "",
                jobLocation: "",
                jobFunction: "",
                jobEmploymentType: "",
                jobIndustry: "",
                jobDescription: "",
                jobEasyApply: false,
                jobCompanyLogo : [],
                jobsavedBy: [],
                messagediv:"",
                jobIsPosted: false

        }
        // Bind the handlers to this class
        this.jobCompanyChangeHandler = this.jobCompanyChangeHandler.bind(this);
        this.jobTitleChangeHandler = this.jobTitleChangeHandler.bind(this);
        this.jobLocationChangeHandler = this.jobLocationChangeHandler.bind(this);
        this.jobFunctionChangeHandler = this.jobFunctionChangeHandler.bind(this);
        this.jobEmploymentTypeChangeHandler = this.jobEmploymentTypeChangeHandler.bind(this);
        this.jobIndustryChangeHandler = this.jobIndustryChangeHandler.bind(this);
        this.jobDescriptionChangeHandler = this.jobDescriptionChangeHandler.bind(this);
        this.jobEasyApplyChangeHandler = this.jobEasyApplyChangeHandler.bind(this);
        this.jobsavedByChangeHandler = this.jobsavedByChangeHandler.bind(this);
        this.jobCompanyLogoDrop = this.jobCompanyLogoDrop.bind(this);
    }

    componentDidMount = () => {
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
            //Continue button handle
            $('#continueNext').on('click', function() {
                $('#wc').removeClass('active');
                $('#wc a').attr("aria-expanded","false");
                $('#lc').addClass('active');
                $('#lc a').attr("aria-expanded","true");
            });
            //Next-Location button handle
            $('#next-lc').on('click', function() {
                $('#lc').removeClass('active');
                $('#lc a').attr("aria-expanded","false");
                $('#de').addClass('active');
                $('#de a').attr("aria-expanded","true");
            });
            //Back-Location button handle
            $('#back-lc').on('click', function() {
                $('#lc').removeClass('active');
                $('#lc a').attr("aria-expanded","false");
                $('#wc').addClass('active');
                $('#wc a').attr("aria-expanded","true");
            });
            //Next-Details button handle
            $('#next-de').on('click', function() {
                $('#de').removeClass('active');
                $('#de a').attr("aria-expanded","false");
                $('#ph').addClass('active');
                $('#ph a').attr("aria-expanded","true");
            });
            //Back-Details button handle
            $('#back-de').on('click', function() {
                $('#de').removeClass('active');
                $('#de a').attr("aria-expanded","false");
                $('#lc').addClass('active');
                $('#lc a').attr("aria-expanded","true");
            });
            //Next-Photo button handle
            $('#next-ph').on('click', function() {
                $('#ph').removeClass('active');
                $('#ph a').attr("aria-expanded","false");
                $('#av').addClass('active');
                $('#av a').attr("aria-expanded","true");
            });
            //Back-Photo button handle
            $('#back-ph').on('click', function() {
                $('#ph').removeClass('active');
                $('#ph a').attr("aria-expanded","false");
                $('#de').addClass('active');
                $('#de a').attr("aria-expanded","true");
            });
            //Next-Availability button handle
            $('#next-av').on('click', function() {
                $('#av').removeClass('active');
                $('#av a').attr("aria-expanded","false");
                $('#pr').addClass('active');
                $('#pr a').attr("aria-expanded","true");
            });
            //Back-Availability button handle
            $('#back-av').on('click', function() {
                $('#av').removeClass('active');
                $('#av a').attr("aria-expanded","false");
                $('#ph').addClass('active');
                $('#ph a').attr("aria-expanded","true");
            });
            //Back-Pricing button handle
            $('#back-pr').on('click', function() {
                $('#pr').removeClass('active');
                $('#pr a').attr("aria-expanded","false");
                $('#av').addClass('active');
                $('#av a').attr("aria-expanded","true");
            });
        });
    }

    //Company change handler to update state variable with the text entered by the user
    jobCompanyChangeHandler = (e) => {
        const jobCompany = e.target.value;
        this.setState({
                ...this.state,
                jobCompany : jobCompany
        })
    }
    //Job Title change handler to update state variable with the text entered by the user
    jobTitleChangeHandler = (e) => {
        const jobTitle= e.target.value;
        this.setState({
                ...this.state,
                jobTitle : jobTitle
        })
    }
    //Job Location change handler to update state variable with the text entered by the user
    jobLocationChangeHandler = (e) => {
        const jobLocation = e.target.value;
        this.setState({
                ...this.state,
                jobLocation : jobLocation
        })
    }
    //Job Function change handler to update state variable with the text entered by the user
    jobFunctionChangeHandler = (e) => {
        const jobFunction = e.target.value;
        this.setState({
                ...this.state,
                jobFunction : jobFunction
        })
    }
    //Employment Type change handler to update state variable with the text entered by the user
    jobEmploymentTypeChangeHandler = (e) => {
        const jobEmploymentType = e.target.value;
        this.setState({
                ...this.state,
                jobEmploymentType : jobEmploymentType
        })
    }
    //Job Industry change handler to update state variable with the text entered by the user
    jobIndustryChangeHandler = (e) => {
        const jobIndustry = e.target.value;
        this.setState({
                ...this.state,
                jobIndustry : jobIndustry
        })
    }
    //Job Description change handler to update state variable with the text entered by the user
    jobDescriptionChangeHandler = (e) => {
        const jobDescription = e.target.value;
        this.setState({
                ...this.state,
                jobDescription : jobDescription
        })
    }
    //Job Easy Apply change handler to update state variable with the text entered by the user
    jobEasyApplyChangeHandler = (e) => {
        const jobEasyApply = e.target.value;
        this.setState({
        ...this.state,
                jobEasyApply : jobEasyApply
        })
    }
    //Job Saved By change handler to update state variable with the text entered by the user
    jobsavedByChangeHandler = (e) => {
        const jobsavedBy = e.target.value;
        this.setState({
                ...this.state,
                jobsavedBy : jobsavedBy
        })
    }

    //Property Photo change handler to update state variable with the text entered by the user
    jobCompanyLogoDrop = files => {
        // Push all the axios request promise into a single array
            const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            this.uid = new Date().valueOf();
            formData.append("imagename", file.name);
            this.state.jobCompanyLogo.push(file.name);
            console.log(file.name);
            formData.append("timestamp", (Date.now() / 1000) | 0);

            return axios.post(`${CONSTANTS.BACKEND_URL}/uploadImages`, formData, {
                params: {
                    imagename: file.name
                }
            })
                .then(response => {
                    const data = response.data;
                    // const fileURL = data.secure_url // You should store this URL for future references in your app
                    console.log(data);
                    if (response.status === 200) {
                        console.log("Photo uploaded successfully.")
                    }
                })
        });

        // Once all the files are uploaded
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation
        });
    }

    //Post Job handler to send a request to the node back-end
    postJob = (event) => {
        //prevent page from refresh
        event.preventDefault();
        let valid = '';
        // let valid = Validate.postproperty(this.state);
        if(valid === '') {
            const jobData = {
                        ...this.state
                }
            this.props.postjobData( jobData,false);
            //Post Call to post Property Details in DB
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(`${CONSTANTS.BACKEND_URL}/postproperty`,
            jobData,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            })
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 201){
                    this.setState({
                        ...this.state,
                        jobIsPosted : true
                    })
                    this.props.postjobData(jobData,true);
                    console.log("message:", response.data.message);
                    alert("Your job was successfully posted.");
                }else{
                    this.setState({
                        ...this.state,
                        jobIsPosted : false
                    })
                    this.props.postPropertyData(jobData,false);
                    alert("Your job was not successfully posted.");
                }
            })
            .catch( error =>{
                console.log("error:", error);
            });
        } else {
            this.setState({
                ...this.state,
                messagediv: valid
            });
            event.preventDefault();
        }
    }

    render() {
        let message = null;
        if(this.state.messagediv !== ''){
            message = (
                <div className="clearfix">
                    <div className="alert alert-info text-center" role="alert">{this.state.messagediv}</div>
                </div>
            );
        } else {
            message = (
                <div></div>
            );
        }
        // redirect based on successful login
        let redirectVar = null;
        // if (!localStorage.getItem('token')) {
        //     redirectVar = <Redirect to="/job"/>
        //     return (redirectVar);
        // } else if(this.state.propIsPosted) {
        //     redirectVar = <Redirect to ="/job"/>
        //     return(redirectVar);
        // } else {
            return (
                <div>
                    <JobNavbar/>
                    <div className = "row">
                        {message}
                    </div>
                    <div className="wrapper">
                        <nav id="sidebar">
                            <div id = "sidebarCollapse" className="sidebar-header" style={{paddingTop:"50px", paddingBottom: "0px"}}>
                                <h3 style= {{fontSize: "25px"}}>Job Details</h3>
                                <strong>JD</strong>
                            </div>
                            <ul className="list-unstyled components">
                                <li id = "wc" className= "active">
                                    <a href="#welcome" data-toggle="tab" aria-expanded = "false">
                                        <i className="fa fas fa-home"></i>
                                        Welcome
                                    </a>
                                </li>
                                <li id = "lc">
                                    <a href="#location" data-toggle="tab" aria-expanded = "false" >
                                    <i class="fa fas fa-location-arrow"></i>
                                        Location
                                     </a>
                                </li>
                                <li id = "de">    
                                    <a href="#details" data-toggle="tab" aria-expanded = "false">
                                        <i className="fa fas fa-copy"></i>
                                        Details
                                    </a>
                                </li>
                                <li id = "ph">
                                    <a href="#photos" data-toggle="tab" aria-expanded = "false">
                                        <i className="fa fas fa-image"></i>
                                        Photos
                                    </a>
                                </li>
                                {/* <li id = "av">
                                    <a href="#availability" data-toggle="tab" aria-expanded = "false">
                                    <i class="fa fas fa-calendar"></i>
                                        Availability
                                    </a>
                                </li>
                                <li id = "pr">
                                    <a data-toggle="tab" href="#pricing" aria-expanded = "false">
                                    <i class="fa far fa-credit-card"></i>
                                        Pricing
                                    </a>
                                </li> */}
                            </ul>
                        </nav>
                        <div className="col-sm-10">
                            <div id = "side" className="tab-content">
                                <div id="welcome" className="tab-pane fade in active">
                                    <Welcome />
                                </div>
                                <div id="details" className="tab-pane fade">
                                    {/* <Details 
                                    headlineChange = {this.propHeadlineChangeHandler}
                                    descriptionChange = {this.propDescriptionChangeHandler}
                                    typeChange = {this.propTypeChangeHandler}
                                    bedroomsChange = {this.propBedroomChangeHandler}
                                    guestCountChange = {this.propGuestCountChangeHandler}
                                    bathroomsChange = {this.propBathroomsChangeHandler}
                                    /> */}
                                </div>
                                <div id="photos" className="tab-pane fade" >
                                    <Photos 
                                    // photoOneChange = {this.propPhotohandleDrop}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        // }
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         postPropertyData: (propertyData, isPosted) => dispatch(postPropertyData(propertyData, isPosted)),
//     };
// }

// function mapStateToProps(state) {
//     return{
//         propertyData : state.propertyData,
//     };
// }
// const postproperty = withRouter(connect(mapStateToProps, mapDispatchToProps)(PostProperty));
// export default postproperty;
export default PostJob;