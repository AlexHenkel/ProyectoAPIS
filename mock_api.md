FORMAT: 1A
HOST: http://teclearnapi.herokuapp.com/

# TecLearn

TecLearn is a tool for teacher and students to create and grade exams associated with videos

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

        + (object)

            + id: 2 (number, required)
            
            + name: Física 2 ENE/DIC 17 (string, required)

            + activeExams: 2 (number, required)
 
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

        + groupCode: 13DFSD (string, required)

        + currentExams (array)

            + (object)

                + id: 1 (number, required)

                + name: Leyes de Newton (string, required)

                + expiresAt: 1508811671643 (number, required)

                + completed: 10 (number, required)

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
