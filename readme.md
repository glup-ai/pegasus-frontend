# pegasus.glup.ai

This websites functions as an interface for our machine learning computer, Pegasus, and allows us to remotely switch between different operating systems for machine learning or crypto mining.

The website connects to Pegasus using SSH and sets the next boot drive using the `efibootmgr` command.


## Stack
- Node.js
- Express.js
- Pug.js
- Passport.js 

## Hosting

This website is hosted as a Azure Webapp. Changes to the main branch will automatically be deployed.

## Getting started

1. Clone this repo.
2. Duplicate the file `config/secrets/prod.js` to `config/secrets/dev.js` .
3. Replace `process.env.*` with you development secrets.
4. Run the application: `npm run` .

In production the app fetches the secrets from its environment variables. NB: In the production environment the environment variable `NODE_ENV` must be set to `production`.