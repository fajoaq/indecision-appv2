import React from 'react';
import { connect } from 'react-redux';

export const ResultsList = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Latest Decision List</h3>
      <button 
        className="button button--link"
      >
        View All
      </button>
    </div>
    { props.decisionList.length === 0 
      && <p className="widget__message">No decisions have been made.</p>
    }
    {
      props.decisionList.map((decision) => (
        <div className="option" key={ decision.option }>
          <p className="option__text">{ decision.decisionTitle }</p>
          <p className="option__text">{ decision.option }</p>
        </div>
      ))
    }
  </div>
);

const mapStateToProps = (state) => ({
  decisionList: state.decisions
});

export default connect(mapStateToProps)(ResultsList);
