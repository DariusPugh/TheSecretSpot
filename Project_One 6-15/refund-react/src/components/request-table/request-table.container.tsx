import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { RequestTableComponent } from './request-table.component';
import { updateReimbursement, updateStatus } from '../../actions/request-table/request-table.actions';

const mapStateToProps = (state: IState) => (state.requestTable);

export const mapDispatchToProps = {
  updateReimbursement,
  updateStatus
};

export const RequestTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestTableComponent);
