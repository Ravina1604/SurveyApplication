import enum


class Tables(enum.Enum):
    Publishers = "Publishers"
    Users = "Users"
    SurveyUsers = "SurveyUsers"
    Surveys = "Surveys"
    Questions = "Questions"
    Answers = "Answers"
    UsersAnswers = "UsersAnswers"


create_table_queries = dict()
create_index_queries = dict()

create_table_queries[Tables.Publishers] = """ CREATE TABLE IF NOT EXISTS Publishers (
                                    PublisherId INTEGER   PRIMARY KEY AUTOINCREMENT,
                                    Email text NOT NULL UNIQUE,
                                    EncryptedPassword text NOT NULL,
                                    Name text NOT NULL
                                ); """

create_index_queries[Tables.Publishers] = """ CREATE  INDEX publishers_email_index
                                          ON Publishers(Email);
                                           CREATE  INDEX publishers_id_index
                                          ON Publishers(PublisherId);
                                       """

create_table_queries[Tables.Users] = """ CREATE TABLE IF NOT EXISTS Users (
                                    UserId INTEGER   PRIMARY KEY AUTOINCREMENT,
                                    Email text NOT NULL UNIQUE,
                                    Name text NOT NULL UNIQUE
                                ); """

create_index_queries[Tables.Users] = """ CREATE  INDEX users_email_index
                                          ON Users(Email);
                                           CREATE  INDEX users_id_index
                                          ON Users(UserId);
                                       """

create_table_queries[Tables.Surveys] = """ CREATE TABLE IF NOT EXISTS Surveys (
                                            SurveyId INTEGER  PRIMARY KEY AUTOINCREMENT,
                                            PublisherId integer NOT NULL,
                                            SurveyName text NOT NULL,
                                            FOREIGN KEY (PublisherId) REFERENCES Publishers (PublisherId)
                                        ); """

create_index_queries[Tables.Surveys] = """  CREATE  INDEX publisher_survey_index_publisher_id
                                        ON Surveys(PublisherId);
                                        CREATE  INDEX publisher_survey_index_surveyid
                                        ON Surveys(SurveyId);
                                     """

create_table_queries[Tables.SurveyUsers] = """ CREATE TABLE IF NOT EXISTS SurveyUsers (
                                            SurveyId integer NOT NULL,
                                            UserId integer NOT NULL,
                                            FOREIGN KEY (UserId) REFERENCES Users (UserId),
                                            FOREIGN KEY (SurveyId) REFERENCES Surveys (SurveyId)
                                        ); """

create_index_queries[Tables.SurveyUsers] = """  CREATE  INDEX survey_users_index_publisher_id
                                        ON SurveyUsers(SurveyId);
                                     """

create_table_queries[Tables.Questions] = """ CREATE TABLE IF NOT EXISTS Questions (
                                                   SurveyId INTEGER  NOT NULL,
                                                   QuestionId integer PRIMARY KEY AUTOINCREMENT,
                                                   QuestionText text NOT NULL,
                                                   FOREIGN KEY (SurveyId) REFERENCES Surveys (SurveyId)
                                               ); """
create_index_queries[Tables.Questions] = """ CREATE  INDEX surveys_questions_surveyid_index
                                ON Questions(SurveyId);
                                CREATE  INDEX surveys_questions_questionid_index
                                ON Questions(QuestionId);
                             """

create_table_queries[Tables.Answers] = """ CREATE TABLE IF NOT EXISTS Answers (
                                                   AnswerId integer PRIMARY KEY AUTOINCREMENT,
                                                   QuestionId integer NOT NULL,
                                                   AnswerText text NOT NULL,
                                                   FOREIGN KEY (QuestionId) REFERENCES Questions (QuestionId)
                                                   ); """

create_index_queries[Tables.Answers] = """ CREATE  INDEX questions_answers_question_id
                                ON Answers(QuestionId);
                                CREATE  INDEX questions_answers_answer_id
                                ON Answers(AnswerId);
                             """

create_table_queries[Tables.UsersAnswers] = """ CREATE TABLE IF NOT EXISTS UsersAnswers (
                                               UserId integer NOT NULL,
                                               QuestionId integer NOT NULL,
                                               AnswerId integer NOT NULL,
                                               FOREIGN KEY (UserId) REFERENCES Users (UserId),
                                               FOREIGN KEY (AnswerId) REFERENCES Answers (AnswerId)
                                               FOREIGN KEY (QuestionId) REFERENCES Questions (QuestionId)
                                               ); """

create_index_queries[Tables.UsersAnswers] = """ CREATE  INDEX users_answers_user_id
                                ON UsersAnswers(UserId);
                                CREATE  INDEX users_answers_question_id
                                ON UsersAnswers(QuestionId);
                             """
