import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Button,
} from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter } from '../../Components/Utils'
import ModalSave from '../../Components/ModalSave'
import ModalRemove from '../../Components/ModalRemove'
import Quiz from '../../Components/Quiz'

class Quizes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalType: 'create',
      modalSaveOpened: false,
      modalRemoveOpened: false,
      toModifyId: -1,
    }
  }

  componentDidMount() {
    console.log('load quizes')
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
    const { quizes } = this.props
    const { modalSaveOpened, modalType, toModifyId, modalRemoveOpened } = this.state
    return (
      <div>
        <Typography type="display1" gutterBottom>Mis quizes</Typography>
        <AlignCenter>
          <Button color="accent" onClick={this.onAdd}>
            <AddIcon />
            Agregar quiz
          </Button>
        </AlignCenter>
        {quizes.map(data => (
          <Quiz
            key={data.id}
            data={data}
            onEdit={this.onEdit}
            onRemove={this.onRemove}
          />
        ))}
        <ModalSave
          open={modalSaveOpened}
          title="Quiz"
          onRequestClose={this.onCloseModalSave}
          modalType={modalType}
          toUpdateId={toModifyId}
          fields={[
            {
              type: 'textField',
              id: 1,
              name: 'question',
              label: 'Nombre del quiz',
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

Quizes.propTypes = {
  quizes: PropTypes.array,
}

Quizes.defaultProps = {
  quizes: [
    {
      id: 1,
      name: 'Leyes de Newton',
      createdAt: 1508811671643,
      assigned: 10,
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
    },
    {
      id: 2,
      name: 'Electricidad',
      createdAt: 1508811671643,
      assigned: 10,
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
    },
  ],
}

export default Quizes
