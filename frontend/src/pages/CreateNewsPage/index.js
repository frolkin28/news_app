import React from 'react';
import { Redirect } from "react-router-dom";
import UserContext from '../../util/context';
import Loader from '../../components/Loader';
import Cookies from 'js-cookie';
import './styles.css';


class CreateNewsPage extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            fileName: "Upload a image",
            file: null,
            title: "",
            content: "",
            loading: false,
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.uploadFile = this.uploadFile.bind(this);

    }

    handleTitleChange(event) {
        this.setState(
            { title: event.target.value }
        );
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        const fileName = event.target.files[0].name;
        this.setState(
            {
                file,
                fileName,
            }
        );
        this.uploadFile(file);
    }

    uploadFile(file) {
        const formData = new FormData();
        let ok;

        this.setState({ loading: true });
        formData.append('file', file);

        const token = Cookies.get('csrftoken');
        const imageRequest = new Request(
            '/api/image/',
            {
                method: 'POST',
                headers: {
                    'X-CSRFToken': token,
                },
                body: formData,
            }
        );

        fetch(imageRequest)
            .then(res => {
                if (res.status > 499) {
                    alert('Something went wrong');
                    this.setState({ loading: false });
                    return;
                }
                else if (res.status > 299) {
                    ok = false;
                }
                else {
                    ok = true;
                }
                return res.json();
            })
            .then(data => {
                if (!ok) {
                    this.setState(
                        {
                            file: null,
                            fileName: "Upload a image",
                        }
                    );
                    let message = '';
                    for (let key in data) {
                        message += `\n${data[key]}`;
                    }
                    alert(message);
                }
                this.setState({ loading: false });
            });
    }

    handleContentChange(event) {
        this.setState(
            { content: event.target.value }
        );
    }



    render() {
        const { user } = this.context;

        if (!user) return <Redirect to="/login" />

        return (
            <div className="create-news-page">
                <div className="create-news-form-box">
                    <p className="create-news-form-title" align="center">Create news</p>
                    <form className="create-news-form">
                        <input
                            className="create-news-input"
                            type="text"
                            placeholder="Title"
                            onChange={this.handleTitleChange}
                        />
                        <textarea
                            className="create-news-content"
                            maxLength="1000"
                            rows="15"
                            onChange={this.handleContentChange}
                        />
                        <div className="upload-btn-wrapper">
                            <button className="btn">{this.state.fileName}</button>
                            <input type="file" name="myfile" onChange={this.handleFileChange} />
                        </div>
                        {/* <button className="submit" align="center">Create news</button> */}
                        {this.state.loading && <Loader />}
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateNewsPage;