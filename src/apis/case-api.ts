import mockIcd10 from './mock-data/icd-10';
import mockEhrCaseList from './mock-data/ehr-case-list';
import { Case, Condition } from '../types';

export const getConditionListApi = async (): Promise<Condition[]> => {
  return await Promise.resolve(mockIcd10);
};

export const getCaseListApi = async (): Promise<Case[]> => {
  let ehrCaseListStorage: Case[] | string | null =
    localStorage.getItem('ehrCaseList');

  if (!ehrCaseListStorage) {
    localStorage.setItem('ehrCaseList', JSON.stringify(mockEhrCaseList));
    ehrCaseListStorage = mockEhrCaseList;
  } else {
    ehrCaseListStorage = JSON.parse(ehrCaseListStorage) as Case[];
  }

  return await Promise.resolve(ehrCaseListStorage);
};

export const setCaseConditionApi = async (
  caseId: number,
  conditionCode: string,
  doctorId: string
): Promise<boolean> => {
  const caseList: Case[] = await getCaseListApi();

  return await new Promise((resolve, reject) => {
    const caseItem: Case | undefined = caseList.find(({ id }) => id === caseId);
    const conditionItem: Condition | undefined = mockIcd10.find(
      ({ code }) => code === conditionCode
    );
    if (!caseItem) {
      reject(`Case id "${caseId}" not found!`);
    } else if (!conditionItem) {
      reject(`Condition code "${conditionCode}" not found!`);
    } else {
      caseItem.conditionCode = conditionCode;
      caseItem.doctorId = doctorId;
      caseItem.recordedTime = new Date().getTime();
      localStorage.setItem('ehrCaseList', JSON.stringify(caseList));

      setTimeout(() => resolve(true), 1000); // Simulate the API run time
    }
  });
};
