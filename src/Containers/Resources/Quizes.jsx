import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Typography,
  Button,
} from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter } from '../../Components/Common/Utils'
import ModalSave from '../../Components/Common/ModalSave'
import ModalRemove from '../../Components/Common/ModalRemove'
import Quiz from '../../Components/Teacher/Quiz'
import Loading from '../../Components/Common/Loading'
import NoResults from '../../Components/Common/NoResults'

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
    const { loading, quizes, questions, userId } = this.props
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
            {quizes.length ? quizes.map(data => (
              <Quiz
                key={data.id}
                data={data}
                onEdit={this.onEdit}
                onRemove={this.onRemove}
              />
            )) : <NoResults />}
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
                  name: 'teacherId',
                  inputType: 'hidden',
                  value: userId,
                  specificFor: 'create',
                },
              ]}
            />
            <ModalRemove
              open={modalRemoveOpened}
              onRequestClose={this.onCloseModalRemove}
              toRemoveId={toModifyId}
              statePath="exams"
              typePrefix="EXAMS"
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
  userId: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  loading: state.exams.get.fetching,
  quizes: state.exams.get.results,
  questions: state.questions.get.results,
  userId: state.user.userId,
})


export default connect(mapStateToProps)(Quizes)
