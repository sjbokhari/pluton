# README

pluton. A Simple Webapp for tracking, monitoring and automate the cashflow process build with [RedwoodJS](https://redwoodjs.com).

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
> ```
> yarn redwood --help
> ```
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.
Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)

==================================================================================================

# Self-hosting Redwood: Serverfull

Do you prefer to host a Redwood app on your own server, the traditional serverfull way, instead of all this serverless magic? Well, you can! In this recipe we configure a Redwood app with PM2 and Nginx on a Linux server.

## Example

This repo is a code example but alternatively you can follow the steps in this README.

## Requirements

You should have some basic knowledge of the following tools.

- Linux
- [Nginx](https://nginx.org/en/docs/)
- [Postgres](https://www.postgresql.org/docs/)
- [PM2](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
- Node
- Yarn

## Configuration

### Project

Add Redwood's API server (in the API workspace) and PM2 (in the root) to your project.

```termninal
yarn workspace api add @redwoodjs/api-server
yarn add -D pm2
```

Create a PM2 ecosystem configuration file. For clarity, it's recommended to rename `ecosystem.config.js` to something like `pm2.config.js`.

```terminal
yarn pm2 init
mv ecosystem.config.js pm2.config.js
```

Edit redwood.toml to change the API endpoint:

```toml
apiProxyPath = "/api"
```

Optionally, add some scripts to your top-level package.json.

```json
"scripts": {
  "deploy:setup": "pm2 deploy pm2.config.js production setup",
  "deploy": "pm2 deploy pm2.config.js production deploy"
}
```

### Linux server

Your server should have a user for deployment, which should be configured with an SSH key pair providing access to your production environment. In this example, the user is named `deploy`.

### Nginx

Your Nginx configuration file for the app should look something like this. Typically, this file would be stored at `/etc/nginx/sites-available/redwood-pm2` and is symbolically linked to `/etc/nginx/sites-enabled/redwood-pm2`.

Please note that the trailing slash in the proxy_pass value is essential to correctly map the API functions.

```nginx
server {
  server_name redwood-pm2.example.com;
  listen 80;

  location / {
    root /home/deploy/redwood-pm2/current/web/dist;
  }

  location /api/ {
    proxy_pass http://localhost:8911/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### PM2

The pm2.config.js file is used for PM2 settings. The most important variables are at the top. Note that the port is only used locally on the server and should match the port in the Nginx config.

```javascript
const name = 'redwood-pm2' // Name to use in PM2
const repo = 'git@github.com:njjkgeerts/redwood-pm2.git' // Link to your repo
const user = 'deploy' // Server user
const path = `/home/${user}/${name}` // Path on the server to deploy to
const host = 'example.com' // Server hostname
const port = 8911 // Port to use locally on the server
const build = 'yarn install && yarn rw build && yarn rw prisma migrate deploy && yarn rw prisma db seed' // Build commands

module.exports = {
  apps: [
    {
      name,
      node_args: '-r dotenv/config',
      cwd: `${path}/current/`,
      script: 'node_modules/@redwoodjs/api-server/dist/index.js',
      args: `-f api/dist/functions --port ${port}`,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user,
      host,
      ref: 'origin/master',
      repo,
      path,
      ssh_options: 'ForwardAgent=yes',
      'post-deploy': `${build} && pm2 reload pm2.config.js --env production && pm2 save`,
    },
  },
}
```

> Caveat: the API seems to only work in fork mode in PM2, not [cluster mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/)

## Deploying

### Preparation

First, we need to create the PM2 directories.

```terminal
yarn install
yarn deploy:setup
```

Your server directories are now set. However, the `.env` settings are not yet configured. SSH into your server and create an `.env` file in the `current` subdirectory of the deploy directory.

```terminal
vim /home/deploy/redwood-pm2/current/.env
```

For example, add a DATABASE_URL variable.

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/redwood-pm2
```

Now we can finally deploy the app.

### Actual deploy

Just run the following. It should update the code, take care of database migrations and restart the app in PM2.

```terminal
yarn deploy
```

Enjoy! 😁

### Startup script

To persist the PM2 service during server restarts, `SSH into your server` and run:

```
pm2 startup
```

Follow the instructions as shown.
