import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Components/Input'
import MultipleSelect from '../Components/MultipleSelect'
import Select from '../Components/Select'
import FuzzySearch from '../Components/FuzzySearch'
import TagSelect from '../Components/TagSelect'
import MultipleInputs from '../Components/MultipleInputs'
import Radio from '../Components/Radio'

const InputManager = ({ type, inputType, ...inputProps }) => {
  switch (type) {
    case 'textField':
      return <Input type={inputType} {...inputProps} />
    case 'select':
      return <Select {...inputProps} />
    case 'fuzzySearch':
      return <FuzzySearch {...inputProps} />
    case 'multiSelect':
      return <MultipleSelect {...inputProps} />
    case 'radio':
      return <Radio {...inputProps} />
    case 'tags':
      return <TagSelect {...inputProps} />
    case 'multipleInputs':
      return <MultipleInputs {...inputProps} />
    default:
      return null
  }
}

InputManager.propTypes = {
  type: PropTypes.string.isRequired,
  inputType: PropTypes.string,
}

InputManager.defaultProps = {
  inputType: '',
}

export default InputManager
