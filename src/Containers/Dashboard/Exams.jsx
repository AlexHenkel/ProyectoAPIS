import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Typography,
  Card as OriginalCard,
  CardContent,
  CardActions as OriginalCardActions,
  Button,
  Grid,
  LinearProgress,
} from 'material-ui'
import moment from 'moment'
import { withTheme } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter } from '../../Components/Utils'
import ContextMenu, { ContextContainer } from '../../Components/ContextMenu'
import ModalSave from '../../Components/ModalSave'
import ModalRemove from '../../Components/ModalRemove'

const Card = styled(OriginalCard)`
  margin: 15px 0;
  ${({ active, theme }) => !active ? '' : `background-color: ${theme.palette.primary[500]} !important;`}
  position: relative;
`

const CardText = styled(Typography)`
  ${({ active }) => !active ? '' : 'color: rgba(255,255,255,0.75) !important;'}
`

const Date = styled(Typography)`
  line-height: 1 !important;
`

const CardActions = styled(OriginalCardActions)`
  justify-content: flex-end;
`

const LimitText = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[500]} !important;
`

const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']

class Exams extends Component {
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
    const { theme, currentExams, students, groups } = this.props
    const {
      modalSaveOpened,
      modalType,
      toModifyId,
      modalRemoveOpened,
    } = this.state

    return (
      <div>
        <Typography type="display1" gutterBottom>Mis examenes</Typography>
        {currentExams.map(({
          id,
          name,
          expiresAt,
          completed,
        }) => (
          <Card key={id}>
            <CardContent>
              <ContextContainer>
                <ContextMenu
                  value={id}
                  handleEdit={this.onEdit}
                  handleRemove={this.onRemove}
                />
              </ContextContainer>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={3}>
                  <AlignCenter>
                    <Date type="display3">{moment(expiresAt).date()}</Date>
                  </AlignCenter>
                  <AlignCenter>
                    <Typography type="subheading">{months[moment(expiresAt).month()]}</Typography>
                  </AlignCenter>
                  <AlignCenter>
                    <LimitText type="body2" theme={theme}>Fecha límite</LimitText>
                  </AlignCenter>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <CardText type="display1" component="h2" gutterBottom>
                    {name}
                  </CardText>
                  <CardText type="body1" gutterBottom>
                    Examenes presentados: <b>{completed} / {students.length}</b>
                  </CardText>
                  <LinearProgress
                    color="accent"
                    mode="determinate"
                    value={(completed / students.length) * 100}
                    valueBuffer={(completed / students.length) * 100}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button raised color="primary" onClick={() => console.log('ver mas')}>Ver Resultados</Button>
            </CardActions>
          </Card>
        ))}
        <AlignCenter>
          <Button color="accent" onClick={this.onAdd}>
            <AddIcon />
            Agregar examen
          </Button>
        </AlignCenter>
        <ModalSave
          open={modalSaveOpened}
          title="Examen"
          onRequestClose={this.onCloseModalSave}
          modalType={modalType}
          toUpdateId={toModifyId}
          fields={[
            {
              type: 'textField',
              id: 1,
              name: 'name',
              label: 'Nombre del examen',
              required: true,
            },
            {
              type: 'textField',
              id: 2,
              name: 'limitDate',
              inputType: 'datetime-local',
              label: 'Fecha límite',
              required: true,
            },
            {
              type: 'multiSelect',
              id: 4,
              name: 'groups',
              label: 'Grupos a asignar examen',
              options: groups,
              optionsLabel: 'name',
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

Exams.propTypes = {
  theme: PropTypes.object.isRequired,
  currentExams: PropTypes.array,
  students: PropTypes.array,
  exams: PropTypes.array,
  groups: PropTypes.array,
}

Exams.defaultProps = {
  currentExams: [
    {
      id: 1,
      name: 'Leyes de Newton',
      expiresAt: 1508811671643,
      completed: 10,
    },
    {
      id: 2,
      name: 'Electricidad',
      expiresAt: 1508811671643,
      completed: 3,
    },
  ],
  students: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  exams: [
    {
      id: 1,
      name: 'Estática',
    },
    {
      id: 2,
      name: 'Probabilidad',
    },
    {
      id: 3,
      name: 'Estadística',
    },
  ],
  groups: [
    {
      id: 1,
      name: 'Física 1 - ENE/DIC 17',
      activeQuizes: 1,
    },
    {
      id: 2,
      name: 'Física 2 - ENE/DIC 17',
      activeQuizes: 1,
    },
  ],
}

export default withTheme()(Exams)
