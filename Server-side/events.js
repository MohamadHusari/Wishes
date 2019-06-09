module.exports = {
    getEventById: (req, res) => {
        const { id } = req.params;
        connection.query(`SELECT * FROM events WHERE id='${id}'`, function (err, rows, fields) {
            if (rows[0]){
                connection.query(`SELECT id, firstname, lastname, username, avatar FROM users WHERE id='${rows[0].user_id}'`, function (err2, rows2, fields2) {
                    res.json({
                        sucess: true,
                        err: null,
                        event:rows[0],
                        user:rows2[0]
                    });
                });
            }
            else {
                res.json({
                    sucess: false,
                    event: null,
                    err: 'Event id not exists'
                });
            }
        });
    },
    PostAddNewWishToEvent: (req, res) => {
        const { id } = req.params;
        const {userid, title, message, name} = req.body;
        let Sqlquery;
        if(userid !== undefined){
            Sqlquery = `INSERT INTO wishes (\`event_id\`, \`title\`, \`message\`, \`name\`, \`user_id\`) VALUES (${id}, '${title}', '${message}', '${name}', ${userid})`;
        }
        else {
            Sqlquery = `INSERT INTO wishes (\`event_id\`, \`title\`, \`message\`, \`name\`, \`user_id\`) VALUES (${id}, '${title}', '${message}', '${name}', -1)`;
        }

        console.log(Sqlquery);

        connection.query(Sqlquery, function (err, data) {
            if (!err) {
                connection.query(`SELECT * FROM wishes WHERE id='${data.insertId}'`, function (err1, rows1, fields) {
                    if(rows1) {
                        res.json({
                            sucess: true,
                            err: null,
                            wish: rows1[0]
                        });
                    }
                });
            } else {
                res.json({
                    sucess: false,
                    wish: null,
                    err: 'Error with inserting data into server'
                });
            }
        });
    },
    getAllEventsByUserID: (req, res) => {
        const { userid } = req.params;
        connection.query(`SELECT * FROM events WHERE user_id='${userid}'`, function (err, rows, fields) {
            if (!err) {
                if (rows) {
                    res.json({
                        sucess: true,
                        err: null,
                        events: rows
                    });
                } else {
                    res.json({
                        sucess: false,
                        events: null,
                        err: 'Error User id not correct'
                    });
                }
            } else {
                res.json({
                    sucess: false,
                    events: null,
                    err: 'Error User id not correct'
                });
            }
        });
    },
    deleteEventbyId : (req, res) => {
        const {eventid} = req.params;
        connection.query(`DELETE FROM events WHERE id='${eventid}'`, function (err, rows, fields) {
            if (!err) {
                res.json({
                    sucess: true,
                    err: null,
                    msg: "You Event has been Succesfully deleted"
                });
            } else {
                res.json({
                    sucess: false,
                    msg: "Error Cannot delete event right now, Please try again later",
                    err: 'Error'
                });
            }
        });
    },
    postAddEvent : (req, res) => {
        const {userid, title, description, category, date, where} = req.body;
        // let newdate = date.substr(0,date.length - 5);
        // console.log(newdate);
        // newdate = newdate.replace('T',' ');
        const Sqlquery = `INSERT INTO events (\`category\`, \`title\`, \`description\`, \`e_where\`, \`user_id\`, \`date\`) VALUES ('${category}', '${title}', '${description}', '${where}', ${userid}, '${date}')`;
        connection.query(Sqlquery, function (err, data) {
            console.log(err);
            if (!err) {
                res.json({
                    sucess: true,
                    err: null,
                    eventid: data.insertId
                });
            }
            else {
                res.json({
                    sucess: false,
                    eventid: null,
                    err: 'Error, cannot add an event right now try again later'
                });
            }
        });
    },
    postAdvSearchEvents : (req, res) => {
        const {title, from, to, where } = req.body;
        let Sqlquery = `SELECT * FROM events WHERE`;
        let orglen = Sqlquery.length;
        if (title !== undefined && title !== "") {
            Sqlquery += ` (title LIKE '% ${title} %' or title LIKE '%${title}' or title LIKE '${title}%')`;
        }
        if((from !==  undefined && from !== "") && (to !== undefined && to !== "" )){
            if(Sqlquery.length > orglen){
                Sqlquery += ` AND`;
                orglen = Sqlquery.length;
            }
            Sqlquery += ` (date BETWEEN '${from} 00:00:00' AND '${to} 00:00:00')`;
        }
        else if (from !== undefined && from !== "") {
            if(Sqlquery.length > orglen){
                Sqlquery += ` AND`;
                orglen = Sqlquery.length;
            }
            Sqlquery += ` (date >= '${from} 00:00:00')`;
        }
        else if (to !== undefined && to !== "") {
            if(Sqlquery.length > orglen){
                Sqlquery += ` AND`;
                orglen = Sqlquery.length;
            }
            Sqlquery += ` (date <= '${to} 00:00:00')`;
        }
        if(where !== undefined && where !== "") {
            if(Sqlquery.length > orglen){
                Sqlquery += ` AND`;
                orglen = Sqlquery.length;
            }
            Sqlquery += ` (e_where='${where}')`;
        }
        console.log(Sqlquery);
        connection.query(Sqlquery, function (err, rows, fields) {
            if (!err) {
                res.json({
                    sucess: true,
                    err: null,
                    events: rows
                });
            } else {
                res.json({
                    sucess: false,
                    events: null,
                    err: 'Error'
                });
            }
        });

    }
};