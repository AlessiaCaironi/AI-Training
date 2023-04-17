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

Move in the repository 
```
cd progetto_tesi
```

Sync the database
```
python manage.py migrate
```