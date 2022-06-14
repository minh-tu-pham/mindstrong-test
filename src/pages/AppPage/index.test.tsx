import React from 'react';
import { render, screen } from '@testing-library/react';
import { getConditionListApi, getCaseListApi } from '../../apis/case-api';
import AppPage from '.';
import mockConditionList from '../../apis/mock-data/icd-10';
import { Case } from '../../types';

const mockCaseList: Case[] = [
  {
    id: 1,
    description: 'Case Text',
  },
];

jest.mock('../../apis/case-api', () => ({
  getConditionListApi: jest.fn(() => Promise.resolve(mockConditionList)),
  getCaseListApi: jest.fn(() => {
    console.log('Case?');
    return Promise.resolve(mockCaseList);
  }),
}));

test('renders needed elements', () => {
  render(<AppPage />);

  const headerElement = screen.getByTestId('app-header');
  expect(headerElement).toBeInTheDocument();

  const containerElement = screen.getByTestId('app-container');
  expect(containerElement).toBeInTheDocument();

  const caseTextElement = screen.getByTestId('app-case-text');
  expect(caseTextElement).toBeInTheDocument();

  const conditionListElement = screen.getByTestId('app-condition-list');
  expect(conditionListElement).toBeInTheDocument();

  const controlElement = screen.getByTestId('app-control');
  expect(controlElement).toBeInTheDocument();
});

test('runs needed APIs', () => {
  render(<AppPage />);

  expect(getConditionListApi).toHaveBeenCalled();
  expect(getCaseListApi).toHaveBeenCalled();
});
