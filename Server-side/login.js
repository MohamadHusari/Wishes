const jwt = require('jsonwebtoken');

module.exports = {
    postCheckUserAccount: (req, res) => {
        // console.log(req);
        const { username, password } = req.body;
         // console.log(username);
        // Finds first username and password match in users array (assumes usernames are unique)
        connection.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`, function (err, rows, fields) {
            if (rows[0]) { // User credentials matched (are valid)
                // console.log('The solution is: ', rows[0]);
                let token = jwt.sign({
                    id: rows[0].id,
                    firstname: rows[0].firstname,
                    lastname: rows[0].lastname,
                    username: rows[0].username,
                    avatar: rows[0].avatar
                }, 'wixwishes is very secret site', {expiresIn: 129600}); // Sigining the token
                res.json({
                    sucess: true,
                    err: null,
                    token
                });
            } else { // User credentials did not match (are not valid) or no user with this username/password exists
                res.status(401).json({
                    sucess: false,
                    token: null,
                    err: 'Username or password is incorrect'
                });
            }
        });
    }
};