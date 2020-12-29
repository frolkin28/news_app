import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';


export default class Dropdown extends React.Component {
    state = {
        rubrics: [],
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

    render() {
        return (
            <div className="dropdown">
                <button className="dropbtn">Rubrics</button>
                <div className="dropdown-content">
                    {
                        this.state.rubrics.map(
                            (rubric) => <NavLink key={rubric.uuid} to={`/rubric/${rubric.uuid}`}>{rubric.title}</NavLink>
                        )
                    }
                </div>
            </div >
        )
    }
}