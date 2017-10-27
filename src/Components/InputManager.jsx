import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../Components/Input'
import MultipleSelect from '../Components/MultipleSelect'
import Select from '../Components/Select'
import FuzzySearch from '../Components/FuzzySearch'
import TagSelect from '../Components/TagSelect'
import MultipleInputs from '../Components/MultipleInputs'

const InputManager = ({ id, type, inputType, ...inputProps }) => {
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
          {...inputProps}
        />
      )
    case 'fuzzySearch':
      return (
        <FuzzySearch
          key={id}
          {...inputProps}
        />
      )
    case 'multiSelect':
      return (
        <MultipleSelect
          key={id}
          {...inputProps}
        />
      )
    case 'tags':
      return (
        <TagSelect
          key={id}
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

InputManager.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  inputType: PropTypes.string,
}

InputManager.defaultProps = {
  inputType: '',
}

export default InputManager
