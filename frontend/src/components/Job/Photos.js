import React from 'react';
import './jopost.css';
import Dropzone from 'react-dropzone';

const photos =(props)=> {
    return (
        <div className="col-md-7 content-panel-container ">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="checklist-header-container">
                        <div className="le-nav-header">
                            <div style={{ paddingTop: '25px', textAlign: 'center' }} className="le-nav-header">
                                <h2 className="nav-header-text">Add up to 5 photos of your property</h2>
                            </div>
                            <hr></hr>
                        </div>
                        <div style={{ border: '1px, solid red' }} className="pyl-photos-container">
                            <div className="pyl-photos-content">
                                <div className="pyl-photos-photo-drop">
                                    <div id="inside-upload-area">
                                        <div style={{ textAlign: 'center' }} className="pyl-photos-photo-drop-inside">
                                            <div style={{ border: "2px dashed #C0C0C0", margin: "15px" }}>
                                                <h2 className="photo-drop-title text-muted">Drop photos here</h2>
                                                <h2 className="photo-drop-OR text-muted">or</h2>
                                                <h2 className="photo-drop-error text-muted">Only JPEG images are supported</h2>
                                                <Dropzone onDrop={props.photoOneChange}
                                                        multiple
                                                        accept="image/*"
                                                        type="file">
                                                    <div>Drop files to upload.</div>
                                                </Dropzone>
                                            </div><br />
                                            <div>
                                                <label style={{ textAlign: 'center' }} for="uploadPhotoInput" className="photo-drop-button btn btn-primary btn-rounded btn-sm">SELECT PHOTOS</label>
                                                <input style={{ display: 'none' }} onChange= {props.photoOneChange}  type="file" id="uploadPhotoInput" multiple="" />
                                            </div><hr />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ paddingTop: '10px', paddingBottom: '25px', textAlign: 'center' }} className="panel-control step-footer-wrapper">
                                    <div className="row">
                                        <div id="back-ph" className="col-xs-6">
                                        <a className="btn btn-default btn-rounded btn-sm" label="Back" data-toggle="tab" href="#details"
                                            type="button"><span className="btn__label">Back</span></a>
                                        </div>
                                        <div id="next-ph" className="col-xs-6">
                                        <a className="btn btn-primary btn-rounded btn-sm" label="Next" data-toggle="tab" href="#availability"
                                            type="button"><span className="btn__label">Next</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default photos;