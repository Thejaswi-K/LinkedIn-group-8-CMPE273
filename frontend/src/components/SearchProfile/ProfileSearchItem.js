import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProfileSearchItem extends Component {

  render() {
    const { profile } = this.props;

    return (
      
      <div className="card card-body bg-light mb-3">
      <div className="row">

        <div className="col-1">
        
        </div>

        <div className="col-3">
        <h3>{profile.firstName} {profile.lastName}</h3>
        <h5>{profile.city}, {profile.state}</h5>
        </div>
        <div className="col-4">
        {profile.skills}
        </div>
        <div className="col-3">
            <div className="text-right">
                <button type="submit" className="btn btn-primary">
                    Connect
                </button>
            </div>
            <br/>
            <div className="text-right">
                <button type="submit" className="btn btn-primary">
                    Message
                </button>
            </div>
        </div>
        <div className="col-1">
        
        </div>
        
      </div>
    </div>
      
    );
  }
}

ProfileSearchItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileSearchItem;
