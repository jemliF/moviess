# Movies

### Installation

```sh
npm install
```

### Environment
* APP_PORT: application server port
* MONGO_DB_HOST: mongodb host url 
* MONGO_DB_PORT: mongodb host port
* MONGO_DB_DATABASE: name of the mongodb database
* MONGO_DB_USERNAME: mongodb username
* MONGO_DB_PASSWORD: mongodb password
* ENVIRONMENT: dev/prod

### Start
```sh
npm run dev
```

### Deployment
You will need:
* [Git](https://git-scm.com/)
* [Heroku account](https://www.heroku.com/)
* A Heroku application
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
```sh
heroku login
heroku git:remote -a your_heroku_app_name
git push heroku master
heroku logs
heroku ps:scale web=1
```
Now, go to Heroku dashboard and click on `Open app` (top right of the page) 