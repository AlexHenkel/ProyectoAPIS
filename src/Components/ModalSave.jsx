import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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
  handleRequestClose = () => {
    this.props.onRequestClose()
  }

  handleSave = () => {
    console.log(this.props.modalType, this.props.toUpdateId)
  }

  submit = (model) => {
    console.log(model)
  }

  render() {
    const {
      open,
      title,
      modalType,
      fields,
    } = this.props
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
            {fields.map((item, index) => <InputManager id={index} {...item} />)}
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
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func,
  modalType: PropTypes.string,
  toUpdateId: PropTypes.number,
  fields: PropTypes.array.isRequired,
}

ModalSave.defaultProps = {
  open: false,
  onRequestClose: null,
  modalType: 'create',
  toUpdateId: -1,
}

export default ModalSave
