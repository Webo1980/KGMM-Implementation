import React, { Component } from 'react';
import { Container } from 'reactstrap';
import marked from 'marked';

class Changelog extends Component {
    state = {
        changelogText: null
    };
    componentDidMount = () => {
        document.title = 'Changelog - ORKG';

        const path = require('./CHANGELOG.md');

        fetch(path)
            .then(response => {
                return response.text();
            })
            .then(text => {
                this.setState({
                    changelogText: marked(text)
                });
            });
    };

    render() {
        return (
            <div>
                <Container className="box pt-4 pb-4 pl-5 pr-5 mt-5">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: this.state.changelogText
                        }}
                    />
                </Container>
            </div>
        );
    }
}

export default Changelog;
