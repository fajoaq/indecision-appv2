import React from 'react';

export const ResultsList = ({decisionList}) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Latest Decision List</h3>
      <button 
        className="button button--link"
      >
        View All
      </button>
    </div>
    { decisionList.length === 0 
      && <p className="widget__message">No decisions have been made.</p>
    }
    {
      decisionList.map((decision) => (
        <div className="option" key={ decision.option }>
          <p className="option__text">{ decision.decisionTitle }</p>
          <p className="option__text">{ decision.option }</p>
        </div>
      ))
    }
  </div>
);

export default ResultsList;
