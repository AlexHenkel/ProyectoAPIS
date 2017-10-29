import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { merge } from 'ramda'
import { Form as OriginalForm } from 'formsy-react-2'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import {
  DialogContent,
  DialogActions,
  Button,
} from 'material-ui'
import Slide from 'material-ui/transitions/Slide'
import InputManager from '../Components/InputManager'

const Form = styled(OriginalForm)`
  overflow: auto;
`

class ModalSave extends Component {
  componentWillReceiveProps(nextProps) {
    // Modal is trying to open
    if (nextProps.open && !this.props.open) {
      if (nextProps.modalType === 'update') {
        nextProps.getOne()
      }
    }

    // Modal action was success
    if (nextProps.successSave && !this.props.successSave) {
      this.onDismiss()
    }

    // Modal action had an error
    if (nextProps.hasErrorSave && !this.props.hasErrorSave) {
      this.onDismiss()
    }
  }

  /** Function to be executed on click dismiss or close modal */
  onDismiss = () => {
    this.props.resetSave()
    this.props.onRequestClose()
  }

  handleRequestClose = () => {
    this.props.onRequestClose()
  }

  submit = model => this.props.saveAction(model)

  render() {
    const { open, title, modalType, fields, result } = this.props
    return (
      <Dialog
        open={open}
        transition={<Slide direction="up" />}
        onRequestClose={this.handleRequestClose}
      >
        <Form
          onValidSubmit={this.submit}
        >
          <DialogTitle>{modalType === 'create' ? 'Agregar' : 'Editar'} {title}</DialogTitle>
          <DialogContent>
            {fields.filter(({ specificFor }) => !(specificFor && specificFor !== modalType))
              .map(({ ...inputProps }, index) => (
                <InputManager result={result} noValue={modalType === 'create'} key={index} {...inputProps} />
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" raised color="accent">
              Guardar
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    )
  }
}

ModalSave.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  fields: PropTypes.array.isRequired,

  /* Redux requirements */
  /** State path of current object. lowercase */
  statePath: PropTypes.string.isRequired,
  /** Redux actions type prefix of current object. UPPERCASE  */
  typePrefix: PropTypes.string.isRequired,
  toUpdateId: PropTypes.number,
  /**
   * Redux actions type prefix of current object for GET ONE.
   * If it's not set, `toReset` will be used
   */
  getOneTypePrefix: PropTypes.string,
  extraParamsGet: PropTypes.object,
  /** Add extra params to dispatch action */
  extraParamsSave: PropTypes.object,
  /** Custom path to follow on GET_ONE_RESET actions */
  toReset: PropTypes.string,
  /**
   * Complete redux path to get item from state, instead of API.
   * If not set, regular API call will be placed
   */
  getOnePath: PropTypes.string,

  /** REDUX PROPS */
  /** Binded from redux. True when fetching is in progress */
  loading: PropTypes.bool.isRequired,
  /** Binded from redux. Containts getOne result from API, usefull on update */
  result: PropTypes.object.isRequired,
  /** Verify if modal has error while getting data to edit */
  hasErrorResult: PropTypes.bool,
  /** Binded from redux. Contains a success flag of create or update action */
  successSave: PropTypes.bool.isRequired,
  /** Binded from redux. Contains an error flag if create or update actions failed */
  hasErrorSave: PropTypes.bool.isRequired,
  /** Binded from redux. Contains saving flag when action is being fired */
  saving: PropTypes.bool.isRequired,
  /** Get one redux call */
  getOne: PropTypes.func,
  /** Redux call. Fire create or update depending on type */
  saveAction: PropTypes.func.isRequired,
  /** Redux call. Fire reset on dismissing the modal  */
  resetSave: PropTypes.func.isRequired,
}

ModalSave.defaultProps = {
  modalType: 'create',
  toUpdateId: -1,
  getOneTypePrefix: null,
  hasErrorResult: false,
  extraParamsGet: {},
  extraParamsSave: {},
  toReset: null,
  getOnePath: null,
  getOne: null,
}

const mapStateToProps = (state, { statePath, modalType }) => {
  const reduxProps = {
    // Get loading of item to edit
    loading: state[statePath].getOne.fetching,
    // Get the item to edit
    result: state[statePath].getOne.result || {},
    // Catch error while fetching item to edit
    hasErrorResult: state[statePath].getOne.error,
  }
  // Match wording with redux state, since update is a reserved word
  const reduxActionOnPath = modalType === 'update' ? 'upgrade' : 'create'
  // Get the success prop depending on the action of the modal
  reduxProps.successSave = state[statePath][reduxActionOnPath].success
  // Get the error depending on the action of the modal
  reduxProps.hasErrorSave = !!state[statePath][reduxActionOnPath].error
  // Get saving flag while save actions is being executed
  reduxProps.saving = state[statePath][reduxActionOnPath].fetching
  // Return built object
  return reduxProps
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const actions = {}

  const { typePrefix, toReset = typePrefix, getOneTypePrefix = toReset,
    extraParamsGet, extraParamsSave } = ownProps
  const { modalType, toUpdateId, getOnePath } = ownProps
  if (modalType === 'update') {
    // Make api call, activate getOne listener and open loading modal
    if (!getOnePath) {
      actions.getOne = () => dispatch(merge({
        type: `${getOneTypePrefix}_GET_ONE_REQUEST`,
        id: toUpdateId,
      }, extraParamsGet))
    } else {
      // Get element from state and open modal
      actions.getOne = () => dispatch({
        type: `${getOneTypePrefix}_GET_ONE_FROM_STATE`,
        id: toUpdateId,
        path: getOnePath,
      })
    }
    // Set action to dispatch an update request, with the correct id
    actions.saveAction = data => dispatch({
      type: `${typePrefix}_UPDATE_REQUEST`,
      data: merge(data, extraParamsSave),
      id: toUpdateId,
    })

    // Set action to reset redux state for update
    actions.resetSave = () => dispatch({
      type: `${toReset}_UPDATE_RESET`,
    })
  } else {
    // Set action to dispatch a create request
    actions.saveAction = data => dispatch({
      type: `${typePrefix}_CREATE_REQUEST`,
      data: merge(data, extraParamsSave),
    })

    // Set action to reset redux state for create
    actions.resetSave = () => dispatch({
      type: `${toReset}_CREATE_RESET`,
    })
  }

  return actions
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSave)

