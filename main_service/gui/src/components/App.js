import React, { Component } from 'react';
import 'black-dashboard/assets/css/black-dashboard.css'

class App extends Component {
  render() {
    return (
        <div className="wrapper ">
            <div data-color="blue" className="sidebar"></div>
            <div className='main-panel'>
                <nav data-color="blue" className="navbar navbar-expand-lg navbar-absolute navbar-transparent"></nav>
<               div className="content">
                    <div className="card" style={{width: '50%'}}>
                        <div className="card-body">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
