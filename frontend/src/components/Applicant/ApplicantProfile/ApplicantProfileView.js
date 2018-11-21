import React, {Component} from 'react';
import Experience from "./experience";
import Education from "./education";
import Summary from "./summary";


class ApplicantProfileView extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
                <Summary/>

                <br/><br/>

                <Experience/>

                <br/><br/>

                <Education/>

            </div>






        )

    }


}

export default ApplicantProfileView;