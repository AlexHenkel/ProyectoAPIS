import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Typography,
  Button,
  Tab,
  Tabs,
} from 'material-ui'
import SwipeableViews from 'react-swipeable-views'
import { withTheme } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'
import { AlignCenter } from '../../Components/Common/Utils'
import ModalSave from '../../Components/Common/ModalSave'
import ModalRemove from '../../Components/Common/ModalRemove'
import Exam from '../../Components/Teacher/Exam'
import Loading from '../../Components/Common/Loading'
import NoResults from '../../Components/Common/NoResults'

export const TabContainer = ({ children }) => <div style={{ padding: 8 * 3 }}>{children}</div>
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
    const { theme, activeGroup, loading, currentExams,
      pastExams, students, groups, exams } = this.props
    const { modalSaveOpened, modalType, toModifyId, modalRemoveOpened, tabIndex } = this.state

    return (
      <div>
        <Typography type="display1" gutterBottom>Mis examenes</Typography>
        {loading && <Loading />}
        {!loading && (
          <div>
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
                {currentExams.length ? currentExams.map(data => (
                  <Exam
                    key={data.id}
                    onEdit={this.onEdit}
                    onRemove={this.onRemove}
                    studentsLen={students.length}
                    data={data}
                    theme={theme}
                    groupId={activeGroup}
                  />
                )) : <NoResults />}
              </TabContainer>
              <TabContainer>
                {pastExams.length ? pastExams.map(data => (
                  <Exam
                    key={data.id}
                    onEdit={this.onEdit}
                    onRemove={this.onRemove}
                    studentsLen={students.length}
                    data={data}
                    theme={theme}
                    noEdit
                    groupId={activeGroup}
                  />
                )) : <NoResults />}
              </TabContainer>
            </SwipeableViews>
          </div>
        )}
        <ModalSave
          open={modalSaveOpened}
          title="Examen"
          onRequestClose={this.onCloseModalSave}
          modalType={modalType}
          toUpdateId={toModifyId}
          statePath="teacherGroupExams"
          typePrefix="TEACHER_GROUP_EXAMS"
          getOnePath="overview.getOne.result.currentExams"
          fields={[
            {
              type: 'textField',
              id: 1,
              name: 'name',
              path: 'name',
              label: 'Nombre del examen',
              required: true,
            },
            {
              type: 'datepicker',
              id: 2,
              name: 'expiresAt',
              path: 'expiresAt',
              label: 'Fecha límite',
              required: true,
              help: 'Fecha límite para que los alumnos presenten el examen',
            },
            {
              type: 'fuzzySearch',
              id: 3,
              name: 'exam_id',
              path: 'exam_id',
              label: 'Examen a asignar',
              options: exams,
              optionsValue: 'id',
              optionsLabel: 'name',
              required: true,
              specificFor: 'create',
              help: 'Selecciona alguno de tus examenes creados.',
            },
            {
              type: 'multiSelect',
              id: 4,
              name: 'groups_id',
              path: 'groups_id',
              label: 'Grupos a asignar examen',
              value: [activeGroup],
              options: groups,
              optionsValue: 'id',
              optionsLabel: 'name',
              required: true,
              specificFor: 'create',
              help: 'Asigna este examen a todos los grupos que sea necesario en una sola vez!',
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
          statePath="teacherGroupExams"
          typePrefix="TEACHER_GROUP_EXAMS"
        />
      </div>
    )
  }
}

Exams.propTypes = {
  theme: PropTypes.object.isRequired,
  activeGroup: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  currentExams: PropTypes.array.isRequired,
  pastExams: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  exams: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  activeGroup: state.groups.activeGroup,
  loading: state.overview.getOne.fetching || state.groups.getOne.fetching,
  currentExams: state.overview.getOne.result.currentExams,
  pastExams: state.overview.getOne.result.pastExams,
  students: state.overview.getOne.result.students,
  groups: state.groups.get.results,
  exams: state.exams.get.results,
})

export default connect(mapStateToProps)(withTheme()(Exams))
