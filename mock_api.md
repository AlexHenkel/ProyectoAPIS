FORMAT: 1A
HOST: http://teclearnapi.herokuapp.com/

# TecLearn

TecLearn is a tool for teacher and students to create and grade exams associated with videos

## Teacher login [/teacher_login/]

### Login [POST]

+ Request (application/json)

    + Attributes

        + email: teacher@mail.com (string, required)

        + password: 123123 (string, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

## Student login [/student_login/]

### Login [POST]

+ Request (application/json)

    + Attributes

        + email: teacher@mail.com (string, required)

        + password: 123123 (string, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

## Teacher register [/teacher_register/]

### Register [POST]

+ Request (application/json)

    + Attributes

        + name: John Smith (string, required)

        + email: teacher@mail.com (string, required)

        + password: 123123 (string, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

## Student register [/student_register/]

### Register [POST]

+ Request (application/json)

    + Attributes

        + name: John Smith (string, required)

        + email: student@mail.com (string, required)

        + password: 123123 (string, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

## Teacher Groups Collection [/teacher_groups/]

### List all teacher's groups [GET /teacher_groups/{id}]

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json; charset=utf-8)

    + Attributes (array)

        + (object)

            + id: 1 (number, required)
            
            + name: Física 1 ENE/DIC 17 (string, required)

            + activeExams: 2 (number, required)

            + startDate: 1485932460000 (number, required)

            + endDate: 1483254000000 (number, required)

        + (object)

            + id: 2 (number, required)
            
            + name: Física 2 ENE/DIC 17 (string, required)

            + activeExams: 2 (number, required)

            + startDate: 1485932460000 (number, required)

            + endDate: 1483254000000 (number, required)
 
### Create teacher's group  [POST]

+ Request (application/json)

    + Attributes

        + teacher_id: 1 (string, required)

        + name: cool name (string, required)

        + startDate: 1485932460000 (number, required)

        + endDate: 1483254000000 (number, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 3 (number, required)

        + name: cool name (string, required)

        + activeExams: 0 (number, required)

        + startDate: 1485932460000 (number, required)

        + endDate: 1483254000000 (number, required)

### Update teacher's group  [PATCH]

+ Request (application/json)

    + Attributes

        + group_id: 3 (string, required)

        + name: not cool name (string, required)

        + startDate: 1485932460000 (number, required)

        + endDate: 1483254000000 (number, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 3 (number, required)

        + name: not cool name (string, required)

### Remove teacher's group  [DELETE]

+ Request (application/json)

    + Attributes (object)

        + group_id: 3 (number, required)

+ Response 201 (application/json)
    
    + Attributes (object)

        + id: 3 (number, required)

## Teacher Overview [/teacher_overview/{id}]

### List a teacher's group overview [GET]

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

        + groupCode: 13DFSD (string, required)

        + currentExams (array)

            + (object)

                + id: 1 (number, required)

                + name: Leyes de Newton (string, required)

                + expiresAt: 1508811671643 (number, required)

                + completed: 1 (number, required)

            + (object)

                + id: 2 (number, required)

                + name: Estática (string, required)

                + expiresAt: 1508811671643 (number, required)

                + completed: 3 (number, required)

        + pastExams (array)

            + (object)

                + id: 3 (number, required)

                + name: Óptica (string, required)

                + expiresAt: 1508811671643 (number, required)

                + completed: 3 (number, required)

        + students (array)

            + (object)

                + id: 1 (number, required)

                + name: Chelsea Otakan (string, required)

            + (object)

                + id: 2 (number, required)

                + name: Gary Lekketh (string, required)

            + (object)

                + id: 3 (number, required)

                + name: Robin Freeman (string, required)

        + top10 (array)

            + (object)

                + id: 1 (number, required)

                + name: Chelsea Otakan (string, required)

            + (object)

                + id: 2 (number, required)

                + name: Gary Lekketh (string, required)

            + (object)

                + id: 3 (number, required)

                + name: Robin Freeman (string, required)

## Teacher Group Exams Collection [/teacher_groups_exams/]

**NOTE: All `id` in responses refers to the teacher_group_exams entity**
 
### Create teacher's group exam  [POST]

+ Request (application/json)

    + Attributes

        + teacher_id: 1 (number, required)

        + groups_id: 1, 3 (array[number], required)

        + exam_id: 1 (number, required)

        + name: Cool exam (string, required)

        + expiresAt: 1485932460000 (number, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 4 (number, required)

        + name: Cool exam (string, required)

        + expiresAt: 1485932460000 (number, required)

        + completed: 0 (number, required)
 
### Update teacher's group exam  [PATCH]

+ Request (application/json)

    + Attributes

        + teacher_group_exam_id: 4 (number, required)

        + name: not cool test (string, required)

        + expiresAt: 1485932460000 (number, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 4 (number, required)

        + name: not cool test (string, required)

        + expiresAt: 1485932460000 (number, required)

### Remove teacher's group exam  [DELETE]

+ Request (application/json)

    + Attributes (object)

        + teacher_group_exam_id: 1 (number, required)

+ Response 201 (application/json)
    
    + Attributes (object)

        + id: 1 (number, required)

## Teacher Exams Collection [/teacher_exams/]

**NOTE: All `id` in responses refers to the exams entity**

### List all teacher's exams [GET /teacher_exams/{id}]

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json)

    + Attributes (array)

        + (object)

            + id: 1 (number, required)

            + name: Leyes de Newton (string, required)

            + createdAt: 1508811671643 (number, required)

            + assigned: 10 (number, required)

            + resourceType: video (string, required)

            + resource: https://www.youtube.com/watch?v=S3QlbbUmszE (string, required)

            + questions (array)

                + (object)

                    + id: 1 (number, required)

                    + question: ¿Cuál es la magnitud de la gravedad? (string, required)

                    + correctAnswer: 4.56 (string, required)

                    + incorrectAnswers: 4.56, 9.14, 4.56 (array[string], required)
                
                + (object)

                    + id: 2 (number, required)

                    + question: ¿Cuál es la magnitud de la velocidad? (string, required)

                    + correctAnswer: 9.14 (string, required)

                    + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)

                + (object)

                    + id: 3 (number, required)

                    + question: ¿Cuál es la magnitud de la aceleración? (string, required)

                    + correctAnswer: 15.32 (string, required)

                    + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)
        
        + (object)

            + id: 2 (number, required)

            + name: Estática (string, required)

            + createdAt: 1508811671643 (number, required)

            + assigned: 3 (number, required)

            + resourceType: pdf (string, required)

            + resource: https://leoberrios.files.wordpress.com/2011/10/leyes-de-newton.pdf (string, required)

            + questions (array)

                + (object)

                    + id: 1 (number, required)

                    + question: ¿Cuál es la magnitud de la gravedad? (string, required)

                    + correctAnswer: 4.56 (string, required)

                    + incorrectAnswers: 4.56, 9.14, 4.56 (array[string], required)
                
                + (object)

                    + id: 2 (number, required)

                    + question: ¿Cuál es la magnitud de la velocidad? (string, required)

                    + correctAnswer: 9.14 (string, required)

                    + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)

                + (object)

                    + id: 3 (number, required)

                    + question: ¿Cuál es la magnitud de la aceleración? (string, required)

                    + correctAnswer: 15.32 (string, required)

                    + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)
        
        + (object)

            + id: 3 (number, required)

            + name: Óptica (string, required)

            + createdAt: 1508811671643 (number, required)

            + assigned: 10 (number, required)

            + resourceType: video (string, required)

            + resource: https://www.youtube.com/watch?v=S3QlbbUmszE (string, required)

            + questions (array)

                + (object)

                    + id: 1 (number, required)

                    + question: ¿Cuál es la magnitud de la gravedad? (string, required)

                    + correctAnswer: 4.56 (string, required)

                    + incorrectAnswers: 4.56, 9.14, 4.56 (array[string], required)
                
                + (object)

                    + id: 2 (number, required)

                    + question: ¿Cuál es la magnitud de la velocidad? (string, required)

                    + correctAnswer: 9.14 (string, required)

                    + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)

                + (object)

                    + id: 3 (number, required)

                    + question: ¿Cuál es la magnitud de la aceleración? (string, required)

                    + correctAnswer: 15.32 (string, required)

                    + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)

### Create teacher's exams  [POST]

+ Request (application/json)

    + Attributes

        + teacher_id: 1 (number, required)

        + name: New exam (string, required)

        + resourceType: video (string, required)

        + resource: https://www.youtube.com/watch?v=S3QlbbUmszE (string, required)

        + questions: 1, 2, 3 (array[number], required)

+ Response 200 (application/json)

    + Attributes (object)
        
        + id: 4 (number, required)

        + name: New exam (string, required)

        + createdAt: 1508811671643 (number, required)

        + assigned: 0 (number, required)

        + resourceType: video (string, required)

        + resource: https://www.youtube.com/watch?v=S3QlbbUmszE (string, required)

        + questions (array)

            + (object)

                + id: 1 (number, required)

                + question: ¿Cuál es la magnitud de la gravedad? (string, required)

                + correctAnswer: 4.56 (string, required)

                + incorrectAnswers: 4.56, 9.14, 4.56 (array[string], required)
            
            + (object)

                + id: 2 (number, required)

                + question: ¿Cuál es la magnitud de la velocidad? (string, required)

                + correctAnswer: 9.14 (string, required)

                + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)

            + (object)

                + id: 3 (number, required)

                + question: ¿Cuál es la magnitud de la aceleración? (string, required)

                + correctAnswer: 15.32 (string, required)

                + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)

### Update teacher's exams  [PATCH]

+ Request (application/json)

    + Attributes

        + exam_id: 4 (number, required)

        + name: New title for exam (string, required)

        + resourceType: video (string, required)

        + resource: https://www.youtube.com/watch?v=S3QlbbUmszE (string, required)

        + questions: 1, 2, 3 (array[number], required)

+ Response 200 (application/json)

    + Attributes (object)
        
        + id: 1 (number, required)

        + name: New title for exam (string, required)

        + createdAt: 1508811671643 (number, required)

        + assigned: 0 (number, required)

        + resourceType: video (string, required)

        + resource: https://www.youtube.com/watch?v=S3QlbbUmszE (string, required)

        + questions (array)

            + (object)

                + id: 1 (number, required)

                + question: ¿Cuál es la magnitud de la gravedad? (string, required)

                + correctAnswer: 4.56 (string, required)

                + incorrectAnswers: 4.56, 9.14, 4.56 (array[string], required)
            
            + (object)

                + id: 2 (number, required)

                + question: ¿Cuál es la magnitud de la velocidad? (string, required)

                + correctAnswer: 9.14 (string, required)

                + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)

            + (object)

                + id: 3 (number, required)

                + question: ¿Cuál es la magnitud de la aceleración? (string, required)

                + correctAnswer: 15.32 (string, required)

                + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)

### Remove teacher exam  [DELETE]

+ Request (application/json)

    + Attributes (object)

        + exam_id: 4 (number, required)

+ Response 201 (application/json)
    
    + Attributes (object)

        + id: 1 (number, required)

## Teacher Questions Collection [/teacher_questions/]

**NOTE: All `id` in responses refers to the questions entity**

### List all teacher's questions [GET /teacher_questions/{id}]

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json)

    + Attributes (array)

        + (object)

            + id: 1 (number, required)

            + question: ¿Cuál es la magnitud de la gravedad? (string, required)

            + correctAnswer: 4.56 (string, required)

            + incorrectAnswers: 4.56, 9.14, 4.56 (array[string], required)

            + tags (array, required)
                
                + (object)

                    + id: 1 (number, required)

                    + name: Física (string, required)

                + (object)

                    + id: 2 (number, required)

                    + name: Química (string, required)
        
        + (object)

            + id: 2 (number, required)

            + question: ¿Cuál es la magnitud de la velocidad? (string, required)

            + correctAnswer: 9.14 (string, required)

            + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)

            + tags (array, required)
                
                + (object)

                    + id: 1 (number, required)

                    + name: Física (string, required)
                
                + (object)

                    + id: 2 (number, required)

                    + name: Química (string, required)

        + (object)

            + id: 3 (number, required)

            + question: ¿Cuál es la magnitud de la aceleración? (string, required)

            + correctAnswer: 15.32 (string, required)

            + incorrectAnswers: 4.56, 98.14, 4.56 (array[string], required)

            + tags (array, required)
                
                + (object)

                    + id: 1 (number, required)

                    + name: Física (string, required)
                
                + (object)

                    + id: 2 (number, required)

                    + name: Química (string, required)

                + (object)

                    + id: 3 (number, required)

                    + name: Matemáticas (string, required)
                
                + (object)

                    + id: 4 (number, required)

                    + name: Física cuantica nuclear destructiva (string, required)

### Create teacher's question  [POST]

**NOTE: Notice that `tags` field in request is an array of *int* and *string*. If the element is an *int*, it refers to an existing `tag_id`. If the element is a *string*, it's a new tag, so it should be added to the `tags` collection**

+ Request (application/json)

    + Attributes (object)

        + teacher_id: 1 (number, required)

        + question: Cool question title (string, required)

        + correctAnswer: 20 (string, required)

        + incorrectAnswers: 1, 5, 100 (array[string], required)

        + tags (array, required)
            
            + 3 (number)
            
            + 1 (number)
            
            + this is a new tag (string)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 6 (number, required)

        + question: Cool question title (string, required)

        + correctAnswer: 20 (string, required)

        + incorrectAnswers: 1, 5, 100 (array[string], required)

        + tags (array, required)
                
            + (object)

                + id: 1 (number, required)

                + name: Física (string, required)
            
            + (object)

                + id: 3 (number, required)

                + name: Estática (string, required)

            + (object)

                + id: 7 (number, required)

                + name: this is a new tag (string, required)

### Update teacher's question  [PATCH]

**NOTE: Notice that `tags` field in request is an array of *int* and *string*. If the element is an *int*, it refers to an existing `tag_id`. If the element is a *string*, it's a new tag, so it should be added to the `tags` collection**

+ Request (application/json)

    + Attributes (object)

        + question_id: 1 (number, required)

        + question: Not cool question title (string, required)

        + correctAnswer: 24 (string, required)

        + incorrectAnswers: 1, 5, 100 (array[string], required)

        + tags (array, required)
            
            + 3 (number)
            
            + 1 (number)
            
            + this is another new tag (string)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

        + question: Not cool question title (string, required)

        + correctAnswer: 24 (string, required)

        + incorrectAnswers: 1, 5, 100 (array[string], required)

        + tags (array, required)
                
            + (object)

                + id: 1 (number, required)

                + name: Física (string, required)
            
            + (object)

                + id: 3 (number, required)

                + name: Estática (string, required)

            + (object)

                + id: 8 (number, required)

                + name: this is another new tag (string, required)

### Remove teacher's question  [DELETE]

+ Request (application/json)

    + Attributes (object)

        + question_id: 1 (number, required)

+ Response 201 (application/json)
    
    + Attributes (object)

        + id: 1 (number, required)

## Teacher Tags Collection [/teacher_tags/]

### List all teacher's tags [GET /teacher_tags/{id}]

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json)

    + Attributes (array)

        + (object)

            + id: 1 (number, required)

            + name: Física (string, required)
        
        + (object)

            + id: 2 (number, required)

            + name: Química (string, required)

        + (object)

            + id: 3 (number, required)

            + name: Matemáticas (string, required)
        
        + (object)

            + id: 4 (number, required)

            + name: Física cuantica nuclear destructiva (string, required)

## Group Exam Results Collection [/group_exam_results/]

**NOTE: Questions should be sorted in the same way as students questions**

### List teacher's group exam results [GET /group_exam_results/{group_id}/{exam_id}]

+ Parameters

    + group_id: 1 (number, required)

    + exam_id: 1 (number, required)

+ Response 200 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

        + questions (array)

            + (object)

                + id: 1 (number, required)

                + question: ¿Cuál es la magnitud de la gravedad? (string, required)
            
            + (object)

                + id: 2 (number, required)

                + question: ¿Cuál es la magnitud de la velocidad? (string, required)

            + (object)

                + id: 3 (number, required)

                + question: ¿Cuál es la magnitud de la aceleración? (string, required)
        
        + highestGrades (array)

            + (object)

                + id: 1 (number, required)

                + student: Chelsea Otakan (string, required)

                + grade: 66.6 (number, required)

                + answers (array)

                    + (object)

                        + isCorrect: true (boolean, required)

                        + answer: 10 (string, required)
                    
                    + (object)

                        + isCorrect: true (boolean, required)

                        + answer: 11 (string, required)
                    
                    + (object)

                        + isCorrect: false (boolean, required)

                        + answer: 12 (string, required)

            + (object)

                + id: 2 (number, required)

                + student: Gary Lekketh (string, required)

                + grade: 33.3 (number, required)

                + answers (array)

                    + (object)

                        + isCorrect: false (boolean, required)

                        + answer: 1 (string, required)
                    
                    + (object)

                        + isCorrect: true (boolean, required)

                        + answer: 11 (string, required)
                    
                    + (object)

                        + isCorrect: false (boolean, required)

                        + answer: 12 (string, required)

            + (object)

                + id: 3 (number, required)

                + student: Robin Freeman (string, required)

                + grade: 100 (number, required)

                + answers (array)

                    + (object)

                        + isCorrect: true (boolean, required)

                        + answer: 10 (string, required)
                    
                    + (object)

                        + isCorrect: true (boolean, required)

                        + answer: 11 (string, required)
                    
                    + (object)

                        + isCorrect: true (boolean, required)

                        + answer: 9 (string, required)

        + recentGrades (array)

            + (object)

                + id: 1 (number, required)

                + student: Chelsea Otakan (string, required)

                + grade: 0 (number, required)

                + answers (array)

                    + (object)

                        + isCorrect: false (boolean, required)

                        + answer: 10 (string, required)
                    
                    + (object)

                        + isCorrect: false (boolean, required)

                        + answer: 8 (string, required)
                    
                    + (object)

                        + isCorrect: false (boolean, required)

                        + answer: 14 (string, required)

            + (object)

                + id: 2 (number, required)

                + student: Gary Lekketh (string, required)

                + grade: 33.3 (number, required)

                + answers (array)

                    + (object)

                        + isCorrect: false (boolean, required)

                        + answer: 1 (string, required)
                    
                    + (object)

                        + isCorrect: true (boolean, required)

                        + answer: 11 (string, required)
                    
                    + (object)

                        + isCorrect: false (boolean, required)

                        + answer: 12 (string, required)

            + (object)

                + id: 3 (number, required)

                + student: Robin Freeman (string, required)

                + grade: 66.6 (number, required)

                + answers (array)

                    + (object)

                        + isCorrect: true (boolean, required)

                        + answer: 10 (string, required)
                    
                    + (object)

                        + isCorrect: false (boolean, required)

                        + answer: 23 (string, required)
                    
                    + (object)

                        + isCorrect: true (boolean, required)

                        + answer: 9 (string, required)


## Group Results Collection [/group_results/]

**NOTE: Exams should be sorted in the same way as students questions**

### List teacher's group results [GET /group_results/{group_id}]

+ Parameters

    + group_id: 1 (number, required)

+ Response 200 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

        + exams (array)

            + (object)

                + id: 1 (number, required)

                + name: Leyes de Newton (string, required)
            
            + (object)

                + id: 2 (number, required)

                + name: Estática (string, required)

            + (object)

                + id: 3 (number, required)

                + name: Óptica (string, required)
        
        + highestGrades (array)

            + (object)

                + id: 1 (number, required)

                + student: Chelsea Otakan (string, required)

                + average: 88.8 (number, required)

                + grades: 66, 100, 100 (array[number], required)


            + (object)

                + id: 2 (number, required)

                + student: Gary Lekketh (string, required)

                + average: 66.6 (number, required)

                + grades: 33, 66.6, 100 (array[number], required)

            + (object)

                + id: 3 (number, required)

                + student: Robin Freeman (string, required)

                + average: 50 (number, required)

                + grades: 50, 50, 50 (array[number], required)

        + recentGrades (array)

            + (object)

                + id: 1 (number, required)

                + student: Chelsea Otakan (string, required)

                + average: 50 (number, required)

                + grades: 50, 50, 50 (array[number], required)

            + (object)

                + id: 2 (number, required)

                + student: Gary Lekketh (string, required)

                + average: 88.8 (number, required)

                + grades: 66, 100, 100 (array[number], required)

            + (object)

                + id: 3 (number, required)

                + student: Robin Freeman (string, required)

                + average: 66.6 (number, required)

                + grades: 33, 66.6, 100 (array[number], required)

## Student Groups Collection [/student_groups/]

### List all student's groups [GET /student_groups/{id}]

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json; charset=utf-8)

    + Attributes (array)

        + (object)

            + id: 1 (number, required)
            
            + name: Física 1 ENE/DIC 17 (string, required)

            + activeExams: 2 (number, required)

        + (object)

            + id: 2 (number, required)
            
            + name: Física 2 ENE/DIC 17 (string, required)

            + activeExams: 2 (number, required)
 
### Add student to group  [POST]

+ Request (application/json)

    + Attributes

        + student_id: 1 (string, required)

        + groupCode: 1E4RF (string, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 3 (number, required)
            
        + name: New group (string, required)

        + activeExams: 0 (number, required)

## Student Overview [/student_overview/{id}]

### List a student's group overview [GET]

**Note: If a student hasn't taken the exam, don't send any value or send it as null in `highestGrade` and `recentGrade`**

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

        + average: 80 (number)

        + currentExams (array)

            + (object)

                + id: 1 (number, required)

                + name: Leyes de Newton (string, required)

                + expiresAt: 1508811671643 (number, required)

            + (object)

                + id: 2 (number, required)

                + name: Estática (string, required)

                + expiresAt: 1508811671643 (number, required)

                + highestGrade: 100 (number)

                + recentGrade: 80 (number)

        + pastExams (array)

            + (object)

                + id: 3 (number, required)

                + name: Óptica (string, required)

                + expiresAt: 1508811671643 (number, required)

        + top10 (array)

            + (object)

                + id: 1 (number, required)

                + name: Chelsea Otakan (string, required)

            + (object)

                + id: 2 (number, required)

                + name: Gary Lekketh (string, required)

            + (object)

                + id: 3 (number, required)

                + name: Robin Freeman (string, required)

## Student State [/student_state/]

**To prevent student from opening resource and exam in different tabs, we should have a singleton instance for each student to controll it's status on the app. The possible states are:**
- `free`: Default state. It will be set after test is completed
- `onResource`: Will be set when student access to one of the resources of the test
- `onExam`: Will be set when student access to the questions of one test

### Get student state [GET /student_state/{id}]

+ Parameters

    + id: 1 (number, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

        + state: free (string, required)
        
        + examId: 1 (number)

### Update student state  [POST]

+ Request (application/json)

    + Attributes

        + id: 1 (number, required)

        + state: onResource (string, required)
        
        + examId: 1 (number)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

        + state: onResource (string, required)
        
        + examId: 1 (number)


## Exam resources [/resources/{id}]

This endpoint will be used to display resource to student before answering questions

### Get exam resource [GET]

+ Parameters

    + id: 1 (number, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

        + name: Leyes de Newton (string, required)

        + resourceType: pdf (string, required)

        + resource: https://webhome.phy.duke.edu/~rgb/Class/intro_physics_1/intro_physics_1.pdf (string, required)

## Exam questions [/exam/]

These endpoints will be used to display and save the test questions from the student

### Get exam questions [GET /exam/{id}]

`id` refers to `teacher_group_exam` instance id

**NOTE: Answers include both `incorrectAnswers` and `correctAnswers` in the same array**

+ Parameters

    + id: 1 (number, required)

+ Response 201 (application/json)

    + Attributes (object)

        + id: 1 (number, required)

        + name: Leyes de Newton (string, required)

        + questions (array)

            + (object)

                + id: 1 (number, required)

                + question: ¿Cuál es la magnitud de la gravedad? (string, required)

                + answers: 4.56, 9.14, 1.56, 3.56 (array[string], required)
            
            + (object)

                + id: 2 (number, required)

                + question: ¿Cuál es la magnitud de la velocidad? (string, required)

                + answers: 4.56, 98.14, 7.56, 9.14 (array[string], required)

            + (object)

                + id: 3 (number, required)

                + question: ¿Cuál es la magnitud de la aceleración? (string, required)

                + answers: 4.56, 98.14, 10.56, 15.32 (array[string], required)

### Create exam intent [POST]

Answers is an array of objects that includes the question `id` and it's answer

+ Request (application/json)

    + Attributes

        + id: 1 (number, required)

        + student_id: 1 (number, required)

        + answers (array, required)
            
            + (object)

                + id: 1 (number, required)

                + answer: 9.14 (string, required)
            
            + (object)

                + id: 2 (number, required)

                + answer: 9.14 (string, required)
            
            + (object)

                + id: 3 (number, required)

                + answer: 15.32 (string, required)
        

+ Response 201 (application/json)

    + Attributes (object)

        + id: 1 (number, required)
