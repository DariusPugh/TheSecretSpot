import { requestTableTypes } from "./request-table.types";

export const updateStatus = (status: string) => (dispath: any) => {
  return {
    payload: {
      status
    },
    type: requestTableTypes.UPDATE_STATUS,
  }
}

export const updateReimbursement = (status: string) => (dispatch: any) => {
  fetch('http://localhost:3001/reimbursements/status/' + status , {credentials: 'include'})
    .then(resp => {
      console.log(resp.status)
      if(resp.status === 401 || resp.status === 403) {
        throw new Error('Invalid permissions');
      }
      // console.log(resp.json());
      console.log('here')
      return resp.json();
    })
    .then((reimbursements) => {
      console.log('here')
      dispatch({
        payload: {
          reimbursements
        },
        type: requestTableTypes.UPDATE_REIMBURSEMENT,
      })
    })
    .catch(err => {
      console.log(err);
    });

}

