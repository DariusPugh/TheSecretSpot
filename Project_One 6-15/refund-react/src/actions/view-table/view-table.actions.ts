import { viewTableTypes } from "./view-table.types";

export const updateUsername = (username: string) => (dispath: any) => {
  return {
    payload: {
      username
    },
    type: viewTableTypes.UPDATE_USERNAME,
  }
}

export const updateView = (username: string) => (dispatch: any) => {
  fetch('http://localhost:3001/reimbursements/username/', {credentials: 'include'})
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
        type: viewTableTypes.UPDATE_VIEW,
      })
    })
    .catch(err => {
      console.log(err);
    });

}

