import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ViewTableComponent } from './view-table.component';
import { updateUsername, updateView } from '../../actions/view-table/view-table.actions';

const mapStateToProps = (state: IState) => (state.viewTable);

export const mapDispatchToProps = {
  updateUsername,
  updateView
};

export const ViewTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewTableComponent);
