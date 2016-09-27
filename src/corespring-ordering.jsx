import React from 'react';
import _ from 'lodash';
import Sortable from 'react-sortablejs';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CorespringShowCorrectAnswerToggle from 'corespring-show-correct-answer-toggle-react'

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


  render() {

    const order = this.state.showingCorrect ? this.props.model.correctResponse : this.state.order;
    const choices = order.map(
      (val, key) => {
        let choice = _.find(this.props.model.choices, (c) => { return c.id === val });
        let outcome = this.state.showingCorrect ? {outcome: 'correct'} : _.find(this.props.model.outcomes, (c) => { return c.id === val });
        let choiceClass = 'choice ' + (outcome || {}).outcome;
        return <li className="choice-list-item" key={key} data-id={val}><div className={choiceClass}>{choice.label}</div></li>;
      }
    );

    const toggler = this.props.model.correctResponse ? <CorespringShowCorrectAnswerToggle initialValue={false} onToggle={this.toggleCorrect.bind(this)}/> : null;
    const className =  "corespring-ordering " //+ this.props.model.env.mode;
    let myAnswer = (className) => { return <div className={className} key={1}>
      <Sortable
        options={{
          animation: 150,
          disabled: this.props.model.disabled
        }}
        className="choice-list"
        tag="ul"
        onChange={(order, sortable, evt) => {
          this.setState({order: order});
          this.props.session.value = order;
        }}
      >
        {choices}
      </Sortable>
    </div>; }
    const maybeMyAnswer = this.state.showingCorrect ? '' : myAnswer('choices-wrapper');

    const correctAnswer = this.state.showingCorrect ? <div className="choices-wrapper" key={2}>
      <Sortable
        options={{
          animation: 150,
          disabled: this.props.model.disabled
        }}
        className="choice-list"
        tag="ul"
        onChange={(order, sortable, evt) => {
          this.setState({order: order});
          this.props.session.value = order;
        }}
      >
        {choices}
      </Sortable>
    </div> : '';

    return (
      <div className={className}>Ordering
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