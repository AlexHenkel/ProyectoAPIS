import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mixin } from 'formsy-react-2'
import { contains, remove, indexOf } from 'ramda'
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
      filteredOptions: options.filter(item => contains(item[optionsValue], selectedValues) ||
        item[optionsLabel].toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
        item[tagsPath].filter(tag =>
          tag.name.toLowerCase().indexOf(value.toLowerCase()) >= 0).length),
    })
  }

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
                  // TODO: Check if this will be an array of id's or objects
                  checked={contains(item[optionsValue], this.getValue() || [])}
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
