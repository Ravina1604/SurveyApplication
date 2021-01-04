from flask import jsonify


def login(db, json_data):
    publisher_data = {"publisher_id": -1}

    if json_data is None or "email" not in json_data or "password" not in json_data:
        return jsonify(publisher_data)

    publisher_data = db.publisher_login(email=json_data["email"], encrypted_password=json_data["password"])
    return jsonify(publisher_data)


def signup(db, json_data):
    result = {"publisher_id": -1}

    if json_data is None or "email" not in json_data or "password" not in json_data or "name" not in json_data:
        return jsonify(result)

    publisher_data = db.create_publisher_account(json_data["email"], json_data["password"], json_data["name"])
    if publisher_data["publisher_id"] > 0:
        return login(db, json_data)
    return jsonify(result)


def create_survey(db, json_data):
    results = db.create_survey(json_data["publisher_id"], json_data["survey_name"], json_data["survey"])
    return jsonify({"survey_id": str(results)})


def get_surveys(db, json_data):
    results = db.get_surveys_for_publisher(json_data["publisher_id"])
    return jsonify(results)


def get_survey(db, json_data):
    results = db.get_survey(json_data["survey_id"])
    return jsonify(results)


def submit_survey(db, json_data):
    results = db.submit_survey(json_data["name"], json_data["email_id"], json_data["survey_id"], json_data["survey"])
    return jsonify(results)


def get_survey_results(db, json_data):
    survey_id = json_data["survey_id"]
    summary = db.get_survey_results(survey_id)
    fillers = db.get_survey_filler_users(survey_id)
    results = {"fillers": fillers, "summary": summary}
    return jsonify(results)


def delete_survey(db, json_data):
    results = db.delete_survey(json_data["survey_id"])
    return jsonify({"success": str(results)})


def delete_question(db, json_data):
    results = db.delete_question(json_data["question_id"])
    return jsonify({"success": str(results)})


def add_questions(db, json_data):
    results = db.add_questions(json_data["survey_id"], json_data["questions"])
    return jsonify({"success": str(results)})


def update_survey_name(db, json_data):
    success = db.update_survey_name(json_data["survey_id"], json_data["survey_name"])
    return {"success": str(success)}
