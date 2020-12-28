import React from 'react';
import { Redirect } from "react-router-dom";
import UserContext from '../../util/context';
import Loader from '../../components/Loader';
import RubricForm from '../../components/RubricForm';
import TagForm from '../../components/TagForm';
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
            uploadedFile: null,
            newsCreated: false,
            selectedRubrics: [],
            selectedTags: [],
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isDataValid = this.isDataValid.bind(this);

    }

    addRubric = (rubric) => {
        this.setState((prevState) => {
            return { selectedRubrics: [...prevState.selectedRubrics, rubric] };
        })
    }

    removeRubric = (rubric) => {
        this.setState((prevState) => {
            const newRubrics = prevState.selectedRubrics.filter(
                item => item.uuid !== rubric.uuid
            );
            return { selectedRubrics: newRubrics };
        })
    }

    addTag = (tag) => {
        this.setState((prevState) => {
            return { selectedTags: [...prevState.selectedTags, tag] };
        })
    }

    removeTag = (tag) => {
        this.setState((prevState) => {
            const newTags = prevState.selectedTags.filter(
                item => item.uuid !== tag.uuid
            );
            return { selectedTags: newTags };
        })
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
                    return {};
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
                    if (message) {
                        alert(message);
                    }
                }
                else {
                    this.setState({ uploadedFile: data })
                }
                this.setState({ loading: false });
            });
    }

    handleContentChange(event) {
        this.setState(
            { content: event.target.value }
        );
    }


    isDataValid() {
        const title = this.state.title;
        const content = this.state.content;
        const uploadedFile = this.state.uploadedFile;
        if (title && content && uploadedFile) {
            return true;
        }
        return false;
    }

    handleSubmit(event) {
        event.preventDefault();
        const isDataValid = this.isDataValid();
        if (!isDataValid) {
            alert('Fill the form properly');
            return;
        }

        const token = Cookies.get('csrftoken');
        const newsRequest = new Request(
            '/api/news/',
            {
                method: 'POST',
                headers: {
                    'X-CSRFToken': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: this.state.title,
                    content: this.state.content,
                    photo: this.state.uploadedFile,
                    pubrics: this.state.selectedRubrics,
                    tags: this.state.selectedTags,
                }),
            }
        );


        let ok;
        fetch(newsRequest)
            .then(res => {
                if (res.status > 499) {
                    alert('Something went wrong');
                    this.setState({ loading: false });
                    return {};
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
                    let message = '';
                    for (let key in data) {
                        message += `\n${data[key]}`;
                    }
                    if (message) {
                        alert(message);
                    }
                    this.setState({ loading: false });
                }
                else {
                    this.setState({ loading: false });
                    this.setState({ newsCreated: true });
                }
            });
    }


    render() {
        const { user } = this.context;

        if (!user) return <Redirect to="/login" />
        if (this.state.newsCreated) return <Redirect to="/" exact />

        return (
            <div className="create-news-page">
                <div className="create-news-form-box">
                    <p className="create-news-form-title" align="center">Create news</p>
                    <form className="create-news-form" method="POST">
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
                            placeholder="Content"
                            onChange={this.handleContentChange}
                        />
                        <div className="upload-btn-wrapper">
                            <button className="btn">{this.state.fileName}</button>
                            <input type="file" name="myfile" onChange={this.handleFileChange} />
                        </div>
                        {this.state.loading && <Loader />}
                        <div className="rubric-tag-block">
                            <RubricForm addRubric={this.addRubric} removeRubric={this.removeRubric} />
                            <TagForm addTag={this.addTag} removeTag={this.removeTag} />
                        </div>
                        <button
                            className="create-news-submit"
                            onClick={this.handleSubmit}
                        >
                            Create news
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateNewsPage;