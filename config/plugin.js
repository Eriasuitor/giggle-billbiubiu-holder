'use strict';

// had enabled by egg
// exports.static = true;

exports.sequelize = {
    enabled: true,
    package: 'egg-sequelize'
}

exports.validate = {
    enabled: true,
    package: 'egg-validate'
}

exports.passport = {
    enabled: true,
    package: 'egg-passport'
}

// exports.passportGithub = {
//     enabled: true,
//     package: 'egg-passport-github'
// }