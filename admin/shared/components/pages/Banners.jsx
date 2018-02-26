import React from 'react';
import fetch from 'isomorphic-fetch';
import RaisedButton from 'material-ui/RaisedButton';

export default class Banners extends React.Component {

    uploadFile = (e) => {

        var file = [...e.target.files][0];
        const data = new FormData();
        data.append('file', file);
        data.append('id', e.target.id);
        data.append(
            "_csrf", document.head.querySelector('[name="_csrf"]').content
        );

        const init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: data
        };

        fetch('/api/file/upload-banner', init)
            .then(res => {
                if (res.status >= 500) {
                    throw new Error('Bad response from server');
                }

                return res.json();
            })
    };


    render() {
        return (
            <div>
                <ul>
                    <li style={{'listStyleType': 'none'}}>
                        <input type="file"
                               accept="image/*"
                               className="upload-file"
                               onChange={this.uploadFile}
                               ref='inputFile1'
                               id="1"
                        />
                        <RaisedButton
                            className="margin"
                            label="banner 1"
                            primary={true}
                            onTouchTap={()=>this.refs.inputFile1.click()}
                        />
                    </li>
                    <li style={{'listStyleType': 'none'}}>
                        <input type="file"
                               accept="image/*"
                               className="upload-file"
                               onChange={this.uploadFile}
                               ref='inputFile2'
                               id="2"
                        />
                        <RaisedButton
                            className="margin"
                            label="banner 2"
                            primary={true}
                            onTouchTap={()=>this.refs.inputFile2.click()}
                        />
                    </li>
                    <li style={{'listStyleType': 'none'}}>
                        <input type="file"
                               accept="image/*"
                               className="upload-file"
                               onChange={this.uploadFile}
                               ref='inputFile3'
                               id="3"
                        />
                        <RaisedButton
                            className="margin"
                            label="banner 3"
                            primary={true}
                            onTouchTap={()=>this.refs.inputFile3.click()}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}
