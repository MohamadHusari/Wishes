const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
});

module.exports = {
    postImageUpload: (req, res) => {
        const {userid} = req.body;
        // console.log(connection);
        // console.log(userid);
        // console.log(req.files);
        const path = Object.values(req.files)[0].path;
        if(path){
            cloudinary.uploader.upload(path)
                .then(image => {
                    const imgurl = image.secure_url.replace('/upload','/upload/c_thumb,w_200,g_face');
                    connection.query(`UPDATE users SET avatar='${imgurl}' WHERE id='${userid}'`,function (err, rows, fields) {
                        if (err) {
                            res.status(401).json({
                                sucess: false,
                                token: null,
                                err: err.message
                            });
                        }
                        else {
                            res.json({
                                sucess: true,
                                err: null,
                                image:imgurl});
                        }

                    });
                })
        }
        else {
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'image cannot uploaded'
            });
        }



    }
};
