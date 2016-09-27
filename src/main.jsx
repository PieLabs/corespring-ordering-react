import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var style = require('!style!css!less!./index.less');

import CorespringOrdering from './corespring-ordering.jsx'

class Main extends React.Component {
  render() {
    console.log("props", this.props);
    return <div>
      <MuiThemeProvider>
        <CorespringOrdering
          model={this.props.model}
          session={this.props.session}
        >
        </CorespringOrdering>
      </MuiThemeProvider>
    </div>
  }
}


export default Main;