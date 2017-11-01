import React from 'react'
import styled from 'styled-components'
import { Mixin } from 'formsy-react-2'
import { DatePicker } from 'material-ui-pickers'
import { FormHelperText, FormLabel as OriginalFormLabel } from 'material-ui'

// Hacky, but there's no other choice right now to access the input style
const Container = styled.div`
  div[class^="MuiFormControl"] {
    width: 100%;
  }
`

const FormLabel = styled(OriginalFormLabel)`
  font-size: 12px;
  margin-top: 16px;
  display: block;
`

export default class Datepicker extends Mixin {
  componentDidMount() {
    if (!this.getValue()) {
      this.setValue(Date.now())
    }
  }

  handleDateChange = date => this.setValue(date.valueOf())

  render() {
    const { help, label } = this.props

    return (
      <Container>
        {label && <FormLabel required={this.isRequired()}>{label}</FormLabel>}
        <DatePicker
          value={this.getValue()}
          onChange={this.handleDateChange}
          format="DD-MM-YYYY"
        />
        {help && <FormHelperText>{help}</FormHelperText>}
      </Container>
    )
  }
}
