import React, { Component } from 'react'
import {
  Grid,
} from 'material-ui'
import Groups from './Groups'
import Exams from './Exams'
import Students from './Students'
import Top10 from './Top10'

export default class Dashboard extends Component {
  componentDidMount() {
    console.log('load data')
  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={3}>
          <Groups />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Exams />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Students />
          <Top10 />
        </Grid>
      </Grid>
    )
  }
}
