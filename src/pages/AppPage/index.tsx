import React, { useEffect, useState } from 'react';
import {
  getConditionListApi,
  getCaseListApi,
  setCaseConditionApi,
} from '../../apis/case-api';
import { Case, Condition } from '../../types';
import CaseText from '../../components/CaseText';
import ConditionSelect from '../../components/ConditionSelect';
import './index.css';

function App() {
  const [doctorId] = useState<string>('user1@gmail.com');
  const [conditionList, setConditionList] = useState<Condition[]>([]);
  const [caseList, setCaseList] = useState<Case[]>([]);
  const [currentCase, setCurrentCase] = useState<Case>();
  const [currentConditionCode, setCurrentConditionCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onConditionChange = (conditionCode: string) => {
    setCurrentConditionCode(conditionCode);
  };

  const onSetCaseCondition = async () => {
    if (currentCase && currentConditionCode) {
      setLoading(true);
      await setCaseConditionApi(currentCase.id, currentConditionCode, doctorId);
      setCurrentCase(caseList.shift());
      setCurrentConditionCode(undefined);
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([getConditionListApi(), getCaseListApi()]).then(
      ([newConditionList, newCaseList]) => {
        const noConditionCaseList = newCaseList.filter(
          ({ conditionCode }) => !conditionCode
        );
        setCurrentCase(noConditionCaseList.shift());
        setCaseList(noConditionCaseList);
        setConditionList(newConditionList);
      }
    );
  }, []);

  return (
    <div className="app">
      <div className="app-header" data-testid="app-header">Logged in as: {doctorId}</div>
      <div className="app-container" data-testid="app-container">
        <div className="app-item"  data-testid="app-case-text">
          <CaseText disabled={loading} caseItem={currentCase} />
        </div>
        <div className="app-item" data-testid="app-condition-list">
          <ConditionSelect
            disabled={loading}
            selectedConditionCode={currentConditionCode}
            conditionList={conditionList}
            onConditionChange={onConditionChange}
          />
        </div>
      </div>
      <div className="app-control" data-testid="app-control">
        <button
          disabled={loading || !currentConditionCode || !currentCase}
          onClick={onSetCaseCondition}
        >
          {loading ? 'Setting Case Condition...' : 'Next Case'}
        </button>
      </div>
    </div>
  );
}

export default App;
