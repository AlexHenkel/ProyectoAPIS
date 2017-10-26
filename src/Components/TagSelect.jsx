import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mixin } from 'formsy-react-2'
import { contains, without } from 'ramda'
import Autosuggest from 'react-autosuggest'
import { MenuItem } from 'material-ui/Menu'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { withStyles, withTheme } from 'material-ui/styles'
import { FuzzyContainer, FuzzyInput, getSuggestions, styles } from './FuzzySearch'

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.div`
  background: ${({ theme }) => theme.palette.primary[500]};
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  color: white;
  font-size: 12px;
`

const CloseButton = styled.span`
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
  line-height: 0;
`

class TagSelect extends Mixin {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      formsyValue: props.value,
      suggestions: [],
    }
  }

  componentDidMount() {
    this.setValue(this.state.formsyValue)
  }

  getFilteredSuggestions = () => {
    const value = this.getValue() || []
    const { options, optionsValue } = this.props
    return options.filter(item => !contains(item[optionsValue], value))
  }

  handleSuggestionsFetchRequested = ({ value }) => this.setState({
    suggestions: getSuggestions(value, this.getFilteredSuggestions(), this.props.optionsLabel),
  })

  handleSuggestionsClearRequested = () => this.setState({ suggestions: [] })

  handleChange = (event, { newValue }) => this.setState({ value: newValue })

  handleSuggestionSelected = (event, { suggestion }) => {
    const currValue = this.getValue() || []
    this.setState({ value: '' })
    this.setValue([...currValue, suggestion[this.props.optionsValue]])
  }

  handleRemoveTag = id => () => {
    const newValue = without([id], this.getValue())
    this.setValue(newValue.length ? newValue : undefined)
  }

  handleKeyPress = (e) => {
    if (!this.props.noNewValues && e.which === 13 && this.state.value) {
      const currValue = this.getValue() || []
      this.setValue([...currValue, this.state.value])
      this.setState({ value: '' })
    }
  }

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
    const { label, help, options, optionsLabel, optionsValue, classes, theme } = this.props
    const value = this.getValue()
    return (
      <div>
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
            onKeyUp: this.handleKeyPress,
          }}
        />
        {value && (
          <TagContainer>
            {value.map(item => (
              <Tag key={item} theme={theme}>
                {typeof item === 'number' && options.filter(option => option[optionsValue] === item)[0][optionsLabel]}
                {typeof item === 'string' && item}
                <CloseButton onClick={this.handleRemoveTag(item)}>x</CloseButton>
              </Tag>
            ))}
          </TagContainer>
        )}
      </div>
    )
  }
}

TagSelect.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  options: PropTypes.array.isRequired,
  optionsValue: PropTypes.string,
  optionsLabel: PropTypes.string,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  noNewValues: PropTypes.bool,
}

TagSelect.defaultProps = {
  label: '',
  help: '',
  optionsValue: 'value',
  optionsLabel: 'label',
  noNewValues: false,
}

export default withTheme()(withStyles(styles)(TagSelect))
