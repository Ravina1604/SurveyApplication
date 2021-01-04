import sqlite3
from sqlite3 import Error
import os
from collections import defaultdict
from db.queries import create_index_queries, create_table_queries


class SurveyDatabase:
    def __init__(self, db_name="survey.sqlite"):
        """ create a database connection to a SQLite database """
        self.conn = None
        # # TODO remove database deletion
        # if os.path.exists(db_name):
        #     os.remove(db_name)

        try:
            self.conn = sqlite3.connect(db_name, check_same_thread=False)
            self.cursor = self.conn.cursor()
            print("Connected to database: ", db_name)
        except Error as e:
            print(e)

        for table in create_table_queries.keys():
            if self.conn is not None:
                print("Creating table for query: ", table)
                create_table_query = create_table_queries[table]
                create_index_query = create_index_queries.get(table, "")
                self._create_table(create_table_query, create_index_query)
            else:
                print("Error! cannot create the database connection.")

    def _create_table(self, create_table_sql, create_index_query=""):
        try:
            self.cursor.execute(create_table_sql)
            if create_index_query:
                self.cursor.executescript(create_index_query)
        except Error as e:
            print(e)

    def create_publisher_account(self, email, encrypted_password, name):
        get_account_query = """ select count(PublisherId) from Publishers where Email=\"{}\" """.format(email)
        result = {"publisher_id": -1}

        try:
            account_count = self.cursor.execute(get_account_query).fetchall()[0][0]
            if account_count:
                return result  # account already exists

            create_publisher_query = """ INSERT INTO  Publishers(Email,  EncryptedPassword,Name)
             VALUES('{}', '{}', '{}');""".format(email, encrypted_password, name)

            self.cursor.execute(create_publisher_query)
            self.conn.commit()
        except Error as e:
            print(e)
            return result

        return self.publisher_login(email, encrypted_password)

    def publisher_login(self, email, encrypted_password):
        get_account_query = """ select PublisherId, EncryptedPassword, Email, Name from Publishers where Email=\"{}\" """.format(
            email)

        result = {"publisher_id": -1}
        try:
            account = self.cursor.execute(get_account_query).fetchall()
            if not account or account[0][1] != encrypted_password:
                return result
        except Error as e:
            print(e)
            return result

        return {"publisher_id": account[0][0], "email": account[0][2], "name": account[0][3]}

    def add_questions(self, survey_id, questions):
        try:
            for question in questions:
                question_text = question["question_text"]
                answers_texts = question["answer_texts"]
                insert_into_survey_questions_query = """ INSERT INTO  Questions(SurveyId, QuestionText)
                                 VALUES('{}','{}');""".format(survey_id, question_text)
                self.cursor.execute(insert_into_survey_questions_query).fetchall()
                question_id = self.cursor.execute("SELECT last_insert_rowid() ").fetchall()[0][0]

                for answer in answers_texts:
                    create_answer_query = """ INSERT INTO  Answers(QuestionId, AnswerText)
                                                 VALUES('{}','{}');""".format(question_id, answer)

                    self.cursor.execute(create_answer_query)
            self.conn.commit()
        except Error as e:
            print(e)
            return False

        return True

    def create_survey(self, publisher_id, survey_name, survey_data):

        insert_users_survey_query = """ INSERT INTO  Surveys(PublisherId, SurveyName)
                             VALUES('{}','{}');""".format(publisher_id, survey_name)
        try:
            self.cursor.execute(insert_users_survey_query).fetchall()
            self.conn.commit()
            survey_id = self.cursor.execute("SELECT last_insert_rowid()").fetchall()[0][0]
            for survey in survey_data:
                self.add_questions(survey_id, [{"question_text": survey["question_text"],
                                                "answer_texts": survey["answer_texts"]}])
            self.conn.commit()
            print("Survey Inserted")

        except Error as e:
            print(e)
            return -1

        return survey_id

    def _submit_answer(self, user_id, question_id, answer_id):

        insert_users_survey_query = """ INSERT INTO  UsersAnswers(UserId,QuestionId,AnswerId)
                                     VALUES({},{},{});""".format(user_id, question_id, answer_id)
        try:
            self.cursor.execute(insert_users_survey_query).fetchall()
        except Error as e:
            print(e)
            return False

        return True

    def get_survey(self, survey_id):
        get_survey_questions_query = """ SELECT QuestionId, QuestionText from  Questions
                                 where SurveyId='{}' """.format(survey_id)

        questions = self.cursor.execute(get_survey_questions_query).fetchall()

        get_survey_name_query = """ SELECT SurveyName from  Surveys
                                         where SurveyId='{}' """.format(survey_id)
        survey_name = self.cursor.execute(get_survey_name_query).fetchall()[0][0]

        survey = []
        for question in questions:
            question_data = {}

            question_id = question[0]
            question_text = question[1]

            question_data["question_id"] = question_id
            question_data["question_text"] = question_text

            get_users_answers_query = """ SELECT AnswerId, AnswerText from  Answers
                                             where QuestionId={} """.format(question_id)

            user_answers = self.cursor.execute(get_users_answers_query).fetchall()
            answers_data = []
            for answer in user_answers:
                answer_data = {}
                answer_id = answer[0]
                answer_text = answer[1]

                answer_data["answer_id"] = answer_id
                answer_data["answer_text"] = answer_text
                answers_data.append(answer_data)

            question_data["answers"] = answers_data
            survey.append(question_data)

        return {"survey_id": survey_id, "survey_name": survey_name, "survey_data": survey}

    def submit_survey(self, name, email, survey_id, survey):
        get_user_query = """ select UserId from Users where Email=\"{}\" """.format(email)
        try:
            account = self.cursor.execute(get_user_query).fetchall()

            if not account:
                insert_user_data_query = """ INSERT INTO  Users(Email,Name)
                                     VALUES('{}','{}'); """.format(email, name)
                self.cursor.execute(insert_user_data_query)
                user_id = self.cursor.execute("SELECT last_insert_rowid()").fetchall()[0][0]
            else:
                user_id = account[0]
            insert_user_survey_mapping_query = """ INSERT INTO  SurveyUsers(SurveyId,UserId)
                                     VALUES('{}','{}'); """.format(survey_id, user_id)

            self.cursor.execute(insert_user_survey_mapping_query)

            for question_id, answer_id in survey.items():
                self._submit_answer(user_id, question_id, answer_id)
            self.conn.commit()
        except Error as e:
            print(e)
            return False

        return True

    def get_surveys_for_publisher(self, publisher_id):
        fetch_survey_query = """ SELECT SurveyId, SurveyName from  Surveys
                                 where PublisherId={} """.format(publisher_id)
        surveys_data = []

        try:
            surveys = self.cursor.execute(fetch_survey_query).fetchall()
            for survey in surveys:
                surveys_data.append({"survey_id": survey[0], "survey_name": survey[1]})
            from pprint import  pprint
        except Error as e:
            print(e)

        return surveys_data

    def get_survey_filler_users(self, survey_id):
        get_survey_filler_query = """ SELECT Email, Name from  SurveyUsers INNER JOIN Users ON SurveyUsers.UserId = Users.UserId 
                                         where SurveyId='{}' """.format(survey_id)
        users = self.cursor.execute(get_survey_filler_query).fetchall()
        users_data = []
        for user in users:
            user_data = {}
            user_data["email"] = user[0]
            user_data["name"] = user[1]
            users_data.append(user_data)

        return users_data

    def get_survey_results(self, survey_id):
        get_survey_questions_query = """ SELECT QuestionId, QuestionText from  Questions
                                 where SurveyId='{}' """.format(survey_id)

        questions = self.cursor.execute(get_survey_questions_query).fetchall()

        questions_answers_id = defaultdict(dict)
        questions_answers_text = defaultdict(dict)

        for question in questions:
            question_id = question[0]
            question_text = question[1]

            get_users_answers_query = """ SELECT AnswerId from  UsersAnswers
                                             where QuestionId={} """.format(question_id)

            user_answers = self.cursor.execute(get_users_answers_query).fetchall()

            for answer in user_answers:
                answer_id = answer[0]
                questions_answers_id[question_id][answer_id] = questions_answers_id[question_id].get(answer_id, 0) + 1

            get_questions_answers_query = """ SELECT AnswerId, AnswerText from  Answers
                                                                     where QuestionId={} """.format(question_id)

            unique_answers = self.cursor.execute(get_questions_answers_query).fetchall()

            for answer in unique_answers:
                answer_id = answer[0]
                answer_text = answer[1]
                questions_answers_text[question_text][answer_text] = questions_answers_id[question_id].get(answer_id, 0)

        return questions_answers_text

    def delete_question(self, question_id, commit=True):
        delete_question_query = """ DELETE FROM UsersAnswers WHERE QuestionId='{}';
                                    DELETE FROM Answers WHERE QuestionId='{}';
                                    DELETE FROM Questions WHERE QuestionId='{}';
                                    """.format(question_id, question_id, question_id)
        try:
            self.cursor.executescript(delete_question_query)
            if commit:
                self.conn.commit()
            return True
        except Error as e:
            print(e)
            return False

    def delete_survey(self, survey_id):
        get_survey_questions_query = """ SELECT QuestionId, QuestionText from  Questions
                                         where SurveyId={} """.format(survey_id)

        try:
            questions = self.cursor.execute(get_survey_questions_query).fetchall()
            for question in questions:
                question_id = question[0]
                self.delete_question(question_id, commit=False)

            delete_survey_query = """ DELETE FROM Surveys WHERE SurveyId='{}';""".format(survey_id)
            self.cursor.execute(delete_survey_query).fetchall()
            self.conn.commit()
            return True
        except Error as e:
            print(e)
            return False

    def update_survey_name(self, survey_id, survey_name):
        try:
            update_survey_name_query = """UPDATE Surveys 
                                SET SurveyName = '{}' where SurveyId = {};""".format(survey_name, survey_id)
            self.cursor.execute(update_survey_name_query).fetchall()
            self.conn.commit()
            return True
        except Error as e:
            print(e)
            return False
