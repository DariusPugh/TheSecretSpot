import { approveDenyTypes } from "./approve-deny.types";


export const updateApprove = () => (dispatch: any) => {
  fetch('http://localhost:3001/reimbursement/username/requests/approve')
    .then(resp => resp.json())
    .then(data => {
      dispatch({
        payload: {
          data
        },
        type: approveDenyTypes.UPDATE_APPROVE,
      })
    })
    .catch(err => {
      console.log(err);
    })

  
}
