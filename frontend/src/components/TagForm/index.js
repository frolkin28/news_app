import React from 'react';
import Cookies from 'js-cookie';
import './styles.css';


export default class TagForm extends React.Component {
    state = {
        tags: []
    }

    componentDidMount() {
        this.fetchTag();
    }

    handleChange(event, item) {
        const isChecked = event.target.checked;
        if (isChecked) {
            this.props.addTag(item);
        }
        else {
            this.props.removeTag(item);
        }
    }

    fetchTag() {
        const token = Cookies.get('csrftoken');
        const tagRequest = new Request(
            '/api/tag/',
            {
                method: 'GET',
                headers: {
                    'X-CSRFToken': token,
                },
            }
        );
        fetch(tagRequest)
            .then(res => res.json())
            .then(data => {
                const tags = data;
                if (tags) {
                    this.setState({ tags });
                }
            });
    }

    render() {

        return (
            <div style={
                {
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                }
            }>
                <h3 className="tag-form-title" style={{margin: 'auto'}}>
                    Select tags
                </h3>
                <ul className="tag-list" style={{margin: 'auto'}}>
                    {
                        this.state.tags.map(t => {
                            return (
                                <li key={t.uuid} style={{ margin: '2px 0px' }} >
                                    <input
                                        type="checkbox"
                                        onChange={(e) => this.handleChange(e, t)}
                                    />
                                    <strong style={{ fontFamily: "'Ubuntu', sans-serif" }}>
                                        {t.title}
                                    </strong>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}