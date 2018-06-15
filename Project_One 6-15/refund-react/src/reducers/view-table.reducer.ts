import { IViewTable } from '.';
import { viewTableTypes } from '../actions/view-table/view-table.types';

const initialState: IViewTable = {
  reimbursements: [
  ],
  username: 'admin'
}

export const viewTableReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case viewTableTypes.UPDATE_VIEW:
      return {
        ...state,
        reimbursements: action.payload.reimbursements
      }
    case viewTableTypes.UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload.username
      }
  }

  return state;
};