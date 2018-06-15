import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { RequestFormComponent } from './request-form.component';
import { updateTitle, updateAmount, updateDescription } from '../../actions/request-form/request-form.actions';

const mapStateToProps = (state: IState) => (state.requestForm);

export const mapDispatchToProps = {
  updateAmount,
  updateDescription,
  updateTitle
};

export const RequestFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestFormComponent);
