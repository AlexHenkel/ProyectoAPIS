import React from 'react'
import PropTypes from 'prop-types'
import { LinearProgress } from 'material-ui'
import { CardText } from '../Common/Utils'
import Exam from '../Exam'
import ExamResult from '../../Containers/TeacherDashboard/ExamResult'

const TeacherExam = ({ data, onEdit, onRemove, theme, studentsLen, groupId }) => (
  <Exam
    data={data}
    onEdit={onEdit}
    onRemove={onRemove}
    theme={theme}
    actions={<ExamResult title={data.name} groupId={groupId} examId={data.id} />}
  >
    <CardText type="body1" gutterBottom>
      Examenes presentados: <b>{data.completed} / {studentsLen}</b>
    </CardText>
    <LinearProgress
      color="accent"
      mode="determinate"
      value={(data.completed / studentsLen) * 100}
      valueBuffer={(data.completed / studentsLen) * 100}
    />
  </Exam>
)

TeacherExam.propTypes = {
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  theme: PropTypes.object.isRequired,
  studentsLen: PropTypes.number.isRequired,
  groupId: PropTypes.number.isRequired,
}

TeacherExam.defaultProps = {
  onEdit: null,
  onRemove: null,
}

export default TeacherExam
