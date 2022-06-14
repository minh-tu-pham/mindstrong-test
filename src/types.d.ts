export type Case = {
  id: number,
  description: string,
  conditionCode?: string,
  doctorId?: string,
  recordedTime?: number
};

export type Condition = {
  code: string,
  description: string
};
