const Sequelize = require('sequelize')
const sequelize = require('./sequelize-rest')

const Movie = sequelize.define('movies',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    yearOfRelease: {
      type: Sequelize.INTEGER,
      field: 'year_of_release',
      allowNull: false
    },
    synopsis: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false,
    tableName: 'movies'
  })
module.exports = Movie