import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Provider} from "react-redux";
import store from '../store';

import ApplicantProfileView from "./Applicant/ApplicantProfile/ApplicantProfileView"

//Create a Main Component
class Main extends Component {


    render() {
        return (
            <Provider store={store}>
                <div>
                    {/*Render Different Component based on Route*/}


                    <Route path="/applicantprofileview" component={ApplicantProfileView}/>

                </div>
            </Provider>
        )
    }
}

//Export The Main Component
export default Main