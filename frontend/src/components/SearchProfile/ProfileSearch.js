import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearchedProfiles } from '../../actions/searchProfileActions';
import ProfileSearchItem from './ProfileSearchItem';
//import { Link } from 'react-router-dom';
//import classnames from 'classnames';


class ProfileSearch extends Component {
  arr=[]
    constructor(){
        super();
        this.state={
          firstName:''
    
        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount() {
      
      this.props.getSearchedProfiles()
    }

    componentWillReceiveProps(nextProps){
     // if(nextProps.connection.allconnections !== undefined){
     this.arr  = nextProps.searchProfile.searchedprofiles.SearchedProfile;
        
     console.log("Array is" + this.arr);
     // }
     
    }
    
onChange(e){
    this.setState({[e.target.name]:e.target.value});
}
    
onSubmit(e){
        e.preventDefault();
    
        const searchdata={
               
          firstName:this.state.firstName
        };
        this.props.getSearchedProfiles(searchdata)
    }
  render() {
    let profileItems;
        

     
        if(this.arr.length>0){
        
        console.log("print all", this.arr);
        profileItems = this.arr.map(profile => (
               
          <div>
              
              <ProfileSearchItem key={profile._id} profile={profile} />
        </div>
      ));
        
        }
   

    return (
        <div className="login">
        <div className="container">
        <br/>
        <br/>
          <div className="row">
            <div className="col-md-5 m-auto">
              <h2 className="display-8 text-center">Search Profile</h2>
              
              
              <br/>
              <form onSubmit={this.onSubmit}>

              <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search by Email"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                  
                  
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>

              

              
            </div>
          </div>
          <br/>
              {profileItems}
        </div>
        
      </div>
    )
  }
}

ProfileSearch.propTypes ={
  getSearchedProfiles: PropTypes.func.isRequired,
  searchProfile: PropTypes.object.isRequired
}

const mapStateToProps=(state) => ({
  searchProfile:state.searchProfile,
});

export default connect(mapStateToProps, {getSearchedProfiles}) (ProfileSearch);