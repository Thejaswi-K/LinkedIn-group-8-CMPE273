import Image from "react-bootstrap/es/Image";
import Card from "@material-ui/core/Card/Card";
import {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {editSummary} from "../../../actions/recruiterActions";
import {getPhoto, postPhotos} from "../../../actions/photoActions";

var React = require('react');

class Summary extends Component {
    added = false;
    imageBase = [];

    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            editing: false,
            name: "",
            city: "",
            state: "",
            companyName: "",
            profileImage: ""
        };
        this.getPhoto = false;
        this.handleClicked = false;
        this.edit = false;


    }


    render() {
        var show;

        if (this.state.adding) {
            //   show = this.addingSummary();
        } else if (this.state.editing) {
            show = this.editingSummary();
        } else {
            show = this.defaultExperience();
        }

        return (
            <div>
                {show}
                <hr></hr>
            </div>
        )

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.applicantProfile.summary.firstName !== undefined && !this.handleClicked) {
            this.sumAdded = nextProps.applicantProfile.summary;
            this.setState({editing: false, adding: false});
            this.handleGetPhoto(this.sumAdded.profileImage);
            this.added = true;
        } else if (this.getPhoto) {
            let imagePreview = 'data:image/jpg;base64, ' + nextProps.photos.photo;
            this.imageBase.push(imagePreview);
            this.setState({
                imagePushed: true
            })
        } else if (nextProps.applicantProfile.summary.firstName == undefined && nextProps.profileImage !== "" && !this.getPhoto) {
            this.handleGetPhoto(nextProps.profileImage);
        }

    }

    handleDrop = files => {
        // Push all the axios request promise into a single array
        // Initial FormData
        const formData = new FormData();
        formData.append("file", files);
        this.uid = new Date().valueOf();
        formData.append("imagename", files.name);
        this.state.profileImage = files.name;

        console.log(files.name);


        formData.append("timestamp", (Date.now() / 1000) | 0);

        this.props.postPhotos(formData);
    };

    handleGetPhoto = (imgName) => {
        this.props.getPhoto(imgName);
        this.getPhoto = true;
        if(this.edit){
            this.handleClicked = true;
        }

    };


    defaultExperience() {
        if (this.added) {
            this.sum = this.sumAdded;
            this.added = false;
        } else {
            this.sumProp = {
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                city: this.props.city,
                state: this.props.state,
                companyName: this.props.companyName
            };
            this.sum = this.sumProp;
        }

        var
            name = this.sum.firstName + " " + this.sum.lastName;
        var
            cityState = this.sum.city + ", " + this.sum.state;
        var
            companyName = this.sum.companyName;

        return (
            <Card className="w-75 p-3 ml-5" style={{overflow: "auto", height: "auto"}}>

                <div>

                    <div style={{
                        alignItems: 'center',
                        width: "100px",
                        height: "100px",
                        margin: "1px",
                        overflow: "auto"
                    }}>


                        <Image src={this.imageBase[0]} rounded/>
                    </div>
                </div>


                <h3 className="ml-4">{name}
                    <button className="btn btn-default" onClick={this.handleClickEdit.bind(this)}><span
                        className="glyphicon glyphicon-edit" title="Edit Experience">
			                </span>
                    </button>
                </h3>

                <label className="ml-4">{cityState}</label>

                <h5 className="ml-4">{companyName}</h5>

                <hr/>


            </Card>


        )
    }

    editingSummary() {
        var
            name = this.sum.firstName + " " + this.sum.lastName;
        var
            cityState = this.sum.city + ", " + this.sum.state;
        var
            companyName = this.sum.companyName;


        return (
            <Card className="w-75 p-3 ml-5">
                <div className="col-md-12">

                    <div className="col-md-8">

                        <div style={{margin: "1px"}}>

                            <div style={{
                                alignItems: 'center',
                                width: "100px",
                                height: "100px",
                                overflow: "auto",
                                padding: "1px",
                                backgroundColor: "white"

                            }}>
                                <Image src={this.imageBase[0]} circle/>


                            </div>
                            <input type="file" onChange={(e) => this.handleDrop(e.target.files[0])}/>


                            <input className="ml-4" ref="firstName" defaultValue={this.sum.firstName}/>
                            <input className="ml-4" ref="lastName" defaultValue={this.sum.lastName}/>

                            <input className="ml-4" ref="city" defaultValue={this.sum.city}/>
                            <input className="ml-4" ref="state" defaultValue={this.sum.state}/>

                            <hr/>

                            <input className="ml-4" ref="companyName" defaultValue={companyName}/>

                            <center>
                                <div className="btn btn-toolbar">
                                    <button className="btn btn-primary"
                                            onClick={this.handleClickSaveEdit.bind(this)}>Save
                                    </button>
                                    <button className="btn btn-default"
                                            onClick={this.handleClickCancel.bind(this)}>Cancel
                                    </button>

                                </div>
                            </center>
                            <br/>

                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    handleClickEdit(index) {
        this.setState({editing: true, indexToEdit: index});
    }

    handleClickSaveEdit() {
        var experience = {
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            city: this.refs.city.value,
            state: this.refs.state.value,
            companyName: this.refs.companyName.value,
            profileImage: this.state.profileImage
        };


        var body = {
            summary: experience,
            email: this.props.applicantEmail
        };

        this.props.editSummary(body);
        this.edit = true;

    }

    handleClickCancel() {
        this.setState({editing: false});
        this.setState({adding: false});
    }

}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile,
    photos: state.photos
});

export default connect(mapStateToProps, {editSummary, postPhotos, getPhoto})(Summary);


