import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mixin } from 'formsy-react-2'
import { TextField as OriginalTextField } from 'material-ui'

const TextField = styled(OriginalTextField)`
  @media (min-width: 600px) {
    min-width: 400px !important;
  }
`

class Input extends Mixin {
  static defaultProps = {
    type: 'text',
  }

  updateValue = (event) => {
    this.setValue(event.target.value)
  }

  render() {
    const { type, label, help } = this.removeFormsyProps(this.props)
    const errorMessages = this.getErrorMessages()
    const hasError = !!errorMessages.length || this.showRequired()
    return (
      <div>
        <TextField
          error={hasError}
          label={`${label} ${this.isRequired() ? '*' : ''}`}
          type={type}
          value={this.getValue()}
          onChange={this.updateValue}
          helperText={errorMessages.length ? errorMessages : help}
          margin="normal"
          fullWidth
        />
      </div>
    )
  }
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  help: PropTypes.string,
}

Input.defaultProps = {
  type: '',
  label: '',
  help: '',
}

export default Input
