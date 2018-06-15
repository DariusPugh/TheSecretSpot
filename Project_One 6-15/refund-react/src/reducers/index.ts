import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { requestFormReducer } from "./request-form.reducer";
import { requestTableReducer } from "./request-table.reducer";
import { viewTableReducer } from "./view-table.reducer";
import { Reimbursement } from "../models/reimbursement";
// import { approveDenyReducer } from "./approve-deny.reducer";

export interface IRequestTable {
  reimbursements: Reimbursement[],
  status: string
}
export interface IRequestForm {
  amount: number,
  description: string,
  title: string
}

export interface ISignIn {
  username: string,
  password: string,
  errorMessage: string
}

export interface IViewTable {
  reimbursements: Reimbursement[],
  username: string
};

export interface IApproveDeny {
  approve: string,
  deny: string
}

export interface IState {
  requestForm: IRequestForm,
  signIn: ISignIn,
  requestTable : IRequestTable,
  viewTable : IViewTable
};

export const state = combineReducers<IState>({
  // approveDeny: approveDenyReducer,
  requestForm: requestFormReducer,
  requestTable: requestTableReducer,
  signIn: signInReducer,
  viewTable: viewTableReducer
});