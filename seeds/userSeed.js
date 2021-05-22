const { Users } = require('../models');

const userData = [
    {
        username: "Martin Smith",
        password: "p@ssword1"
    },
    {
        username: "Matt Sommer",
        password: "p@ssword2"
    },
    {
        username: "Kim Powers",
        password: "p@ssword4"
    },
    {
        username: "Megan Fivecoat",
        password: "p@ssword5"
    },
    {
        username: "Jason Hillis",
        password: "p@ssword6"
    }
];

const seedUsers = () => Users.bulkCreate(userData);

module.exports = seedUsers;
