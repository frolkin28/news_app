import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import './styles.css';


export default class Dropdown extends React.Component {
    state = {
        rubrics: [],
        isRedirect: false,
        redirectTo: null,
    }

    componentDidMount() {
        this.fetchRubrics();
    }

    fetchRubrics() {
        const rubricRequest = new Request(
            '/api/rubric/',
            {
                method: 'GET',
            }
        );
        fetch(rubricRequest)
            .then(res => {
                if (res.status < 299) {
                    return res.json()
                }
                else {
                    return []
                }
            })
            .then(data => {
                if (data) {
                    this.setState({ rubrics: data })
                }
            });
    }

    handleChange(r) {
        this.setState({
            isRedirect: true,
            redirectTo: `/rubric/${r.uuid}`
        })
    }

    render() {
        if (this.state.isRedirect) {
            const url = this.state.redirectTo;
            this.setState({
                isRedirect: false,
                redirectTo: null,
            })
            return <Redirect to={url} />
        }

        return (
            <div className="container">
                <div className="dropdown">
                    <select name="one" className="dropdown-select">
                        <option>Rubrics</option>
                        {
                            this.state.rubrics.map(
                                (rubric) => {
                                    return (
                                        <option key={rubric.uuid} onClick={ () => this.handleChange(rubric)}>
                                            {rubric.title}
                                        </option>
                                    )
                                })
                        }
                    </select>
                </div>
            </div>
        )
    }
}