import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Button,
  Tab,
  Tabs,
} from 'material-ui'
import SwipeableViews from 'react-swipeable-views'
import { withTheme } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter } from '../../Components/Utils'
import ModalSave from '../../Components/ModalSave'
import ModalRemove from '../../Components/ModalRemove'
import Exam from '../../Components/Exam'

const TabContainer = ({ children }) => <div style={{ padding: 8 * 3 }}>{children}</div>
TabContainer.propTypes = { children: PropTypes.node.isRequired }


class Exams extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalType: 'create',
      modalSaveOpened: false,
      modalRemoveOpened: false,
      toModifyId: -1,
      tabIndex: 0,
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

  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex })
  }

  handleChangeIndex = (tabIndex) => {
    this.setState({ tabIndex })
  }

  render() {
    const { theme, currentExams, pastExams, students, groups, exams } = this.props
    const { modalSaveOpened, modalType, toModifyId, modalRemoveOpened, tabIndex } = this.state

    return (
      <div>
        <Typography type="display1" gutterBottom>Mis examenes</Typography>
        <Tabs
          value={tabIndex}
          onChange={this.handleChange}
          indicatorColor="accent"
          textColor="primary"
          centered
        >
          <Tab label="Activos" />
          <Tab label="Pasados" />
        </Tabs>
        <SwipeableViews
          index={tabIndex}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer>
            <AlignCenter>
              <Button color="accent" onClick={this.onAdd}>
                <AddIcon />
                Agregar examen
              </Button>
            </AlignCenter>
            {currentExams.map(data => (
              <Exam
                key={data.id}
                onEdit={this.onEdit}
                onRemove={this.onRemove}
                studentsLen={students.length}
                data={data}
                theme={theme}
              />
            ))}
          </TabContainer>
          <TabContainer>
            {pastExams.map(data => (
              <Exam
                key={data.id}                
                onEdit={this.onEdit}
                onRemove={this.onRemove}
                studentsLen={students.length}
                data={data}
                theme={theme}
                noEdit
              />
            ))}
          </TabContainer>
        </SwipeableViews>
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
              name: 'expiresAt',
              inputType: 'datetime-local',
              label: 'Fecha límite',
              required: true,
            },
            {
              type: 'fuzzySearch',
              id: 3,
              name: 'exam_id',
              label: 'Examen a asignar',
              options: exams,
              optionsValue: 'id',
              optionsLabel: 'name',
              required: true,
              specificFor: 'create',
            },
            {
              type: 'multiSelect',
              id: 4,
              name: 'groups_id',
              label: 'Grupos a asignar examen',
              // value: currentGroup
              options: groups,
              optionsValue: 'id',
              optionsLabel: 'name',
              required: true,
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
    )
  }
}

Exams.propTypes = {
  theme: PropTypes.object.isRequired,
  currentExams: PropTypes.array,
  pastExams: PropTypes.array,
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
  pastExams: [
    {
      id: 3,
      name: 'Estática',
      expiresAt: 1508811671643,
      completed: 10,
    },
    {
      id: 4,
      name: 'Mecánica',
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
      activeExams: 1,
    },
    {
      id: 2,
      name: 'Física 2 - ENE/DIC 17',
      activeExams: 1,
    },
    {
      id: 3,
      name: 'Física 1 - ENE/DIC 17',
      activeExams: 1,
    },
    {
      id: 4,
      name: 'Física 2 - ENE/DIC 17',
      activeExams: 1,
    },
    {
      id: 5,
      name: 'Física 1 - ENE/DIC 17',
      activeExams: 1,
    },
    {
      id: 6,
      name: 'Física 2 - ENE/DIC 17',
      activeExams: 1,
    },
  ],
}

export default withTheme()(Exams)
