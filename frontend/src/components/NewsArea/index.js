import React from 'react';
import NewsItem from '../NewsItem';
import Cookies from 'js-cookie';


class NewsArea extends React.Component {
    state = {
        news: []
    }

    componentDidMount() {
        const token = Cookies.get('csrftoken');
        const newsRequest = new Request(
            '/api/news/',
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
        return (
            <div className="news-area">
                {this.state.news.map(
                    (news) => (
                        <NewsItem key={news.uuid} news={news} />
                    )
                )}
            </div>
        );
    }
}

export default NewsArea;