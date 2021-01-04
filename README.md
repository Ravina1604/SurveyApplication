# SurveyApp

## To run backend server:
1) go to back-end folder

2) unzip the venv.zip and go to unzipped venv folder.

3) #### For Windows:
open cmd and go to the back-end folder of project directory location and follow below instructions.
	cd venv
  cd Scripts
	activate.bat
	cd ../..
	set PYTHONPATH="project_directory_path"
	cd server
	python main.py


#### For Linux:
	cd venv
  cd Scripts
	./activate
	cd ../..
	export PYTHONPATH=$(pwd)
	cd server
	python main.py


### Note:
All dependecies are also listed in requirements.txt and can be installed using below command.
	pip install -r requirements.txt

I have shipped the whole venv to avoid any possible runtime issue.



## To run backend server:

1) go to front-end folder

2) run npm install (run in node.js cmd or VS code editor)

3) npm start
Open http://localhost:3000 to view it in the browser.




	
