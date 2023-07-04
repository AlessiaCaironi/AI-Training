# README - DA SISTEMARE

*L’applicazione web “AI-Training” è uno strumento che consente di allenare un modello AI di classificazione delle immagini, permettendo ad un utente di costituire il dataset di immagini su cui si basa il funzionamento del modello. Di seguito sono riportate le istruzioni da seguire per installarlo.*

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

Create a file .env with the SECRET_KEY

Install
```
pip install -r requirements.txt
```

Sync the database
```
python3 manage.py makemigrations
python3 manage.py migrate
```

Create superuser
```
python3 manage.py createsuperuser
```

Start server
```
python3 manage.py runserver 
```

Install Redis 
```
sudo apt-get update
sudo apt install redis
redis-cli --version
sudo apt-get install redis-server
sudo systemctl enable redis-server      # ogni volta che si apre la vm parte il server di Redis
```

Check if Redis is active 
```
sudo systemctl status redis
```

Start Celery 
```
celery -A backend.celery worker --pool=solo -l info 
```

Install and start
```
cd ../frontend/
sudo apt install npm
npm install react-scripts 
npm install @mui/material @emotion/react @emotion/styled
npm install react-awesome-lightbox --force
npm start
```
