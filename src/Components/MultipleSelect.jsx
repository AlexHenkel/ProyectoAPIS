import React from 'react'
import PropTypes from 'prop-types'
import { Mixin } from 'formsy-react-2'
import { contains, remove, indexOf } from 'ramda'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
} from 'material-ui'

class MultipleSelect extends Mixin {
  handleChange = id => (event, checked) => {
    const currVal = this.getValue() || []
    if (checked) {
      this.setValue([...currVal, id])
    } else if (currVal.length === 1) {
      this.setValue(undefined)
    } else {
      this.setValue(remove(indexOf(id, currVal), 1, currVal))
    }
  }

  render() {
    const { label, help, options, optionsLabel, optionsValue } = this.removeFormsyProps(this.props)
    const errorMessages = this.getErrorMessages()
    const hasError = !!errorMessages.length || this.showRequired()
    return (
      <FormControl component="fieldset" error={hasError} margin="normal">
        <FormLabel component="legend">{`${label} ${this.isRequired() ? '*' : ''}`}</FormLabel>
        {options.map(item => (
          <FormGroup key={item[optionsValue]}>
            <FormControlLabel
              control={
                <Checkbox
                  // TODO: Check if this will be an array of id's or objects
                  checked={contains(item[optionsValue], this.getValue() || [])}
                  onChange={this.handleChange(item[optionsValue])}
                />
              }
              label={item[optionsLabel]}
            />
          </FormGroup>
        ))}
        <FormHelperText>{errorMessages.length ? errorMessages : help}</FormHelperText>
      </FormControl>
    )
  }
}

MultipleSelect.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  options: PropTypes.array.isRequired,
  optionsValue: PropTypes.string,
  optionsLabel: PropTypes.string,
}

MultipleSelect.defaultProps = {
  label: '',
  help: '',
  optionsValue: 'value',
  optionsLabel: 'label',
}

export default MultipleSelect
