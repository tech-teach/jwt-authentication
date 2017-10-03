# JWT Authentication

Just a little proff of concept for jwt's in a microservice environment.

To run it yourself you need `docker` and `docker-compose` ~~sadly also `node` D:~~

You can start a live reloading dev server with:

```bash
docker-compose -f docker-compose-dev.yml up --build
```

If you prefer the longer route or want to actually deploy the project:

First you need to build the ui,

```bash
# build the ui
cd ui
nvm use
npm install     # yarn install
npm run build   # yarn build
```

And then docker takes care of it, make sure to free up your port 80,

```
docker-compose up --build
```