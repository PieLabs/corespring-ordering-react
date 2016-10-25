import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
import React, {Component} from 'react';

class Choice extends Component{

  constructor(props){
    super(props);
  }

  render(){

    console.log(this.props.choice);
    console.log('disabled: ', this.props.disabled);

    let style = {
      cursor: this.props.disabled ? 'auto' : 'cursor'
    }

    let classname = 'choice';
    classname += this.props.disabled ? ' disabled' : '';

    return (
      <Paper ref={(e)=> this.domElement = e} className="choice-list-item" zDepth={1}>
        <div className={classname} style={style}>{this.props.choice.label}</div>
      </Paper>
    )
  }
}

export default muiThemeable()(Choice);