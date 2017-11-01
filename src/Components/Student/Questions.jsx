import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { times, remove } from 'ramda'
import { shuffle } from 'lodash'
import { withTheme } from 'material-ui/styles'
import {
  Paper as OriginalPaper,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from 'material-ui'
import MobileStepper from 'material-ui/MobileStepper'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import NoResults from '../Common/NoResults'

const Container = styled.div`
  flex-grow: 1;
`

const Paper = styled(OriginalPaper)`
  background: ${({ theme }) => theme.palette.background.default} !important;
`

class TextMobileStepper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      answers: times(() => '', props.questions.length),
      hasError: [],
      questions: props.questions.map(({ answers, ...restQuestion }) => ({
        answers: shuffle(answers),
        ...restQuestion,
      })),
    }
  }

  componentWillReceiveProps({ questions }) {
    this.setState({
      answers: times(() => '', questions.length),
      questions: questions.map(({ answers, ...restQuestion }) => ({
        answers: shuffle(answers),
        ...restQuestion,
      })),
    })
  }

  onFinish = () => {
    const { answers, questions } = this.state
    const hasError = []
    answers.forEach((answer, index) => !answer && hasError.push(index + 1))
    if (hasError.length) {
      this.setState({ hasError })
    } else {
      const answersWithId = questions.map(({ id }, index) => ({
        id,
        answer: answers[index],
      }))
      this.props.onFinish(answersWithId)
    }
  }

  handleNext = () => this.setState({ activeStep: this.state.activeStep + 1 })

  handleBack = () => this.setState({ activeStep: this.state.activeStep - 1 })

  handleChange = (event, value) => {
    const { answers, activeStep, hasError } = this.state
    answers[activeStep] = value
    const hadError = hasError.indexOf(activeStep + 1)
    if (hadError >= 0) {
      this.setState({ hasError: remove(hadError, hadError + 1, hasError) })
    }
    this.setState({ answers })
  }

  render() {
    const { theme } = this.props
    const { activeStep, hasError, answers, questions } = this.state

    return (
      <Container>
        <Paper square elevation={0} theme={theme}>
          <Typography type="subheading" gutterBottom>Pregunta {activeStep + 1} de {questions.length}</Typography>
          {hasError.length > 0 && (
            <Typography type="subheading" gutterBottom>Te faltan la preguntas: {hasError.join(', ')}</Typography>
          )}
        </Paper>
        {questions.length ? (
          <div>
            <Typography type="display1" color={hasError.indexOf(activeStep + 1) >= 0 ? 'accent' : 'primary'} gutterBottom>
              {questions[activeStep].question}
            </Typography>
            <FormControl component="fieldset" error={hasError} margin="normal">
              <RadioGroup
                onChange={this.handleChange}
              >
                {questions[activeStep].answers.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item}
                    control={<Radio checked={answers[activeStep] === item} />}
                    label={item}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <MobileStepper
              type="text"
              steps={questions.length}
              position="static"
              activeStep={activeStep}
              nextButton={
                activeStep < questions.length - 1 ? (
                  <Button
                    dense
                    color="accent"
                    onClick={this.handleNext}
                    disabled={activeStep === questions.length - 1}
                  >
                    Siguiente
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                ) : (
                  <Button raised color="accent" onClick={this.onFinish}>Finalizar</Button>
                )
              }
              backButton={
                <Button dense onClick={this.handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Anterior
                </Button>
              }
            />
          </div>
        ) : <NoResults />}
      </Container>
    )
  }
}

TextMobileStepper.propTypes = {
  theme: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  onFinish: PropTypes.func.isRequired,
}

export default withTheme()(TextMobileStepper)
