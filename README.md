# README - DA SISTEMARE

*L’applicazione web “AI-Training” è uno strumento che consente il processing di immagini e la definizione di dataset utilizzabili nello sviluppo di modelli di Intelligenza Artificiale di classificazione delle immagini.*

Create a virtual environment to isolate our package dependencies locally 
```
python3 -m venv env
source env/bin/activate              # on Windows use env\Scripts\activate
```

Create a clone of the repository 
```
git clone https://github.com/AlessiaCaironi/progetto_tesi
```

Start and run Docker containers
```
docker compose -f docker/docker-compose-dev.yml -p aitraining up --build -d 
```
