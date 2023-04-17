# README 

Create a virtual environment to isolate our package dependencies locally 
```
python3 -m venv env
source env/bin/activate              # on Windows use env\Scripts\activate
```

Install Django and Django REST framework into the virtual environment
```
pip install django
pip install djangorestframework
```

Create a clone of the repository 
```
git clone https://github.com/AlessiaCaironi/progetto_tesi
```

Move in the backend repository of the project
```
cd progetto_tesi/backend
```

Sync the database
```
python3 manage.py makemigration
python3 manage.py migrate
```

Install
```
pip install celery
pip install python-decouple
```
