module.exports = {
    postSignUpNewAccount: (req, res) => {
        const {firstname, lastname, username, password, avatar} = req.body;
        const Sqlquery = `INSERT INTO users (\`firstname\`, \`lastname\`, \`username\`, \`password\`, \`avatar\`) VALUES ('${firstname}', '${lastname}', '${username}', '${password}' , '${avatar}')`;
        connection.query(`SELECT * FROM users WHERE username='${username}'`, function (err, data) {
            if (!err) {
                connection.query(Sqlquery, function (err1, data) {
                    if(!err1) {
                        res.json({
                            sucess: true,
                            err: null,
                            userid: data.insertId
                        });
                    }
                });
            } else {
                res.json({
                    sucess: false,
                    user: null,
                    err: 'Username is already exists'
                });
            }
        });
    }
};