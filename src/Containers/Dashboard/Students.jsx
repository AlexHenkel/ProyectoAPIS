import React from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
} from 'material-ui'

const Students = ({ students }) => (
  <div>
    <Typography type="display1" gutterBottom>Mis alumnos</Typography>
    <Card>
      <List>
        {students.map(({ name }) => (
          <ListItem>
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
