import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Typography,
  CardContent,
  Button,
  CardActions as OriginalCardActions,
} from 'material-ui'
import OriginalCheckIcon from 'material-ui-icons/Check'
import moment from 'moment'
import ContextMenu, { ContextContainer } from './ContextMenu'
import { Card, AlignCenter } from './Utils'

const Question = styled(Typography)`
  margin-top: 20px !important;
`

const AnswerTitle = styled(Typography)`
  color: #bbb !important;
  text-transform: uppercase;
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  @media (min-width: 600px) {
    margin-left: 40px !important;
  }
`

export const Answer = styled(Typography)`
  position: relative;
  margin-left: 30px !important;
  @media (min-width: 600px) {
    margin-left: 40px !important;
  }
`

const CheckIcon = styled(OriginalCheckIcon)`
  position: absolute;
  left: -30px;
  top: 3px;
`

const CardActions = styled(OriginalCardActions)`
  justify-content: center;
`

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  toggleOpen = () => this.setState({ open: !this.state.open })

  render() {
    const { data: { id, name, assigned, createdAt, questions }, onEdit, onRemove } = this.props
    const { open } = this.state
    return (
      <Card key={id}>
        <CardContent>
          <ContextContainer>
            <ContextMenu
              value={id}
              handleEdit={onEdit}
              handleRemove={onRemove}
            />
          </ContextContainer>
          <Typography type="display2" gutterBottom align="center" color="primary">{name}</Typography>
          {open && (
            <div>
              <AlignCenter>
                <Button dense color="accent" onClick={this.toggleOpen}>Ocultar Preguntas</Button>
              </AlignCenter>
              <Typography type="body1" gutterBottom>
                Creado: <b>{moment(createdAt).format('ll')}</b>
              </Typography>
              <Typography type="body1" gutterBottom>
                Número de veces asignado: <b>{assigned}</b>
              </Typography>
              {questions.map(({ id: answerId, question, correctAnswer, incorrectAnswers }, i) => (
                <div key={answerId}>
                  <Question type="display1">{i + 1}. {question}</Question>
                  <AnswerTitle type="body2">Respuestas</AnswerTitle>
                  <Answer gutterBottom type="headline" color="accent">
                    <CheckIcon /> {correctAnswer}
                  </Answer>
                  {incorrectAnswers.map((option, incorrectIndex) => (
                    <Answer key={incorrectIndex} gutterBottom type="headline">
                      {option}
                    </Answer>
                  ))}
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardActions>
          <Button dense color="accent" onClick={this.toggleOpen}>{open ? 'Ocultar' : 'Ver'} Preguntas</Button>
        </CardActions>
      </Card>
    )
  }
}

Quiz.propTypes = {
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Quiz
