import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { merge } from 'ramda'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from 'material-ui'
import Slide from 'material-ui/transitions/Slide'

class ModalRemove extends Component {
  componentWillReceiveProps(nextProps) {
    const { success, noReset, resetRemove, onRequestClose, error } = this.props
    // Remove was success
    if (nextProps.success && !success) {
      if (!noReset) {
        onRequestClose()
        resetRemove()
      }
    }

    // Modal action had an error
    if (nextProps.error && !error) {
      onRequestClose()
    }
  }

  handleRequestClose = () => {
    this.props.onRequestClose()
  }

  handleConfirmRemove = () => {
    this.props.removeRequest()
    this.props.onRequestClose()
  }

  render() {
    const { open, loading } = this.props
    return (
      <Dialog
        open={open}
        transition={<Slide direction="up" />}
        keepMounted
        onRequestClose={this.handleRequestClose}
      >
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Al eliminar este elemento, está acción <b>NO</b> se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancelar
          </Button>
          <Button raised onClick={this.handleConfirmRemove} color="accent" disabled={loading}>
            Si, eliminar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ModalRemove.propTypes = {
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
  toRemoveId: PropTypes.number.isRequired, // eslint-disable-line

  /* Redux requirements */
  /** State path of current object. lowercase */
  statePath: PropTypes.string.isRequired, // eslint-disable-line
  /** Redux actions type prefix of current object. UPPERCASE */
  typePrefix: PropTypes.string.isRequired, // eslint-disable-line
  /** Add extra params to dispatch action */
  extraParams: PropTypes.object, // eslint-disable-line
  /** Switch off reset on success */
  noReset: PropTypes.bool,

  /** REDUX PROPS */
  /** Make request to remove item */
  removeRequest: PropTypes.func.isRequired,
  /** Reset redux remove state of current item */
  resetRemove: PropTypes.func.isRequired,
  /** Loading flag while attempting removing */
  loading: PropTypes.bool.isRequired,
  /** Success flag after attempting removing */
  success: PropTypes.bool.isRequired,
  /** Error flag after attempting removing */
  error: PropTypes.bool.isRequired,
}

ModalRemove.defaultProps = {
  open: false,
  onRequestClose: null,
  noReset: false,
}

const mapStateToProps = (state, { statePath }) => ({
  loading: state[statePath].remove.fetching,
  // Get the item to edit
  success: state[statePath].remove.success,
  // Catch error while fetching item to edit
  error: !!state[statePath].remove.error,
})

const mapDispatchToProps = (dispatch, { typePrefix, toRemoveId, extraParams }) => ({
  removeRequest: () => dispatch(merge({
    type: `${typePrefix}_REMOVE_REQUEST`,
    id: toRemoveId,
  }, extraParams)),
  resetRemove: () => dispatch({
    type: `${typePrefix}_REMOVE_RESET`,
  }),
})


export default connect(mapStateToProps, mapDispatchToProps)(ModalRemove)
