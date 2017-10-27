import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  CardContent,
  Button,
} from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter, Card, CardText } from '../../Components/Utils'
import ContextMenu, { ContextContainer } from '../../Components/ContextMenu'
import ModalSave from '../../Components/ModalSave'
import ModalRemove from '../../Components/ModalRemove'

class Questions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalType: 'create',
      modalSaveOpened: false,
      modalRemoveOpened: false,
      toModifyId: -1,
    }
  }

  // /** Fired on add item. Set type of modal and then open modal */
  onAdd = () => this.setState({
    modalType: 'create',
  }, () => this.setState({ modalSaveOpened: true }))

  // /** Fired on update item. Set type of modal, id and then open modal */
  onEdit = id => this.setState({
    modalType: 'update',
    toModifyId: id,
  }, () => this.setState({ modalSaveOpened: true }))

  // /** Function fired on remove item */
  onRemove = id => this.setState({
    toModifyId: id,
    modalRemoveOpened: true,
  })

  onCloseModalSave = () => {
    this.setState({ modalSaveOpened: false })
  }

  onCloseModalRemove = () => {
    this.setState({ modalRemoveOpened: false })
  }

  render() {
    const { questions } = this.props
    const { modalSaveOpened, modalType, toModifyId, modalRemoveOpened } = this.state
    return (
      <div>
        <Typography type="display1" gutterBottom>Mis preguntas</Typography>
        <AlignCenter>
          <Button color="accent" onClick={this.onAdd}>
            <AddIcon />
            Agregar pregunta
          </Button>
        </AlignCenter>
        {questions.map(({ id, question }) => (
          <Card key={id}>
            <CardContent>
              <ContextContainer>
                <ContextMenu
                  value={id}
                  handleEdit={this.onEdit}
                  handleRemove={this.onRemove}
                />
              </ContextContainer>
              <CardText type="headline" component="h2" gutterBottom>
                {question}
              </CardText>
            </CardContent>
          </Card>
        ))}
        <ModalSave
          open={modalSaveOpened}
          title="Pregunta"
          onRequestClose={this.onCloseModalSave}
          modalType={modalType}
          toUpdateId={toModifyId}
          fields={[
            {
              type: 'textField',
              id: 1,
              name: 'question',
              label: 'Título de la pregunta',
              required: true,
            },
            {
              type: 'textField',
              id: 2,
              name: 'correctAnswer',
              label: 'Respuesta correcta',
              required: true,
            },
          ]}
        />
        <ModalRemove
          open={modalRemoveOpened}
          onRequestClose={this.onCloseModalRemove}
          toRemoveId={toModifyId}
        />
      </div>
    )
  }
}

Questions.propTypes = {
  questions: PropTypes.array,
}

Questions.defaultProps = {
  questions: [
    {
      id: 1,
      correctAnswer: '4.56',
      question: '¿Cuál es la magnitud de la gravedad?',
      incorrectAnswers: ['4.56', '9.14', '4.56'],
    },
    {
      id: 2,
      correctAnswer: '9.14',
      question: '¿Cuál es la magnitud de la velocidad?',
      incorrectAnswers: ['4.56', '4.56', '4.56'],
    },
    {
      id: 3,
      correctAnswer: '25.3',
      question: '¿Cuál es la magnitud de la aceleración?',
      incorrectAnswers: ['4.56', '4.56', '4.56'],
    },
  ],
}

export default Questions
