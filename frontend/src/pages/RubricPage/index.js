import React from 'react';


export default class RubricPage extends React.Component {
    render() {
        const { uuid } = this.props.match.params;
        return (
            <div>
                Rubric Page {uuid}
            </div>
        )
    }
}