import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
} from 'material-ui'

const Title = styled(Typography)`
  margin-top: 25px !important;
`

const Students = ({ students }) => (
  <div>
    <Title type="display1" gutterBottom>Mis alumnos</Title>
    <Card>
      <List>
        {students.map(({ id, name }) => (
          <ListItem key={id}>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Card>
  </div>
)

Students.propTypes = {
  students: PropTypes.array,
}

Students.defaultProps = {
  students: [
    {
      id: 1,
      name: 'Chelsea Otakan',
    },
    {
      id: 2,
      name: 'Eric Hoffman',
    },
    {
      id: 3,
      name: 'Chelsea Otakan',
    },
    {
      id: 4,
      name: 'Eric Hoffman',
    },
  ],
}

export default Students
