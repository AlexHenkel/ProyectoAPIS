import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Components/Input'
import MultipleSelect from '../Components/MultipleSelect'
import Select from '../Components/Select'
import FuzzySearch from '../Components/FuzzySearch'
import TagSelect from '../Components/TagSelect'
import MultipleInputs from '../Components/MultipleInputs'
import Radio from '../Components/Radio'
import MultipleSelectSearch from '../Components/MultipleSelectSearch'

const InputManager = ({ noValue, result, value, path, type, inputType, ...inputProps }) => {
  /**
   * If a value is set, keep the value. Else..
   * Recursively get path from result. If result or path are invalid, will be undefined.
   * On create will return an empty array.
   * Then convert invalid tag value into an array to avoid errors
   */
  const currVal = !value ? path.split('.').reduce((acum, currPath) => acum ? acum[currPath] : undefined, result) : value
  // Safe assign value. Handles null and undefined
  const fixedVal  = !value && (noValue || currVal == null) ? type === 'tags' ? [] : '' : currVal // eslint-disable-line

  switch (type) {
    case 'textField':
      return <Input value={fixedVal} type={inputType} {...inputProps} />
    case 'select':
      return <Select value={fixedVal} {...inputProps} />
    case 'fuzzySearch':
      return <FuzzySearch value={fixedVal} {...inputProps} />
    case 'multiSelect':
      return <MultipleSelect value={fixedVal} {...inputProps} />
    case 'radio':
      return <Radio value={fixedVal} {...inputProps} />
    case 'tags':
      return <TagSelect value={fixedVal} {...inputProps} />
    case 'multipleInputs':
      return <MultipleInputs value={fixedVal} {...inputProps} />
    case 'multiSelectSearch':
      return <MultipleSelectSearch value={fixedVal} {...inputProps} />
    default:
      return null
  }
}

InputManager.propTypes = {
  noValue: PropTypes.bool,
  result: PropTypes.object,
  path: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]),
  type: PropTypes.string.isRequired,
  inputType: PropTypes.string,
}

InputManager.defaultProps = {
  noValue: false,
  result: {},
  path: '',
  value: undefined,
  inputType: '',
}

export default InputManager
