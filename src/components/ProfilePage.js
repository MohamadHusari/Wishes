import React, {Component} from "react";
import AuthService from './AuthService';

export default class ProfilePage extends Component{
    constructor() {
        super();
        this.Auth = new AuthService();
        this.state = {
            uploading: false,
            image: {}
        }
    }

    componentDidMount() {
        console.log(this.props);
    }
    onChange = e => {
        const files = Array.from(e.target.files);
        this.setState({ uploading: true });

        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(i, file);
        });
        formData.append('userid' , this.props.user.id);
        this.Auth.fetch(false,`${this.Auth.domain}/imageupload`, {
            method: 'POST',
            body: formData
        })
            .then(res => {
                this.setState({
                    uploading: false,
                    image: res.image
                })
            })
    };
   render() {
       return (
           <>
               <h1>Welcome {this.props.user.firstname}</h1>
               <input name="file" type="file" accept="image/x-png,image/gif,image/jpeg"
                      className="file-upload" data-cloudinary-field={this.props.user.username}
                      data-form-data="{ 'transformation': {'crop':'limit','width':512,'height':512}}"
                      onChange={this.onChange}
               />
               <img className="img-thumbnail" src={this.state.image} alt="ourimage" />
           </>
       );
   }
}