import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Typography,
  Button,
} from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter } from '../../Components/Utils'
import ModalSave from '../../Components/ModalSave'
import ModalRemove from '../../Components/ModalRemove'
import Quiz from '../../Components/Quiz'
import Loading from '../../Components/Loading'

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
    const { loading, quizes, questions } = this.props
    const { modalSaveOpened, modalType, toModifyId, modalRemoveOpened } = this.state
    return (
      <div>
        <Typography type="display1" gutterBottom>Mis quizes</Typography>
        {loading && <Loading />}
        {!loading && (
          <div>
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
              title="Examen"
              onRequestClose={this.onCloseModalSave}
              modalType={modalType}
              toUpdateId={toModifyId}
              statePath="exams"
              typePrefix="EXAMS"
              getOnePath="exams.get.results"
              fields={[
                {
                  type: 'textField',
                  id: 1,
                  name: 'name',
                  path: 'name',
                  label: 'Nombre del quiz',
                  required: true,
                },
                {
                  type: 'radio',
                  id: 2,
                  name: 'resourceType',
                  path: 'resourceType',
                  label: 'Tipo de recurso',
                  required: true,
                  options: [
                    {
                      value: 'video',
                      label: 'Video',
                    },
                    {
                      value: 'pdf',
                      label: 'PDF',
                    },
                  ],
                  optionsLabel: 'label',
                  optionsValue: 'value',
                },
                {
                  type: 'textField',
                  id: 3,
                  name: 'resource',
                  path: 'resource',
                  label: 'Link del recurso',
                  required: true,
                  validations: 'isUrl',
                  validationErrors: {
                    isUrl: 'Introduce un link válido',
                  },
                },
                {
                  type: 'multiSelectSearch',
                  id: 4,
                  name: 'questions',
                  path: 'questions',
                  label: 'Preguntas del quiz',
                  options: questions,
                  optionsValue: 'id',
                  optionsLabel: 'question',
                  tagsPath: 'tags',
                  required: true,
                },
                {
                  type: 'textField',
                  id: 5,
                  name: 'teacher_id',
                  inputType: 'hidden',
                  value: 1, // TODO: Change this for user id
                  specificFor: 'create',
                },
              ]}
            />
            <ModalRemove
              open={modalRemoveOpened}
              onRequestClose={this.onCloseModalRemove}
              toRemoveId={toModifyId}
            />
          </div>
        )}
      </div>
    )
  }
}

Quizes.propTypes = {
  loading: PropTypes.bool.isRequired,
  quizes: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  loading: state.exams.get.fetching,
  quizes: state.exams.get.results,
  questions: state.questions.get.results,
})


export default connect(mapStateToProps)(Quizes)
