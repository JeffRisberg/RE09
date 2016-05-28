import React, { Component } from 'react';
import _ from 'lodash';

import ControlRow from './ControlRow';

class Controls extends Component {
    render() {
        let getYears = (data) => {
            return _.keys(_.groupBy(data,
                (d) => d.submit_date.getFullYear()))
                .map(Number);
        }

        return (
            <div>
                <ControlRow data={this.props.data}
                            getToggleNames={getYears}
                            updateDataFilter={() => true}/>
            </div> )
    }
}

export default Controls;
