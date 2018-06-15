import * as reimbursementDao from '../dao/reimbursement-dao';

export function save(user) {
    return reimbursementDao.saveUser(user);
}
/**********************************
 * find all users by status (works)
 **********************************/
export function findAllByStatus(status: string) {
    return reimbursementDao.findAllByStatus(status);
}

export function viewUserRequests(user) {
    return reimbursementDao.viewUserRequests(user);
}


/*************************************************************************
 * Post a new reimbursement request to the table of reimbursement requests
 *************************************************************************/
export function saveRequest(username, reimbursement) {
    return reimbursementDao.saveRequest(username, reimbursement);
}

export function userExists(username) {
    return reimbursementDao.userExists(username);
}

export function applyAction(status: string,username, timeSubmitted) {
    return reimbursementDao.applyAction(status, username, timeSubmitted);
}

