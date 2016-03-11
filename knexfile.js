// Update with your config settings.



module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/oauth_intro'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
