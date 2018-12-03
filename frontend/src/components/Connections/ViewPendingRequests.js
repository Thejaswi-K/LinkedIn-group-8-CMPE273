import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";
import ViewPendingRequestsItem from './ViewPendingRequestsItem';
import { getPendingRequets } from '../../actions/connectionActions';

class ViewPendingRequests extends Component {
  arr=[];
    isApplicantLoggedIn = false;

      componentWillReceiveProps(nextProps){
        if(nextProps.connection.pendingrequests !== undefined){
       this.arr  = nextProps.connection.pendingrequests[0].connectionsRequests;
          
       console.log("Array is " + this.arr);
        }
       
      }

      componentDidMount() {
        if (localStorage.getItem("applicantToken")) {
          let token = localStorage.getItem("applicantToken");
          this.decodedApplicant = jwt_decode(token);
          this.isApplicantLoggedIn = true;
          this.email = this.decodedApplicant.email;
          console.log("Emmail", this.email)

      }
        console.log("Emmail in CDM", this.email)
        this.props.getPendingRequets(this.email);
        
        }
    
       render() {
        let homeItems;
        

     
        if(this.arr.length>0){
        
        console.log("print all", this.arr);
        homeItems = this.arr.map(ownerhome => (
               
          <div>
              
              <ViewPendingRequestsItem key={ownerhome._id} ownerhome={ownerhome} toEmail={ownerhome.requestFrom} />
        </div>
      ));
        
        }
            
        return (
          <div className="homes">
            <div className="container">
            <br/>
              <div className="row">
                <div className="col-md-12">
                  
                  


                  <div className="row">
                  <div className="col-8">
                    <h3 className="display-8 text-left"> Your Pending Requests</h3>
                  </div>
                  <div className="col-2">
                    
                  </div>
                  <div className="col-2">
                    
                  </div>
                </div>
                <br/>

                {homeItems}

                  <br/>
                  <br/> 
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  
                  
                </div>
              </div>
            </div>
          </div>
        );
    
       }
    }
    
    ViewPendingRequests.propTypes = {
      getPendingRequets: PropTypes.func.isRequired,
      connection: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
      connection: state.connection
    });
    
    export default connect(mapStateToProps, { getPendingRequets })(ViewPendingRequests);


