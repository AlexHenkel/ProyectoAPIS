import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mixin } from 'formsy-react-2'
import Autosuggest from 'react-autosuggest'
import OriginalTextField from 'material-ui/TextField'
import OriginalPaper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { withStyles } from 'material-ui/styles'

const TextField = styled(OriginalTextField)`
  width: 100%;
`

const Paper = styled(OriginalPaper)`
  position: absolute;
  margin-top: -8px;
  margin-bottom: 24px;
  left: 0;
  right: 0;
`

export const FuzzyInput = ({ label, hasError, errorMessages = [], isRequired,
  help, autoFocus, value, ref, ...other }) => (
    <TextField
      autoFocus={autoFocus}
      value={value}
      InputProps={{
        ...other,
      }}
      inputRef={ref}
      error={hasError}
      label={`${label} ${isRequired ? '*' : ''}`}
      onChange={this.updateValue}
      helperText={errorMessages.length ? errorMessages : help}
      margin="normal"
    />
)

FuzzyInput.propTypes = {
  label: PropTypes.string,
  hasError: PropTypes.bool,
  errorMessages: PropTypes.array,
  isRequired: PropTypes.bool,
  help: PropTypes.string,
  autoFocus: PropTypes.bool,
  value: PropTypes.string,
  ref: PropTypes.func.isRequired,
}

FuzzyInput.defaultProps = {
  label: '',
  hasError: false,
  errorMessages: [],
  isRequired: false,
  help: '',
  autoFocus: false,
  value: '',
}

export const FuzzyContainer = ({ containerProps, children }) => (
  <Paper {...containerProps} square>
    {children}
  </Paper>
)

FuzzyContainer.propTypes = {
  containerProps: PropTypes.object.isRequired,
  children: PropTypes.number.isRequired,
}

const getSuggestions = (value, options, optionsLabel) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : options.filter((option) => {
      const keep =
        count < 5 && option[optionsLabel].toLowerCase().slice(0, inputLength) === inputValue

      if (keep) {
        count += 1
      }

      return keep
    })
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: -theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
})

class FuzzySearch extends Mixin {
  constructor(props) {
    super(props)
    const { options, optionsLabel, optionsValue, value } = props
    const selectedValue = options.filter(item => item[optionsValue] === value)
    this.state = {
      value: selectedValue.length ? selectedValue[0][optionsLabel] : '',
      formsyValue: value,
      suggestions: [],
    }
  }

  componentDidMount() {
    this.setValue(this.state.formsyValue)
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    const { options, optionsLabel } = this.props
    this.setState({
      suggestions: getSuggestions(value, options, optionsLabel),
    })
  }

  handleSuggestionsClearRequested = () => this.setState({ suggestions: [] })

  handleChange = (event, { newValue }) => this.setValue(undefined) ||
    this.setState({ value: newValue })

  handleSuggestionSelected = (event, { suggestion }) => (
    this.setValue(suggestion[this.props.optionsValue])
  )

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const { optionsLabel } = this.props
    const matches = match(suggestion[optionsLabel], query)
    const parts = parse(suggestion[optionsLabel], matches)

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => part.highlight ? (
            <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          ))}
        </div>
      </MenuItem>
    )
  }

  render() {
    const { label, help, optionsLabel, classes } = this.props

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={FuzzyInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={FuzzyContainer}
        onSuggestionSelected={this.handleSuggestionSelected}
        getSuggestionValue={suggestion => suggestion[optionsLabel]}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          autoFocus: true,
          label,
          help,
          errorMessages: this.getErrorMessages(),
          hasError: !!this.getErrorMessages().length || this.showRequired(),
          isRequired: this.isRequired(),
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    )
  }
}

FuzzySearch.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  options: PropTypes.array.isRequired,
  optionsValue: PropTypes.string,
  optionsLabel: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

FuzzySearch.defaultProps = {
  label: '',
  help: '',
  optionsValue: 'value',
  optionsLabel: 'label',
}

export default withStyles(styles)(FuzzySearch)
