import json
import requests
from pprint import pprint

url = "http://127.0.0.1:8001/"

response = requests.post(url=url, json={"action": "login"})
print(json.loads(response.content))

response = requests.post(url=url, json={"action": "login", "email": "a@gmail.com", "password": "pass"})
print(json.loads(response.text))

response = requests.post(url=url,
                         json={"action": "signup", "email": "aaaaaa@gmail.com", "password": "pass", "name": "name1"})
print(json.loads(response.text))

response = requests.post(url=url, json={"action": "get_surveys", "publisher_id": "1"})
print(json.loads(response.text))

response = requests.post(url=url, json={"action": "get_survey_results", "survey_id": "1"})
print(json.loads(response.text))

response = requests.post(url=url, json={"action": "delete_question", "question_id": "2"})
print(json.loads(response.text))

response = requests.post(url=url,
                         json={"action": "add_questions", "survey_id": "1",
                               "questions": [
                                   {"question_text": "are you in Japan",
                                    "answer_texts": ["yes", "no", "you guess"]
                                    },
                                   {"question_text": "are you in India",
                                    "answer_texts": ["yes", "no", "you guess"]
                                    }
                               ]
                               }
                         )
print(json.loads(response.text))

response = requests.post(url=url, json={"action": "get_survey_results", "survey_id": "1"})
print(json.loads(response.text))

response = requests.post(url=url, json={"action": "delete_survey", "survey_id": "1", "publisher_id": "1"})
print(json.loads(response.text))

response = requests.post(url=url, json={"action": "get_survey_results", "survey_id": "1"})
print(json.loads(response.text))

survey = [{"question_text": "How many total counties are there",
           "answer_texts": [200, 225, 250]},
          {"question_text": "How many total rivers are there",
           "answer_texts": [10000, 200000, 300000]}]
response = requests.post(url=url, json={"action": "create_survey", "publisher_id": "1", "survey_name": "world",
                                        "survey": survey})
survey_id = json.loads(response.text)['survey_id']
print(survey_id)

print("getting survey results")
response = requests.post(url=url, json={"action": "get_survey_results", "survey_id": survey_id})
print(json.loads(response.text))

survey_filled = {2: 1}
response = requests.post(url=url, json={"action": "submit_survey", "name": "name2", "email_id": "pqw2gmail.com",
                                        "survey_id": survey_id, "survey": survey_filled})
print(json.loads(response.text))

response = requests.post(url=url, json={"action": "get_survey", "survey_id": survey_id})
pprint(json.loads(response.text))
