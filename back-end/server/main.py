from flask import Flask, request

from db.db import SurveyDatabase
from server.api_functions import *
from flask_cors import CORS

db = SurveyDatabase()
app = Flask(__name__)
CORS(app)

@app.route("/", methods=["POST"])
def api_home():
    json_data = request.json
    action = json_data["action"]
    if action == "login":
        return login(db, json_data)
    elif action == "signup":
        return signup(db, json_data)
    elif action == "create_survey":
        return create_survey(db, json_data)
    elif action == "submit_survey":
        return submit_survey(db, json_data)
    elif action == "get_survey":
        return get_survey(db, json_data)
    elif action == "get_surveys":
        return get_surveys(db, json_data)
    elif action == "get_survey_results":
        return get_survey_results(db, json_data)
    elif action == "delete_survey":
        return delete_survey(db, json_data)
    elif action == "delete_question":
        return delete_question(db, json_data)
    elif action == "add_questions":
        return add_questions(db, json_data)
    elif action == "update_survey_name":
        return update_survey_name(db, json_data)


if __name__ == "__main__":
    app.run(port=8001)
