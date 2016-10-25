import React, {Component} from 'react';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import Choice from './choice.jsx';

const SortableItem = SortableElement(({choice, disabled}) => {
  return <Choice choice={choice} disabled={disabled}/>
});

const SortableList = SortableContainer(({choices, disabled}) => {
    return (
        <div className="choice-list">
            {choices.map((choice, index) =>
                <SortableItem key={`item-${index}`} disabled={disabled} index={index} choice={choice}/>
            )}
        </div>
    );
});


export default class CorespringOrdering extends Component {

  constructor(props){
    super(props);

    this.state = {
      choices: _.isEmpty(props.session.value) ? _.cloneDeep(props.model.choices) : props.session.value
    }
  }

  onSortEnd (obj) {
    let {oldIndex, newIndex} = obj;
    this.setState({
        choices: arrayMove(this.state.choices, oldIndex, newIndex)
    });
  };

  render() {
    return (
        <MuiThemeProvider
          className="corespring-ordering">
          <SortableList disabled={this.props.model.disabled} choices={this.state.choices} helperClass="helper" onSortEnd={this.onSortEnd.bind(this)} />
        </MuiThemeProvider>
      )
  }
} 