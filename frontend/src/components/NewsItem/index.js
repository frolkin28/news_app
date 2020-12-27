import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';


class NewsItem extends React.Component {
    render() {
        return (
            <NavLink to="/news" exact className="news-item-link" activeClassName="news-item-link">
                <div className="news-item">
                    <div className="news-image">
                        <img src="/django-static/img/tree.jpg" alt="альтернативный текст"></img>
                    </div>
                    <h1 className="news-title">Title</h1>
                    <hr className="line"></hr>
                    <p className="news-content">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesettin.
                    </p>

                </div>
            </NavLink>
        )
    }
}

export default NewsItem;