# Sportacus project

Sportacus is a sport application made for creating, sharing, and following your sportive program.

## Getting Started

To install this application on your desktop, you will need to have npm, pip, virtualenv, docker and caddy installed.

Start by cloning the project:
```
git clone git@gitlab.com:berenger.salmon/sport_programs.git
```


### Installing

First, you need to create a postgres db. Personnaly, I used docker to do this :

```
docker run -d --net host -e POSTGRES_PASSWORD=GREATPASS postgres
```

You need to create a dev env folder in back to make it work :

```
cd sport_programs/back/
virtualenv env -p python3
```

Then :

```
source env/bin/activate
pip install -r requirements.txt
python manage.py db upgrade
python manage.py fixtures
python manage.py runserver
```

In an other shell :
```
cd back/medias/
caddy
```
And in a last shell:
```
cd front/
npm install
npm start
```

Finally, open your brower at http://localhost:8080
