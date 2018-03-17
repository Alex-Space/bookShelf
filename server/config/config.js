const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: 'super-secret-password-qwerty',
        DATABASE: 'mongodb://localhost:27017/bookShelf'
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}