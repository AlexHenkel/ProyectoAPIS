FORMAT: 1A
HOST: http://teclearnapi.herokuapp.com/

# TecLearn

TecLearn is a tool for teacher and students to create and grade exams associated with videos

## Teacher Groups Collection [/teacher_groups/]

### List all teacher's groups [GET /teacher_groups/{id}]

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json)

        [
            {
                id: 1,
                name: 'Física 1 - ENE/DIC 17',
                activeExams: 1,
            },
            {
                id: 2,
                name: 'Física 2 - ENE/DIC 17',
                activeExams: 1,
            },
        ]
 
### Create teacher's group  [POST]

+ Request (application/json)

        {
            teacher_id: 1,
            name: "cool name",
            startDate: 1485932460000,
            endDate: 1483254000000,
        }

+ Response 201 (application/json)

    + Body

            {
                id: 3,
                name: "cool name"
            }

### Update teacher's group  [PATCH]

+ Request (application/json)

        {
            teacher_id: 1,
            group_id: 1
            name: "not cool name",
            startDate: 1485932460000,
            endDate: 1483254000000,
        }

+ Response 201 (application/json)

    + Body

            {
                id: 3,
                name: "not cool name"
            }

### Remove teacher's group  [DELETE]

+ Request (application/json)

        {
            group_id: 1
        }

+ Response 201 (application/json)
    
    + Body

            {
                id: 3,
            }

## Teacher Overview [/teacher_overview/{id}]

### List a teacher's group overview [GET]

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json)

        {
            groupCode: '13DFSD',
            currentExams: [
                {
                    id: 1,
                    name: 'Leyes de Newton',
                    expiresAt: 1508811671643,
                    completed: 10,
                },
                {
                    id: 2,
                    name: 'Electricidad',
                    expiresAt: 1508811671643,
                    completed: 3,
                },
            ],
            pastExams: [
                {
                    id: 3,
                    name: 'Estática',
                    expiresAt: 1508811671643,
                    completed: 10,
                },
                {
                    id: 4,
                    name: 'Mecánica',
                    expiresAt: 1508811671643,
                    completed: 3,
                },
            ],
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
            top10: [
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

## Teacher Group Exams Collection [/teacher_groups_exams/]

**NOTE: All `id` in responses refers to the teacher_group_exams entity**
 
### Create teacher's group exam  [POST]

+ Request (application/json)

        {
            teacher_id: 1,
            groups_id: [1, 3],
            exam_id: 1,
            name: "Cool exam",
            expiresAt: 1485932460000,
        }

+ Response 201 (application/json)

    + Body

            {
                id: 3,
                name: "Cool exam",
                expiresAt: 1485932460000,
                completed: 0,
            }

### Update teacher's group exam  [PATCH]

+ Request (application/json)

        {
            teacher_group_exam_id: 1
            name: "not cool test",
            expiresAt: 1485932460000,
        }

+ Response 201 (application/json)

    + Body

            {
                id: 1,
                group_id: 1,
                name: "not cool test"
                expiresAt: 1485932460000,
            }

### Remove teacher's group exam  [DELETE]

+ Request (application/json)

        {
            teacher_group_exam_id: 1
        }

+ Response 201 (application/json)
    
    + Body

            {
                id: 3,
            }

## Teacher Exams Collection [/teacher_exams/]

### List all teacher's exams [GET /teacher_exams/{id}]

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json)

        [
            {
                id: 1,
                name: 'Leyes de Newton',
                createdAt: 1508811671643,
                assigned: 10,
                questions: [
                    {
                        id: 1,
                        correctAnswer: '4.56',
                        question: '¿Cuál es la magnitud de la gravedad?',
                        incorrectAnswers: ['4.56', '9.14', '4.56'],
                    },
                    {
                        id: 2,
                        correctAnswer: '9.14',
                        question: '¿Cuál es la magnitud de la velocidad?',
                        incorrectAnswers: ['4.56', '4.56', '4.56'],
                    },
                    {
                        id: 3,
                        correctAnswer: '25.3',
                        question: '¿Cuál es la magnitud de la aceleración?',
                        incorrectAnswers: ['4.56', '4.56', '4.56'],
                    },
                ],
            },
            {
                id: 2,
                name: 'Electricidad',
                createdAt: 1508811671643,
                assigned: 10,
                questions: [
                    {
                        id: 1,
                        correctAnswer: '4.56',
                        question: '¿Cuál es la magnitud de la gravedad?',
                        incorrectAnswers: ['4.56', '9.14', '4.56'],
                    },
                    {
                        id: 2,
                        correctAnswer: '9.14',
                        question: '¿Cuál es la magnitud de la velocidad?',
                        incorrectAnswers: ['4.56', '4.56', '4.56'],
                    },
                    {
                        id: 3,
                        correctAnswer: '25.3',
                        question: '¿Cuál es la magnitud de la aceleración?',
                        incorrectAnswers: ['4.56', '4.56', '4.56'],
                    },
                ],
            },
        ],
 
## Teacher Questions Collection [/teacher_questions/]

**NOTE: All `id` in responses refers to the questions entity**

### List all teacher's questions [GET /teacher_questions/{id}]

+ Parameters

    + id: 1 (number, required)

+ Response 200 (application/json)

        [
            {
                id: 1,
                correctAnswer: '4.56',
                question: '¿Cuál es la magnitud de la gravedad?',
                incorrectAnswers: ['4.56', '9.14', '4.56'],
                tags: [
                    {
                        id: 1,
                        name: 'Física',
                    },
                    {
                        id: 2,
                        name: 'Química',
                    },
                ],
            },
            {
                id: 2,
                correctAnswer: '9.14',
                question: '¿Cuál es la magnitud de la velocidad?',
                incorrectAnswers: ['4.56', '4.56', '4.56'],
                tags: [
                    {
                        id: 1,
                        name: 'Física',
                    },
                    {
                        id: 2,
                        name: 'Química',
                    },
                    {
                        id: 3,
                        name: 'Matemáticas',
                    },
                    {
                        id: 4,
                        name: 'Física cuantica nuclear destructiva',
                    },
                ],
            },
            {
                id: 3,
                correctAnswer: '25.3',
                question: '¿Cuál es la magnitud de la aceleración?',
                incorrectAnswers: ['4.56', '4.56', '4.56'],
                tags: [
                    {
                        id: 1,
                        name: 'Física',
                    },
                    {
                        id: 2,
                        name: 'Química',
                    },
                ],
            },
        ]
 
### Create teacher's question  [POST]

**NOTE: Notice that `tags` field in request is an array of *int* and *string*. If the element is an *int*, it refers to an existing `tag_id`. If the element is a *string*, it's a new tag, so it should be added to the `tags` collection**

+ Request (application/json)

        {
            teacher_id: 1,
            question: 'Cool question title',
            correctAnswer: '20',
            incorrectAnswers: ['1', '5', '100'],
            tags: [3, 1, "this is a new tag"],
        }

+ Response 201 (application/json)

    + Body

            {
                id: 4,
                question: 'Cool question title',
                correctAnswer: '20',
                incorrectAnswers: ['1', '5', '100'],
                tags: [
                    {
                        id: 1,
                        name: 'Física',
                    },
                    {
                        id: 3,
                        name: 'Estática',
                    },
                    {
                        id: 7,
                        name: 'this is a new tag',
                    },
                ],
            }

### Update teacher's question  [PATCH]

**NOTE: Notice that `tags` field in request is an array of *int* and *string*. If the element is an *int*, it refers to an existing `tag_id`. If the element is a *string*, it's a new tag, so it should be added to the `tags` collection**

+ Request (application/json)

        {
            question_id: 1,
            question: 'Not cool question title',
            correctAnswer: '24',
            incorrectAnswers: ['1', '5', '100'],
            tags: [3, 1, "this is another new tag"],
        }

+ Response 201 (application/json)

    + Body

            {
                id: 4,
                question: 'Not cool question title',
                correctAnswer: '24',
                incorrectAnswers: ['1', '5', '100'],
                tags: [
                    {
                        id: 1,
                        name: 'Física',
                    },
                    {
                        id: 3,
                        name: 'Estática',
                    },
                    {
                        id: 8,
                        name: 'this is another new tag',
                    },
                ],
            }

### Remove teacher's question  [DELETE]

+ Request (application/json)

        {
            question_id: 1
        }

+ Response 201 (application/json)
    
    + Body

            {
                id: 3,
            }