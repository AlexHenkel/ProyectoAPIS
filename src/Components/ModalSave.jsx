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
import Input from '../Components/Input'
import MultipleSelect from '../Components/MultipleSelect'
import Select from '../Components/Select'
import FuzzySearch from '../Components/FuzzySearch'
import TagSelect from '../Components/TagSelect'
import MultipleInputs from '../Components/MultipleInputs'

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

  renderField = ({ id, type, inputType, options, optionsLabel, ...inputProps }) => {
    switch (type) {
      case 'textField':
        return (
          <Input
            key={id}
            type={inputType}
            {...inputProps}
          />
        )
      case 'select':
        return (
          <Select
            key={id}
            options={options}
            optionsLabel={optionsLabel}
            {...inputProps}
          />
        )
      case 'fuzzySearch':
        return (
          <FuzzySearch
            key={id}
            options={options}
            optionsLabel={optionsLabel}
            {...inputProps}
          />
        )
      case 'multiSelect':
        return (
          <MultipleSelect
            key={id}
            options={options}
            optionsLabel={optionsLabel}
            {...inputProps}
          />
        )
      case 'tags':
        return (
          <TagSelect
            key={id}
            options={options}
            optionsLabel={optionsLabel}
            {...inputProps}
          />
        )
      case 'multipleInputs':
        return (
          <MultipleInputs
            key={id}
            {...inputProps}
          />
        )
      default:
        return null
    }
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
            {fields.map(item => this.renderField(item))}
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
