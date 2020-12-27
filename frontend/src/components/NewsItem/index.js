import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';


const CONTENT_LENGTH = 200;


class NewsItem extends React.Component {
    render() {
        const { news } = this.props;

        return (
            <NavLink to={`/news/${news.uuid}`} exact className="news-item-link" activeClassName="news-item-link">
                <div className="news-item">
                    <img src={news.photo.url} className="news-image" alt="News" />
                    <h1 className="news-title">{news.title}</h1>
                    <hr className="line"></hr>
                    <p className="news-content">{news.content.slice(0, CONTENT_LENGTH)}...</p>

                </div>
            </NavLink>
        )
    }
}

export default NewsItem;