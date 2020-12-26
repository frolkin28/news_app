import React from 'react';
import NewsItem from '../NewsItem';


class NewsArea extends React.Component {
    render() {
        return (
            <div className="news-area">
                <NewsItem />
                <NewsItem />
                <NewsItem />
            </div>
        )
    }
}

export default NewsArea;