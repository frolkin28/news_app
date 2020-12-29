import React from 'react';
import NewsItem from '../../components/NewsItem';
import './styles.css';


export default class RubricPage extends React.Component {
    state = {
        rubric: null,
        news: [],
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.uuid !== prevProps.match.params.uuid) {
            this.fetchRubric();
            this.fetchNews();
        }
    }

    componentDidMount() {
        this.fetchRubric();
        this.fetchNews();
    }

    fetchRubric() {
        const { uuid } = this.props.match.params;
        const rubricRequest = new Request(
            `/api/rubric/${uuid}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        fetch(rubricRequest)
            .then(res => res.json())
            .then(data => {
                this.setState({ rubric: data });
            });
    }

    fetchNews() {
        const { uuid } = this.props.match.params;
        const newsRequest = new Request(
            `/api/news?rubric_id=${uuid}`,
            {
                method: 'GET',
                headers: {
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
        let rubricBlock, newsBlock;

        if (this.state.rubric) {
            rubricBlock = (
                <div className="rubric-block">
                    <div className="rubric-title">
                        <h1>Rubric: {this.state.rubric.title}</h1>
                    </div>
                    <div className="rubric-content">
                        <h3>{this.state.rubric.description}</h3>
                    </div>
                </div>
            )
        }

        if (this.state.news) {
            newsBlock = (
                <div className="news-block">
                    {this.state.news.map(
                        (news) => (
                            <NewsItem key={news.uuid} news={news} />
                        )
                    )}
                </div>
            )
        }

        return (
            <div className="rubric-page">
                {rubricBlock}
                {newsBlock}
            </div>
        )
    }
}