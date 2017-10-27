import React from 'react'
import PropTypes from 'prop-types'
import { Mixin } from 'formsy-react-2'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  FormHelperText,
} from 'material-ui'

class RadioInput extends Mixin {
  handleChange = (event, value) => this.setValue(Number(value))

  render() {
    const { label, help, options, optionsLabel, optionsValue } = this.removeFormsyProps(this.props)
    const errorMessages = this.getErrorMessages()
    const hasError = !!errorMessages.length || this.showRequired()

    return (
      <FormControl component="fieldset" error={hasError} margin="normal">
        <FormLabel component="legend">{`${label} ${this.isRequired() ? '*' : ''}`}</FormLabel>
        <RadioGroup
          onChange={this.handleChange}
        >
          {options.map(item => (
            <FormControlLabel
              key={item[optionsValue]}
              value={item[optionsValue]}
              control={<Radio checked={this.getValue() === item[optionsValue]} />}
              label={item[optionsLabel]}
            />
          ))}
        </RadioGroup>
        <FormHelperText>{errorMessages.length ? errorMessages : help}</FormHelperText>
      </FormControl>
    )
  }
}

RadioInput.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  options: PropTypes.array.isRequired,
  optionsValue: PropTypes.string,
  optionsLabel: PropTypes.string,
}

RadioInput.defaultProps = {
  label: '',
  help: '',
  optionsValue: 'value',
  optionsLabel: 'label',
}

export default RadioInput
