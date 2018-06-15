import { IRequestForm } from '.';
import { requestFormTypes } from '../actions/request-form/request-form.types';


const initialState: IRequestForm = {
  amount: 0,
  description: '',
  title: '',
}

export const requestFormReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case requestFormTypes.UPDATE_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };
    case requestFormTypes.UPDATE_AMOUNT:
      return {
        ...state,
        amount: action.payload.amount
      };
    case requestFormTypes.UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.payload.description
      }
  }

  return state;
};
