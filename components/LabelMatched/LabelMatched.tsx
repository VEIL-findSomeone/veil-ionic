import React from 'react';
import './LabelMatched.scss';

type Props = {};

const LabelMatched: React.FC<Props> = () => {
  return (
    <div className="label-matched">
      <div className="matched-title">
        <div className="text-its">ITS A</div>
        <div className="text-match">
          <div>MATCH!</div>
          <div>MATCH!</div>
          <div>MATCH!</div>
        </div>
      </div>
    </div>
  );
};

export default LabelMatched;
