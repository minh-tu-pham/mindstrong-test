import React from 'react';
import { Condition } from '../../types';
import './index.css';

type ConditionSelectProps = {
  disabled: boolean;
  conditionList: Condition[];
  selectedConditionCode: string | undefined;
  onConditionChange: (value: string) => void;
};

function ConditionSelect({
  disabled,
  conditionList,
  selectedConditionCode,
  onConditionChange,
}: ConditionSelectProps) {
  const onSelectCondition = (event: any) => {
    onConditionChange(event.target.value);
  };

  return (
    <div className="condition-select">
      <div className="condition-select-label">Select Condition</div>
      <select
        className="condition-select-list"
        multiple
        size={19}
        disabled={disabled}
        onChange={onSelectCondition}
      >
        {conditionList.map(({ code, description }) => (
          <option key={code} value={code} selected={code === selectedConditionCode}>
            {description}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ConditionSelect;
