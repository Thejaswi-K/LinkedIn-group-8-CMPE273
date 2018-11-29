import Card from "@material-ui/core/Card/Card";
import React, { Component } from 'react';
import UserNavbar from "../Navbar/UserNavbar";

class JobDetails extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                {/* <UserNavbar/> */}
                <Card className="w-75 p-3 ml-5">
                    <div className="card-body" display="inline-block">
                        <div className="container" display="inline">
                            <a>
                                <img className="img-thumbnail" src="//vignette.wikia.nocookie.net/bungostraydogs/images/1/1e/Profile-icon-9.png/revision/latest?cb=20171030104015" />
                            </a>
                        </div>
                        <div className="container" display="inline">
                            <div className="card-title">Job Title</div>
                            <div className="container">
                                <span className="card-subtitle md-2 text-muted">Company name . Job location</span>
                            </div>
                            <div className="container">
                                <span className="card-subtitle md-2 text-muted">Posted Time . Views</span>
                            </div>
                            <div>
                                <span></span>
                            </div>
                            <div className="btn-toolbar">
                                <button type="button" className="btn btn-default" name="btn_save" text-color="blue">save</button>
                                <div className="btn btn-primary">Easy Apply</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
         );
    }
}
 
export default JobDetails;
// const details = (props) => {
//     return(
//         <div>
//         <h1> Hello world!</h1>
//             {/* <div className="panel panel-default">
//                 <div className="panel-body">
//                     <div>
//                         <div className="checklist-header-container ">
//                             <h3><span>Describe your property</span></h3>
//                             <hr></hr>
//                         </div>
//                             <div>
//                                 <form role="form">
//                                     <div><span>Start out with a descriptive headline and a detailed summary of your property.</span></div>
//                                     <div className="row headline-container out-of-limits">
//                                         <div className="col-xs-12">
//                                             <div className="form-group floating-label not-empty">
//                                                 <input className="form-control"  aria-label="Headline"
//                                                     aria-invalid="false" aria-describedby="headline__help" id="headline" name="headline"
//                                                     type="text" />
//                                                 </div>
//                                         </div>
//                                     </div>
//                                     <div className="row out-of-limits">
//                                         <div className="col-xs-12">
//                                             <div className="form-group floating-label not-empty">
//                                             <textarea className="FormTextArea__textarea form-control" 
//                                                 aria-label="Property description" aria-describedby="description__help" id="description"
//                                                 name="description" rows="8">avaiable in the prime area</textarea><label className="FormTextArea__floating-label"
//                                                     for="description">Property description</label></div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-xs-12 col-lg-6">
//                                             <div className="form-group floating-label not-empty"><label>Property type</label>
//                                                 <div className="FormSelect__wrapper">
//                                                 <select aria-label="Property type"  name="propertyType"
//                                                     className="form-control FormSelect__select">
//                                                     <option value="apartment">Apartment</option>
//                                                     <option value="barn">Barn</option>
//                                                     <option value="bed &amp; breakfast">Bed &amp; Breakfast</option>
//                                                     <option value="boat">Boat</option>
//                                                     <option value="bungalow">Bungalow</option>
//                                                     <option value="cabin">Cabin</option>
//                                                     <option value="campground">Campground</option>
//                                                     <option value="castle">Castle</option>
//                                                     <option value="chalet">Chalet</option>
//                                                     <option value="country house / chateau">Chateau / Country House</option>
//                                                     <option value="condo">Condo</option>
//                                                     <option value="corporate apartment">Corporate Apartment</option>
//                                                     <option value="cottage">Cottage</option>
//                                                     <option value="estate">Estate</option>
//                                                     <option value="farmhouse">Farmhouse</option>
//                                                     <option value="guest house/pension">Guest House</option>
//                                                     <option value="hostel">Hostel</option>
//                                                     <option value="hotel">Hotel</option>
//                                                     <option value="hotel suites">Hotel Suites</option>
//                                                     <option value="house">House</option>
//                                                     <option value="house boat">House Boat</option>
//                                                     <option value="lodge">Lodge</option>
//                                                     <option value="Mill">Mill</option>
//                                                     <option value="mobile home">Mobile Home</option>
//                                                     <option value="Recreational Vehicle">Recreational Vehicle</option>
//                                                     <option value="resort">Resort</option>
//                                                     <option value="studio">Studio</option>
//                                                     <option value="Tower">Tower</option>
//                                                     <option value="townhome">Townhome</option>
//                                                     <option value="villa">Villa</option>
//                                                     <option value="yacht">Yacht</option>
//                                                 </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-xs-12 col-lg-6">
//                                             <div className="form-group floating-label not-empty">
//                                                 <input className="form-control"  aria-label="Bedrooms"
//                                                     aria-invalid="false" id="bedrooms" name="bedrooms" type="number" step="1" min = "1"/>
//                                                 <label className="" for="bedrooms">Bedrooms</label></div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-xs-12 col-lg-6">
//                                             <div className="form-group floating-label not-empty">
//                                                 <input className="form-control"  aria-label="Accommodates"
//                                                     aria-invalid="false" id="sleeps" name="sleeps" type="number" max="500" min="1"
//                                                     step="1" /><label className="" for="sleeps">Accommodates</label></div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-xs-12 col-lg-6">
//                                             <div className="form-group floating-label not-empty">
//                                                 <input className="form-control"  aria-label="Bathrooms"
//                                                     aria-invalid="false" id="bathrooms" name="bathrooms" type="number" max="500"
//                                                     min="1" step="0.5" /><label className="" for="bathrooms">Bathrooms</label></div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                         <hr></hr>
//                             <div style ={{paddingTop: '10px', paddingBottom: '25px' , textAlign: 'center'}} className="panel-control step-footer-wrapper">
//                                 <div className="row">
//                                     <div id = "back-de" className="col-xs-6">
//                                         <a className="btn btn-default btn-rounded btn-sm" data-toggle="tab" label="Back" href="#location"
//                                         type="button"><span className="btn__label">Back</span></a>
//                                     </div>
//                                     <div id="next-de" className="col-xs-6">
//                                     <a className="btn btn-primary btn-rounded btn-sm" label="Next" data-toggle="tab" href="#photos"
//                                         type="button"><span className="btn__label">Next</span></a></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}
//                 </div>
//     )
// }

// export default details;