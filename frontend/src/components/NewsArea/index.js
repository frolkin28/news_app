import React from 'react';
import NewsItem from '../NewsItem';


class NewsArea extends React.Component {
    render() {
        return (
            <div className="news-area">
                <h1>News area</h1>
                <NewsItem />
                <NewsItem />
                <NewsItem />
            </div>
        )
    }
}

export default NewsArea;