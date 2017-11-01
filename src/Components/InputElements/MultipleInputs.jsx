import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mixin } from 'formsy-react-2'
import {
  Button as OriginalButton,
  TextField as OriginalTextField,
} from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import RemoveIcon from 'material-ui-icons/Remove'

const TextField = styled(OriginalTextField)`
  @media (min-width: 600px) {
    min-width: 400px !important;
  }
`

const Button = styled(OriginalButton)`
  margin: 0 5px;
`

class MultipleInputs extends Mixin {
  constructor(props) {
    super(props)

    this.state = {
      value: this.getValue().length ? this.getValue() : [''],
    }
  }

  componentWillReceiveProps({ value }) {
    if (value.length) {
      this.setState({ value })
    }
  }

  updateValue = index => (event) => {
    const { value } = this.state
    value[index] = event.target.value
    this.setValue(value)
    this.setState(value)
  }

  onAddInput = () => {
    this.setState({ value: [...this.state.value, ''] })
    this.setValue([...this.getValue(), ''])
  }

  onRemoveInput = () => {
    const { value } = this.state
    this.setValue(value.slice(0, value.length - 1))
    this.setState({ value: value.slice(0, value.length - 1) })
  }

  render() {
    const { value } = this.state
    const { label } = this.props
    return (
      <div>
        {value.map((currVal, index) => (
          <TextField
            key={index}
            value={currVal}
            onChange={this.updateValue(index)}
            label={`${label} ${index + 1} *`}
            margin="normal"
            fullWidth
            error={currVal === ''}
          />
        ))}
        <Button raised color="accent" onClick={this.onAddInput}>
          <AddIcon />
          Agregar respuesta
        </Button>
        {(value.length > 1) && (
          <Button color="accent" onClick={this.onRemoveInput}>
            <RemoveIcon />
            Borrar respuesta
          </Button>
        )}
      </div>
    )
  }
}

MultipleInputs.propTypes = {
  label: PropTypes.string,
}

MultipleInputs.defaultProps = {
  label: '',
}

export default MultipleInputs
