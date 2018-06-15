import { IRequestTable } from '.';
import { requestTableTypes } from '../actions/request-table/request-table.types';

const initialState: IRequestTable = {
  reimbursements: [
  ],
  status: 'pending'
  
}

export const requestTableReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case requestTableTypes.UPDATE_REIMBURSEMENT:
      return {
        ...state,
        reimbursements: action.payload.reimbursements
      }
    case requestTableTypes.UPDATE_STATUS:
      return {
        ...state,
        status: action.payload.status
      }
  }

  return state;
};