import React, {Component} from 'react';
import ErrorPage from './ErrorPage';

export default class CheckErrorPage extends Component{
    // componentDidMount() {
    //     console.log(this.props.match.path);
    // }

    render() {
        // const {path} = this.props.match;
        const {pathname} = this.props.location;
        return (
            <>
            { pathname !== '/' ? <ErrorPage/> : <></>}
            </>
        );
    }
}