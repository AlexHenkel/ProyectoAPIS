import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mixin } from 'formsy-react-2'
import { TextField as OriginalTextField } from 'material-ui'
import moment from 'moment'

const TextField = styled(OriginalTextField)`
  ${({ hidden }) => !hidden ? '' : 'display: none !important;'}
  @media (min-width: 600px) {
    min-width: 400px !important;
  }
`

class Input extends Mixin {
  updateValue = (event) => {
    const { value } = event.target
    if (value && this.props.type === 'datetime-local') {
      this.setValue(moment(value).valueOf())
    } else {
      this.setValue(value)
    }
  }

  parseInput = () => {
    const value = this.getValue()
    if (value && this.props.type === 'datetime-local') {
      return moment(value).format('YYYY-MM-DDThh:mm')
    }
    return value
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
          hidden={type === 'hidden'}
          value={this.parseInput()}
          onChange={this.updateValue}
          helperText={errorMessages.length ? errorMessages : help}
          margin="normal"
          InputLabelProps={type === 'datetime-local' ? {
            shrink: true,
          } : {}}
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
  type: 'text',
  label: '',
  help: '',
}

export default Input
