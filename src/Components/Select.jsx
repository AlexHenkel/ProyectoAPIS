import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Mixin } from 'formsy-react-2'
import {
  FormControl as OriginalFormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Input,
  Select as MUISelect,
} from 'material-ui'

const FormControl = styled(OriginalFormControl)`
  @media (min-width: 600px) {
    width: 100% !important;
    min-width: 400px !important;
  }
`

class Select extends Mixin {
  updateValue = (event) => {
    this.setValue(event.target.value)
  }

  handleChange = event => this.setValue(event.target.value)

  render() {
    const { id, label, help, options,
      optionsLabel, optionsValue } = this.removeFormsyProps(this.props)
    const errorMessages = this.getErrorMessages()
    const hasError = !!errorMessages.length || this.showRequired()
    return (
      <FormControl error={hasError} margin="normal">
        <InputLabel htmlFor={`select-${id}`}>{`${label} ${this.isRequired() ? '*' : ''}`}</InputLabel>
        <MUISelect
          value={this.getValue() || ''}
          onChange={this.handleChange}
          input={<Input id={`select-${id}`} />}
        >
          {options.map(item => (
            <MenuItem key={item[optionsValue]} value={item[optionsValue]}>
              {item[optionsLabel]}
            </MenuItem>
          ))}
        </MUISelect>
        <FormHelperText>{errorMessages.length ? errorMessages : help}</FormHelperText>
      </FormControl>
    )
  }
}

Select.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  options: PropTypes.array.isRequired,
  optionsValue: PropTypes.string,
  optionsLabel: PropTypes.string,
}

Select.defaultProps = {
  label: '',
  help: '',
  optionsValue: 'value',
  optionsLabel: 'label',
}

export default Select
