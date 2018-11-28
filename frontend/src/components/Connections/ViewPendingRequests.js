import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ViewPendingRequestsItem from './ViewPendingRequestsItem';
import { getPendingRequets } from '../../actions/connectionActions';


class ViewPendingRequests extends Component {
  arr=[];
    componentDidMount() {
      this.props.getPendingRequets();
      
      }

      componentWillReceiveProps(nextProps){
        if(nextProps.connection.pendingrequests !== undefined){
       this.arr  = nextProps.connection.pendingrequests.connectionsRequests;
          
       console.log("Array is" + this.arr);
        }
       
      }
    
       render() {
        let homeItems;
        

     
        if(this.arr.length>0){
        
        console.log("print all", this.arr);
        homeItems = this.arr.map(ownerhome => (
               
          <div>
              
              <ViewPendingRequestsItem key={ownerhome._id} ownerhome={ownerhome} />
        </div>
      ));
        
        }
        //console.log("type of allconnections:", typeof(this.props.connection.allconnections));
        // let obj =[] 
        //let obj = this.props.connection.allconnections;
       // console.log(allconnections);
        //let temp = obj.connectionsRequests;
        //console.log("temp:", temp);
        // let temp = JSON.parse(obj);
        // console.log(temp.connectionsRequests);
        // let temp = obj.allconnections.connectionsRequests;
        // console.log( temp);
        // console.log("allconnections:_id",allconnections._id,"allConnections:connectionrequests",allconnections.connectionsRequests);
        // let obj = JSON.parse(allconnections);
        // console.log(`after parsing: $typeof{obj}`);

        // console.log(obj.connectionsRequests);
        // console.log(Array.prototype.slice.call(allconnections[1].connectionsRequests));
        // let homeItems, headings;
        
        // if (allconnections === null) {
        //     homeItems = <h4 style={{textAlign:'center', paddingBottom:'214px'}}>No connections available</h4>;
        // } else {
            
        //  if (allconnections.length > 0) {
            
        //     headings=<ViewConnectionsHeading/>
        //     homeItems = allconnections.map(ownerhome => (
               
        //         <div>
        //             <ViewConnectionsItem key={ownerhome._id} ownerhome={ownerhome} />
        //       </div>
        //     ));
            
        //   } else {
        //     homeItems = <h5>there are no connections</h5>;
        //   }
          
        // }
        
        
        
    
        return (
          <div className="homes">
            <div className="container">
            <br/>
              <div className="row">
                <div className="col-md-12">
                  
                  


                  <div className="row">
                  <div className="col-8">
                    <h3 className="display-8 text-left"> Pending Connections</h3>
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


