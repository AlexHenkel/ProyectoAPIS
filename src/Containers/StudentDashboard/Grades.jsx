import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
} from 'material-ui'
import Loading from '../../Components/Common/Loading'
import NoResults from '../../Components/Common/NoResults'

const Title = styled(Typography)`
  margin-top: 25px !important;
`

const isCorrectGrade = (highestGrade, recentGrade) => typeof highestGrade === 'number' && typeof recentGrade === 'number'

const Grades = ({ loading, exams }) => (
  <div>
    <Title type="display1" gutterBottom>Mis calificaciones</Title>
    {loading && <Loading />}
    {!loading && (exams.length ?
      <Card>
        <List>
          {exams.map(({ id, name, highestGrade, recentGrade }) =>
            isCorrectGrade(highestGrade, recentGrade) && (
              <ListItem key={id}>
                <ListItemText
                  primary={name}
                  secondary={(
                    <span>
                      <span>Más alta: <b>{highestGrade}</b></span>
                      <br />
                      <span>Más reciente: <b>{recentGrade}</b></span>
                    </span>
                  )}
                />
              </ListItem>
            ))
          }
        </List>
      </Card>
    : <NoResults />)}
  </div>
)

Grades.propTypes = {
  loading: PropTypes.bool.isRequired,
  exams: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  loading: state.overview.getOne.fetching || state.groups.getOne.fetching,
  exams: [...state.overview.getOne.result.currentExams,
    ...state.overview.getOne.result.pastExams],
})

export default connect(mapStateToProps)(Grades)
