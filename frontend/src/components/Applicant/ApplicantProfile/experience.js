import Card from "@material-ui/core/Card/Card";
import moment from "moment";
import {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {addExperience} from "../../../actions/applicantActions";

var React = require('react');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;


class Experience extends Component {
    added = false;

    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            editing: false,
            title: "",
            company: "",
            location: "",
            description: "",
            from: "",
            to: "",

        }
    }


    render() {
        var show;

        if (this.state.adding) {
            show = this.addingExperience();
        } else if (this.state.editing) {
            // show = this.editingExperience();
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
        if (nextProps.applicantProfile.experience.length > 0) {
            this.expAdded = nextProps.applicantProfile.experience;
            this.setState({editing: false, adding: false});
            this.added = true;
        }

    }


    handleClickAdd() {
        this.setState({
            adding: true
        })
    }

    defaultExperience() {
        if (this.added) {
            this.exp = this.expAdded;
            this.added = false;
        } else {
            this.exp = this.props.experience;
        }
        return (
            <Card className="w-75 p-3 ml-5">

                <div className="card-header">
                    Experience
                    <button className="btn btn-default" onClick={this.handleClickAdd.bind(this)}><span
                        className="glyphicon glyphicon-plus" title="Add Experience">
			</span>
                    </button>
                </div>
                <ul className="list-group list-group-flush">
                    <div className="mt-4">
                        {this.exp.map((experience, index) => (
                            <li key={index} className="ml-5">
                                <h4><strong>{experience.title}</strong>
                                    <button className="btn btn-default ml-4">
                                        <span className="glyphicon glyphicon-pencil" title="Edit Experience"></span>
                                    </button>
                                </h4>
                                <h5>{experience.company}</h5>
                                <h6>{moment(experience.from).format("YYYY")} - {moment(experience.to).format("YYYY")}</h6>
                                <h6>{experience.location}</h6>
                                <h6>
                                <pre style={{
                                    margin: "5px 0px 0px 0px",
                                    fontFamily: "helvetica",
                                    border: "none",
                                    width: "100%",
                                    background: "none",
                                    whiteSpace: "pre-wrap"
                                }}>{experience.description}</pre>
                                    <hr/>
                                </h6>
                            </li>
                        ))}
                    </div>
                </ul>
            </Card>
        )

    }


    addingExperience() {
        return (
            <Card className="w-75 p-3 ml-5">

                <div className="col-md-12">
                    <div className="card-header">
                        Experience
                        <button className="btn btn-default" onClick={this.handleClickAdd.bind(this)}><span
                            className="glyphicon glyphicon-plus" title="Add Experience">
			</span>
                        </button>
                    </div>

                    <div className="col-md-8">
                        <input type="text" name="title" className="form-control" placeholder="Title" onChange={(e) => {
                            this.setState({[e.target.name]: e.target.value})
                        }}/><br/>
                        <input type="text" name="company" className="form-control" placeholder="Company"
                               onChange={(e) => {
                                   this.setState({[e.target.name]: e.target.value})
                               }}/><br/>
                        <div className="input-group">
                            <input type="year" name="from" className="form-control" onChange={(e) => {
                                this.setState({[e.target.name]: e.target.value})
                            }}/>
                            <span className="input-group-addon">-</span>
                            <input type="year" name="to" className="form-control" onChange={(e) => {
                                this.setState({[e.target.name]: e.target.value})
                            }}/>
                        </div>
                        <br/>
                        <input type="text" name="location" className="form-control" placeholder="Location"
                               onChange={(e) => {
                                   this.setState({[e.target.name]: e.target.value})
                               }}/><br/>
                        <textarea className="form-control" rows="6" style={{width: '100%'}} name="description"
                                  placeholder="Description" onChange={(e) => {
                            this.setState({[e.target.name]: e.target.value})
                        }}/><br/>
                        <center>
                            <div className="btn btn-toolbar">
                                <button className="btn btn-primary" onClick={this.handleClickSave.bind(this)}>Save
                                </button>
                                <button className="btn btn-default" onClick={this.handleClickCancel.bind(this)}>Cancel
                                </button>
                            </div>
                        </center>
                        <br/>
                    </div>
                </div>
            </Card>
        )
    }


    handleClickSave() {
        var experience = {
            title: this.state.title,
            company: this.state.company,
            location: this.state.location,
            description: this.state.description,
            from: this.state.from,
            to: this.state.to
        };

        var body = {
            experience: experience,
            email: this.props.applicantEmail
        };

        this.props.addExperience(body);

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

export default connect(mapStateToProps, {addExperience})(Experience);