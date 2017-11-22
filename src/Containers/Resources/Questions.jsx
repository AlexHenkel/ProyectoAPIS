import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Typography,
  CardContent,
  Button,
} from 'material-ui'
import AddIcon from 'material-ui-icons/Add'
import styled from 'styled-components'
import OriginalCheckIcon from 'material-ui-icons/Check'
import { withTheme } from 'material-ui/styles'
import { AlignCenter, Card, CardText } from '../../Components/Common/Utils'
import ContextMenu, { ContextContainer } from '../../Components/Common/ContextMenu'
import ModalSave from '../../Components/Common/ModalSave'
import ModalRemove from '../../Components/Common/ModalRemove'
import { Answer } from '../../Components/Teacher/Quiz'
import Loading from '../../Components/Common/Loading'
import NoResults from '../../Components/Common/NoResults'

const CheckIcon = styled(OriginalCheckIcon)`
  position: absolute;
  left: -30px;
`

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
    const { loading, questions, tags, theme, userId } = this.props
    const { modalSaveOpened, modalType, toModifyId, modalRemoveOpened } = this.state
    return (
      <div>
        <Typography type="display1" gutterBottom>Mis preguntas</Typography>
        {loading && <Loading />}
        {!loading && (
          <div>
            <AlignCenter>
              <Button color="accent" onClick={this.onAdd}>
                <AddIcon />
                Agregar pregunta
              </Button>
            </AlignCenter>
            {questions.length ?
              questions.map(({ id, question, correctAnswer, incorrectAnswers, tags: currTags }) => (
                <Card key={id}>
                  <CardContent>
                    <ContextContainer>
                      <ContextMenu
                        value={id}
                        handleEdit={this.onEdit}
                        handleRemove={this.onRemove}
                      />
                    </ContextContainer>
                    <CardText type="title" gutterBottom>
                      {question}
                    </CardText>
                    <CardText component="div">
                      <Answer gutterBottom type="title" color="accent">
                        <CheckIcon /> {correctAnswer}
                      </Answer>
                      {incorrectAnswers.map((incorrectAnswer, index) => (
                        <Answer key={index} gutterBottom type="title">
                          {incorrectAnswer}
                        </Answer>
                      ))}
                    </CardText>
                    <TagContainer>
                      {currTags.map(({ id: tagId, name }) =>
                        <Tag key={tagId} theme={theme}>{name}</Tag>)}
                    </TagContainer>
                  </CardContent>
                </Card>
            )) : <NoResults />}
            <ModalSave
              open={modalSaveOpened}
              title="Pregunta"
              onRequestClose={this.onCloseModalSave}
              modalType={modalType}
              toUpdateId={toModifyId}
              statePath="questions"
              typePrefix="QUESTIONS"
              getOnePath="questions.get.results"
              fields={[
                {
                  type: 'textField',
                  id: 1,
                  name: 'question',
                  path: 'question',
                  label: 'Pregunta',
                  required: true,
                },
                {
                  type: 'textField',
                  id: 2,
                  name: 'correctAnswer',
                  path: 'correctAnswer',
                  label: 'Respuesta correcta',
                  required: true,
                },
                {
                  type: 'multipleInputs',
                  id: 3,
                  name: 'incorrectAnswers',
                  path: 'incorrectAnswers',
                  label: 'Respuesta incorrecta',
                },
                {
                  type: 'tags',
                  id: 4,
                  name: 'tags',
                  path: 'tags',
                  label: 'Tags asociadas',
                  options: tags,
                  optionsValue: 'id',
                  optionsLabel: 'name',
                  help: 'Estas te ayudan a identificar tus preguntas cuando creas un examen',
                },
                {
                  type: 'textField',
                  id: 5,
                  name: 'teacherId',
                  inputType: 'hidden',
                  value: userId,
                },
              ]}
            />
            <ModalRemove
              open={modalRemoveOpened}
              onRequestClose={this.onCloseModalRemove}
              toRemoveId={toModifyId}
              statePath="questions"
              typePrefix="QUESTIONS"
            />
          </div>
        )}
      </div>
    )
  }
}

Questions.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  loading: state.questions.get.fetching,
  questions: state.questions.get.results,
  tags: state.tags.get.results,
  userId: state.user.userId,
})

export default connect(mapStateToProps)(withTheme()(Questions))
