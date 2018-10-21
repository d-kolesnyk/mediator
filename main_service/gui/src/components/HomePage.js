import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
      return (
          <div className="wrapper ">
              <div data-color="blue" className="sidebar"></div>
              <div className='main-panel'>
                  {/* <nav data-color="blue" className="navbar navbar-expand-lg navbar-absolute navbar-transparent"></nav> */}
                  <div className="content">
                      <div className="row">
                          <div className="col-lg-6 col-md-12">
                              <div className="card" data-color="blue" >
                                  <div className="card-header">Living room</div>
                                  <div className="card-body">
                                  <div className="video-black"><div className="loader"></div></div>
                                  <img src="{{ url_for('video_feed') }}"></img>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-6 col-md-12">
                              <div className="card" data-color="blue" >
                                  <div className="card-header">Living room 2</div>
                                  <div className="card-body">
                                  <div className="video-black"><div className="loader"></div></div>
                                  <img src="{{ url_for('video_feed') }}"></img>
                                  </div>
                              </div>
                          </div>
                          <Link to="/login">Logout</Link>
                      </div>
                  </div>
                  <footer className="footer">mediator 2018</footer>
              </div>
          </div>
          
      );
    }
  }
  
  export default HomePage;