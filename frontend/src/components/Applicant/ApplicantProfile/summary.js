import Image from "react-bootstrap/es/Image";
import Profile from "../../../images/profile.jpg"
import Card from "@material-ui/core/Card/Card";

var React = require('react');

function Summary(props) {


    var name = props.firstName + " " + props.lastName;
    var cityState = props.city + ", " + props.state;
    var profileSummary = props.profileSummary;

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


                <h3 className="ml-4">{name}</h3>

                <label className="ml-4">{cityState}</label>

                <hr/>

                <h5 className="ml-4">{profileSummary}</h5>


            </div>


        </Card>


    )


}

export default Summary