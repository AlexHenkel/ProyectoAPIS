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
import Slide from 'material-ui/transitions/Slide'
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog'
import ContextMenu, { ContextContainer } from '../Common/ContextMenu'
import { Card, AlignCenter } from '../Common/Utils'
import { getLink, getHeight } from '../Common/VideoUtils'

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
      modalOpen: false,
    }
  }

  getResourceType = (resourceType) => {
    switch (resourceType) {
      case 'youtube':
        return 'Video de YouTube'
      case 'drive-video':
        return 'Google Drive - Video'
      case 'drive-pdf':
        return 'Google Drive - PDF'
      case 'pdf':
        return 'PDF'
      case 'embed':
        return 'Código embebido'
      default:
        return null
    }
  }

  setModalState = modalOpen => () => this.setState({ modalOpen })

  toggleOpen = () => this.setState({ open: !this.state.open })

  render() {
    const { data: { id, name, resourceType, resource, createdAt, questions },
      onEdit, onRemove } = this.props
    const { open, modalOpen } = this.state
    const iFrameLink = getLink(resource, resourceType)

    return (
      <div>
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
                  Tipo de recurso: <b>{this.getResourceType(resourceType)}</b>
                </Typography>
                <Typography type="body1" gutterBottom>
                  Creado: <b>{moment.unix(createdAt).format('ll')}</b>
                </Typography>
                <br />
                <Typography type="body1" gutterBottom>
                  Al hacer click a este botón, puedes verificar que tu recurso se esté
                  mostrando correctamente a tus alumnos
                </Typography>
                <Button raised onClick={this.setModalState(true)} color="primary">Verificar link</Button>
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
        <Dialog
          open={modalOpen}
          transition={<Slide direction="up" />}
          onRequestClose={this.setModalState(false)}
        >
          <DialogTitle>Recurso</DialogTitle>
          <DialogContent>
            {iFrameLink !== 'error' ? (
              <iframe
                src={iFrameLink}
                width="100%"
                height={getHeight(resourceType, resource)}
                title="Resource"
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              <Typography>
                Lo sentimos, hay un error en tu link. Por favor verificalo y vuelve a intentar
              </Typography>
            )}
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

Quiz.propTypes = {
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Quiz
