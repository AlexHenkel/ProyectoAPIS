import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Grid, Tab, Tabs } from 'material-ui'
import SwipeableViews from 'react-swipeable-views'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import OriginalPaper from 'material-ui/Paper'
import OriginalDialogResults from '../../Components/Teacher/DialogResults'
import Loading from '../../Components/Common/Loading'
import { TabContainer } from './Exams'
import GroupResultsActions from '../../Data/Redux/GroupResultsRedux'

export const Paper = styled(OriginalPaper)`
  width: 100%;
  overflow-x: auto;
`

export const AnswerCell = styled(TableCell)`
  color: ${({ correct }) => !correct ? 'red' : 'green'};
`

export const DialogResults = styled(OriginalDialogResults)`
  margin-top: 30px;
`

export const GroupResultTable = ({ exams, grades }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Alumno</TableCell>
          {exams.map(({ id: examId, name }) => (
            <TableCell key={examId} numeric>{name}</TableCell>
          ))}
          <TableCell><b>Cal.</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {grades.map(studentGrades => (
          <TableRow key={studentGrades.id}>
            <TableCell>{studentGrades.student}</TableCell>
            {studentGrades.grades.map((grade, index) => (
              <TableCell key={index} numeric>{grade}</TableCell>
            ))}
            <TableCell><b>{studentGrades.average}</b></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
)
GroupResultTable.propTypes = {
  exams: PropTypes.array.isRequired,
  grades: PropTypes.array.isRequired,
}

class GroupResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
    }
  }

  getResults = () => this.props.getResults(this.props.groupId)

  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex })
  }

  handleChangeIndex = (tabIndex) => {
    this.setState({ tabIndex })
  }

  render() {
    const { loading, name, exams, highestGrades, recentGrades } = this.props
    const { tabIndex } = this.state
    return (
      <DialogResults
        title={`Resultados del grupo ${name}`}
        buttonText="Ver Resultados del Grupo"
        onOpen={this.getResults}
        accent
      >
        <Grid container spacing={24}>
          <Grid item xs={12} sm={2} />
          <Grid item xs={12} sm={8}>
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
                  <Tab label="Calificación más alta" />
                  <Tab label="Calificación más reciente" />
                </Tabs>
                <SwipeableViews
                  index={tabIndex}
                  onChangeIndex={this.handleChangeIndex}
                >
                  <TabContainer>
                    <GroupResultTable exams={exams} grades={highestGrades} />
                  </TabContainer>
                  <TabContainer>
                    <GroupResultTable exams={exams} grades={recentGrades} />
                  </TabContainer>
                </SwipeableViews>
              </div>
            )}
          </Grid>
        </Grid>
      </DialogResults>
    )
  }
}

GroupResult.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  exams: PropTypes.array.isRequired,
  groupId: PropTypes.number.isRequired, // eslint-disable-line
  highestGrades: PropTypes.array.isRequired,
  recentGrades: PropTypes.array.isRequired,
  getResults: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  name: state.groups.activeGroupName,
  loading: state.groupResults.getOne.fetching,
  exams: state.groupResults.getOne.result.exams,
  groupId: state.groups.activeGroup,
  highestGrades: state.groupResults.getOne.result.highestGrades,
  recentGrades: state.groupResults.getOne.result.recentGrades,
})

const mapDispatchToProps = dispatch => ({
  getResults: id => dispatch(GroupResultsActions.getOneRequest(id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(GroupResult)
