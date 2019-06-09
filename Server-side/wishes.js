module.exports = {
    getWishesForEvent: (req, res) => {
        const { id } = req.params;
        connection.query(`SELECT * FROM wishes WHERE event_id='${id}' ORDER BY date DESC`, function (err, rows, fields) {
            if (rows){
                res.json({
                    sucess: true,
                    err: null,
                    wishes:rows
                });
            }
            else {
                res.json({
                    sucess: false,
                    wishes: null,
                    err: 'There no wish in this event'
                });
            }
        });
    }
};