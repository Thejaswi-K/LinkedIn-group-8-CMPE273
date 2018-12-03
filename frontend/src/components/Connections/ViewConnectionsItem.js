import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ViewConnectionsItem extends Component {

  render() {
    const { ownerhome } = this.props;

    return (
      
      <div className="card card-body bg-light mb-3">
      <div className="row">

        <div className="col-1">
        
        </div>

        <div className="col-3">
        <h4>{ownerhome.acceptedFrom}</h4>
        </div>
        <div className="col-5">
        
        </div>
        <div className="col-2">
        
        </div>
        <div className="col-1">
        
        </div>
        
      </div>
    </div>
      
    );
  }
}

ViewConnectionsItem.propTypes = {
  ownerhome: PropTypes.object.isRequired
};

export default ViewConnectionsItem;
