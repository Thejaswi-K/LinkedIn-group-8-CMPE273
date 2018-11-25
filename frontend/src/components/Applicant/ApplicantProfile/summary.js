import Image from "react-bootstrap/es/Image";
import Profile from "../../../images/profile.jpg"
import Card from "@material-ui/core/Card/Card";
import {Component} from "react";
import moment from "moment";
import connect from "react-redux/es/connect/connect";
import {addExperience, editExperience, editSummary} from "../../../actions/applicantActions";

var React = require('react');

class Summary extends Component {
    added = false;

    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            editing: false,
            name: "",
            city: "",
            state: "",
            profileSummary: "",
            profileImage: ""
        }
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
        if (nextProps.applicantProfile.summary.firstName !== undefined) {
            this.sumAdded = nextProps.applicantProfile.summary;
            this.setState({editing: false, adding: false});
            this.added = true;
        }

    }


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
                profileSummary: this.props.profileSummary
            };
            this.sum = this.sumProp;
        }

        var
            name = this.sum.firstName + " " + this.sum.lastName;
        var
            cityState = this.sum.city + ", " + this.sum.state;
        var
            profileSummary = this.sum.profileSummary;

        return (
            <Card className="w-75 p-3 ml-5" style={{overflow: "auto", height: "auto"}}>

                <div style={{margin: "1px"}}>

                    <div style={{
                        alignItems: 'center',
                        width: "100px",
                        height: "auto",

                        padding: "1px",
                        backgroundColor: "white"

                    }}>
                        <Image src={Profile} circle/>


                    </div>


                    <h3 className="ml-4">{name}
                        <button className="btn btn-default" onClick={this.handleClickEdit.bind(this)}><span
                            className="glyphicon glyphicon-edit" title="Edit Experience">
			                </span>
                        </button>
                    </h3>

                    <label className="ml-4">{cityState}</label>

                    <hr/>

                    <h5 className="ml-4">{profileSummary}</h5>


                </div>

            </Card>


        )
    }

    editingSummary() {
        var
            name = this.sum.firstName + " " + this.sum.lastName;
        var
            cityState = this.sum.city + ", " + this.sum.state;
        var
            profileSummary = this.sum.profileSummary;


        return (
            <Card className="w-75 p-3 ml-5">
                <div className="col-md-12">

                    <div className="col-md-8">

                        <div style={{margin: "1px"}}>

                            <div style={{
                                alignItems: 'center',
                                width: "100px",
                                height: "auto",

                                padding: "1px",
                                backgroundColor: "white"

                            }}>
                                <Image src={Profile} circle/>


                            </div>


                            <input className="ml-4" ref="firstName" defaultValue={this.sum.firstName}/>
                            <input className="ml-4" ref="lastName" defaultValue={this.sum.lastName}/>

                            <input className="ml-4" ref="city" defaultValue={this.sum.city}/>
                            <input className="ml-4" ref="state" defaultValue={this.sum.state}/>

                            <hr/>

                            <input className="ml-4" ref="profileSummary" defaultValue={profileSummary}/>

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
            profileSummary: this.refs.profileSummary.value

        };


        var body = {
            summary: experience,
            email: this.props.applicantEmail
        };

        this.props.editSummary(body);

    }

    handleClickCancel() {
        this.setState({editing: false});
        this.setState({adding: false});
    }

}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile
});

export default connect(mapStateToProps, {editSummary})(Summary);


