import React from 'react';
import { Case } from '../../types';
import './index.css';

type CaseTextProps = {
  disabled: boolean;
  caseItem?: Case;
};

function CaseText({ disabled, caseItem }: CaseTextProps) {
  return (
    <div className="case-text">
      <div className="case-text-label">Please Review this Case</div>
      <textarea
        data-testid="case-textarea"
        disabled={disabled}
        className="case-text-box"
        value={caseItem ? caseItem.description : 'You are done'}
        rows={25}
        onChange={() => {}}
      ></textarea>
    </div>
  );
}

export default CaseText;
