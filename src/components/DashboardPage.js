import React from 'react';
import { connect } from 'react-redux';
import { startAddDecision } from '../actions/decisions';

import AddOption from './AddOption';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';
import ResultsList from './ResultsList';

export class DashboardPage extends React.Component {
  state = {
    options: [],
    decisionTitle: "No decision title.",
    selectedOption: undefined
  };
  handleTitleChange = ({ target }) => {
    this.setState(() => ({ decisionTitle: target.value}));
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    const decisionItem = {
      decisionTitle: this.state.decisionTitle,
      option
    }

    this.setState((prevState) => ({
      selectedOption: option,
      decisionTitle: "No decision title."
    }));

    document.querySelector('#titleInput').value = null;
    this.props.startAddDecision(decisionItem);
  };
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  };
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget widget__input">
            <input className="widget__input-text" id="titleInput" onChange={ this.handleTitleChange } type="text" name="decisionTitle" placeholder={ "Type a question: ex. Where should I vacation?" }  />
          </div>
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
          <div className="widget">
            <ResultsList />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddDecision: (decision) => dispatch(startAddDecision(decision))
});

export default connect(undefined, mapDispatchToProps)(DashboardPage);