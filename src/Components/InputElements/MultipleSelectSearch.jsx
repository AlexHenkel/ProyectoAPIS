import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mixin } from 'formsy-react-2'
import { remove } from 'ramda'
import {
  FormControl as OriginalFormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
  Typography,
  TextField,
} from 'material-ui'
import { withTheme } from 'material-ui/styles'

const accentMap = {
  á: 'a',
  é: 'e',
  í: 'i',
  ó: 'o',
  ú: 'u',
}

const replaceAccent = char => accentMap[char] ? accentMap[char] : char

const formatWord = word => word.split('').map(i => replaceAccent(i.toLowerCase())).join('')

const FormControl = styled(OriginalFormControl)`
  width: 100%;
  max-height: 500px;
  overflow: scroll;
  @media (min-width: 600px) {
    width: 552px !important;
  }
`

const TagContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.span`
  background: ${({ theme }) => theme.palette.primary[500]};
  margin: 5px;
  border-radius: 5px;
  color: white;
  font-size: 10px;
  padding: 4px;
  line-height: 1;
`

class MultipleSelectSearch extends Mixin {
  state = {
    filter: '',
    filteredOptions: this.props.options,
  }

  updateFilter = (event) => {
    const { value } = event.target
    const { options, optionsValue, optionsLabel, tagsPath } = this.props
    const selectedValues = this.getValue() || []
    this.setState({
      filter: value,
      filteredOptions:
        options
          // Filter selected options
          .filter(item =>
            selectedValues.find(i => i === item[optionsValue]) ||
            // // Filter by question name
            formatWord(item[optionsLabel]).search(formatWord(value)) >= 0 ||
            // Filter by tag
            item[tagsPath].find(({ name }) =>
              formatWord(name).search(formatWord(value)) >= 0)),
    })
  }

  handleChange = id => (event, checked) => {
    const currVal = this.getValue() || []
    if (checked) {
      // Add value to array
      this.setValue([...currVal, id])
    } else if (currVal.length === 1) {
      // Remove array to set required errors
      this.setValue(undefined)
    } else {
      // Remove item from array
      const indexToRemove = currVal.findIndex(i => i === id)
      this.setValue(remove(indexToRemove, 1, currVal))
    }
  }

  render() {
    const { theme, label, help, optionsLabel,
      optionsValue, tagsPath } = this.removeFormsyProps(this.props)
    const { filter, filteredOptions } = this.state
    const errorMessages = this.getErrorMessages()
    const hasError = !!errorMessages.length || this.showRequired()

    return (
      <FormControl component="fieldset" error={hasError} margin="normal">
        <FormLabel component="legend">{`${label} ${this.isRequired() ? '*' : ''}`}</FormLabel>
        <TextField
          value={filter}
          onChange={this.updateFilter}
          placeholder="Busca tu pregunta"
          margin="normal"
          fullWidth
        />
        {filteredOptions.map(item => (
          <FormGroup key={item[optionsValue]}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.getValue()
                    ? !!this.getValue().find(i => i === item[optionsValue])
                    : false}
                  onChange={this.handleChange(item[optionsValue])}
                />
              }
              label={(
                <span>
                  <Typography type="title" component="span">{item[optionsLabel]}</Typography>
                  <TagContainer>
                    {item[tagsPath].map(({ id: tagId, name: tagName }) => (
                      <Tag key={tagId} theme={theme} component="span">{tagName}</Tag>
                    ))}
                  </TagContainer>
                </span>
              )}
            />
          </FormGroup>
        ))}
        <FormHelperText>{errorMessages.length ? errorMessages : help}</FormHelperText>
      </FormControl>
    )
  }
}

MultipleSelectSearch.propTypes = {
  theme: PropTypes.object.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
  options: PropTypes.array.isRequired,
  optionsValue: PropTypes.string,
  optionsLabel: PropTypes.string,
}

MultipleSelectSearch.defaultProps = {
  label: '',
  help: '',
  optionsValue: 'value',
  optionsLabel: 'label',
}

export default withTheme()(MultipleSelectSearch)
