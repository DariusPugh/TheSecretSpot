import * as reimbursementDao from '../dao/reimbursement-dao';

export function save(user) {
    return reimbursementDao.saveUser(user);
}
/**********************************
 * find all users by status (works)
 **********************************/
export function findAllByStatus(status) {
    return reimbursementDao.findAllByStatus(status);
}

export function saveRequest(items) {
    return reimbursementDao.saveRequest(items);
}

export function viewUserRequests(user) {
    return reimbursementDao.viewUserRequests(user);
}