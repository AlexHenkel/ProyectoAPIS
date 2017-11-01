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

const Students = ({ loading, students }) => (
  <div>
    <Title type="display1" gutterBottom>Mis alumnos</Title>
    {loading && <Loading />}
    {!loading && (students.length ?
      <Card>
        <List>
          {students.map(({ id, name }) => (
            <ListItem key={id}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Card>
    : <NoResults />)}
  </div>
)

Students.propTypes = {
  loading: PropTypes.bool.isRequired,
  students: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  loading: state.overview.getOne.fetching,
  students: state.overview.getOne.result.students,
})

export default connect(mapStateToProps)(Students)
