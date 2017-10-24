import React, { Component } from 'react'
import {
  Grid,
} from 'material-ui'
import Courses from './Courses'
import Exams from './Exams'

export default class Dashboard extends Component {

  componentDidMount() {
    console.log('load data')
  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={3}>
          <Courses />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Exams />
        </Grid>
      </Grid>
    )
  }
}
