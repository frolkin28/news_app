import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

import './styles.css';


class NewsPage extends React.Component {
    state = {
        news: null,
    }

    componentDidMount() {
        const { uuid } = this.props.match.params;
        const token = Cookies.get('csrftoken');
        const newsRequest = new Request(
            `/api/news/${uuid}`,
            {
                method: 'GET',
                headers: {
                    'X-CSRFToken': token,
                    'Content-Type': 'application/json',
                },
            }
        );
        fetch(newsRequest)
            .then(res => res.json())
            .then(data => {
                this.setState({ news: data });
            });
    }

    render() {
        if (!this.state.news) {
            return (
                <div />
            )
        }

        return (
            <div className="news-page">
                <div className="news-page-title">
                    <h1>{this.state.news.title}</h1>
                </div>
                <div className="news-rubrics-block">
                    <h3>Rubrics:</h3>
                    <ul className="link-list">
                        {
                            this.state.news.rubrics.map(
                                rubric => (
                                    <li key={rubric.uuid}>
                                        <NavLink to={`/rubric/${rubric.uuid}`}>
                                            {rubric.title}
                                        </NavLink>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
                <div className="news-page-image-block">
                    <img src={this.state.news.photo.url} className="news-page-image" alt="News" />
                </div>
                <div className="news-tags-block">
                    <ul className="link-list">
                        {
                            this.state.news.tags.map(
                                tag => (
                                    <li key={tag.uuid}>
                                        <span className="label info">{tag.title}</span>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
                <div className="news-page-author-block">
                    <h4>
                        Author: {`${this.state.news.author.first_name} ${this.state.news.author.last_name}`}
                    </h4>
                </div>
                <div className="news-page-content-block">
                    <p>{this.state.news.content}</p>
                </div>
            </div>
        )
    }
}

export default NewsPage;