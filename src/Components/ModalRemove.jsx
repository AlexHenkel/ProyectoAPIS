import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from 'material-ui'
import Slide from 'material-ui/transitions/Slide'

class ModalRemove extends Component {
  handleRequestClose = () => {
    this.props.onRequestClose()
  }

  handleConfirmRemove = () => {
    console.log('remove', this.props.toRemoveId)
    this.props.onRequestClose()
  }

  render() {
    const { open } = this.props
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
          <Button raised onClick={this.handleConfirmRemove} color="accent">
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
  toRemoveId: PropTypes.number.isRequired,
}

ModalRemove.defaultProps = {
  open: false,
  onRequestClose: null,
}

export default ModalRemove
