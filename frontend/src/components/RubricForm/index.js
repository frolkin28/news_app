import React from 'react';
import Cookies from 'js-cookie';
import './styles.css';


export default class RubricForm extends React.Component {
    state = {
        rubrics: []
    }

    componentDidMount() {
        this.fetchRubrics();
    }

    handleChange(event, item) {
        const isChecked = event.target.checked;
        if (isChecked) {
            this.props.addRubric(item);
        }
        else {
            this.props.removeRubric(item);
        }
    }

    fetchRubrics() {
        const token = Cookies.get('csrftoken');
        const rubricRequest = new Request(
            '/api/rubric/',
            {
                method: 'GET',
                headers: {
                    'X-CSRFToken': token,
                },
            }
        );
        fetch(rubricRequest)
            .then(res => res.json())
            .then(data => {
                const rubrics = data;
                if (rubrics) {
                    this.setState({ rubrics });
                }
            });
    }

    render() {

        return (
            <div style={
                {
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }
            }>
                <h3 className="rubric-form-title" style={{margin: 'auto'}}>Select rubrics</h3>
                <ul className="rubric-list" style={{margin: 'auto'}}>
                    {
                        this.state.rubrics.map(r => {
                            return (
                                <li key={r.uuid} style={{margin: '2px 0px'}} >
                                    <input
                                        type="checkbox"
                                        onChange={(e) => this.handleChange(e, r)}
                                    />
                                    <strong style={{ fontFamily: "'Ubuntu', sans-serif" }}>
                                        {r.title}
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