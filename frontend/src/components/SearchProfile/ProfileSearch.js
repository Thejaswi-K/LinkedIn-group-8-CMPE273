import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSearchedProfiles} from '../../actions/searchProfileActions';
import ProfileSearchItem from './ProfileSearchItem';
import ApplicantNavBar from '../Navbar/applicantNavbar'

class ProfileSearch extends Component {
    arr = [];

    constructor(props) {
        super(props);
    }





    render() {
        // let profileItems;
        // this.arr = this.props.searchProfile.searchedprofiles.SearchedProfile;


        // if (this.arr.length > 0) {
        //
        //     console.log("print arr", this.arr);
        //     profileItems =
        //         </div>
        //     ));
        //
        // } else {
        //     profileItems = <div className="text-center"><h4>Please Search By Name. No Results Found</h4></div>
        // }


        return (

            <div >
                <ApplicantNavBar/>
                <div className="container">
                    
                    {this.props.searchProfile.searchedprofiles.SearchedProfile.map((profile) => (

                    <div>

                        <ProfileSearchItem key={profile._id} profile={profile} toEmail={profile.email}
                                           toFirstName={profile.firstName}/>

                </div>
                    ))}

            </div>
            </div>
        )
    }
}

ProfileSearch.propTypes = {
    getSearchedProfiles: PropTypes.func.isRequired,
    searchProfile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    searchProfile: state.searchProfile,
});

export default connect(mapStateToProps, {getSearchedProfiles})(ProfileSearch);