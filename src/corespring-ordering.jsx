import React from 'react';
import _ from 'lodash';
import Sortable from 'react-sortablejs';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CorespringShowCorrectAnswerToggle from 'corespring-show-correct-answer-toggle-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ToggleCorrect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false
    };
  }

  onClick() {
    this.setState({isOn: !this.state.isOn});
    this.props.onToggle(!this.state.isOn);
  }

  render() {
    return <div onClick={this.onClick.bind(this)}>{{true: 'Hide', false: 'Show'}[this.state.isOn]} Correct {this.state.isOn.toString()}</div>
  }
}


class CorespringOrdering extends React.Component {

  constructor(props) {
    super(props);
    console.log('p', props);
    this.state = {
      order: _.isEmpty(props.session.value) ? _.map(props.model.choices, 'id') : props.session.value,
      showingCorrect: false
    };
  }

  toggleCorrect(val) {
    this.setState({showingCorrect: val});
  }

  //TODO: can we set the drag cursor? https://github.com/RubaXa/Sortable/issues/246
  render() {

    const order = this.state.showingCorrect ? this.props.model.correctResponse : this.state.order;
    
    const choices = order.map(
      (val, key) => {
        let choice = _.find(this.props.model.choices, (c) => { return c.id === val });
        let outcome = this.state.showingCorrect ? {outcome: 'correct'} : _.find(this.props.model.outcomes, (c) => { return c.id === val });
        let choiceClass = 'choice ';
        choiceClass += (outcome || {outcome: ''}).outcome;
        choiceClass += this.props.model.disabled ? ' disabled' : '';

        return <div className="choice-list-item" key={key} data-id={val}><div className={choiceClass}>{choice.label}</div></div>;
      }
    );

    const toggler = this.props.model.correctResponse ? <CorespringShowCorrectAnswerToggle initialValue={false} onToggle={this.toggleCorrect.bind(this)}/> : null;
    let className =  "corespring-ordering " //+ this.props.model.env.mode;
    className += this.props.model.className || '';
    
    let sortOpts = {
       animation: 150,
       disabled: this.props.model.disabled
     };
        
    let sortChange = (order, sortable, evt) => {
      this.setState({order: order});
      this.props.session.value = order;
    };

    let myAnswer = (className) => { return <div className={className} key={1}>
      <Sortable
        options={sortOpts}
        className="choice-list"
        tag="div"
        onChange={sortChange}>
        {choices}
      </Sortable>
    </div>; }
    
    const maybeMyAnswer = this.state.showingCorrect ? '' : myAnswer('choices-wrapper');

    const correctAnswer = this.state.showingCorrect ? <div className="choices-wrapper" key={2}>
      <Sortable
        options={sortOpts} 
        className="choice-list"
        tag="div"
        onChange={sortChange}>
        {choices}
      </Sortable>
    </div> : '';

    return (
      <MuiThemeProvider>
        <div className={className}>
          {toggler}
          <div className="choices-container">
            {myAnswer('place-holder-choices')}

            <ReactCSSTransitionGroup
              transitionName="choice-holder-transition"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>

              {maybeMyAnswer}
              {correctAnswer}

            </ReactCSSTransitionGroup>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

CorespringOrdering.propTypes = {
  model: React.PropTypes.object,
  session: React.PropTypes.object
};

CorespringOrdering.defaultProps = {
  session: {
    value: []
  }
};

export default CorespringOrdering;