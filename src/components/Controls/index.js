import React, { Component } from 'react';
import _ from 'lodash';

import ControlRow from './ControlRow';

class Controls extends Component {
    constructor() {
        super();
        this.state = {
            yearFilter: () => true,
            year: '*',
            USstateFilter: () => true,
            USstate: '*'
        };

        this.updateYearFilter = this.updateYearFilter.bind(this);
        this.updateUSStateFilter = this.updateUSStateFilter.bind(this);
    }

    componentDidUpdate() {
        this.props.updateDataFilter(
            ((filters) => {
                return (d) =>  filters.yearFilter(d) && filters.USstateFilter(d);
            })(this.state)
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state, nextState);
    }

    updateYearFilter(year, reset) {
        let filter = (d) => d.submit_date.getFullYear() == year;

        if (reset || !year) {
            filter = () => true;
            year = '*';
        }

        this.setState({yearFilter: filter, year: year});
    }

    updateUSStateFilter(USstate, reset) {
        var filter = (d) => d.state == USstate;

        if (reset || !USstate) {
            filter = () => true;
            USstate = '*';
        }
        this.setState({USstateFilter: filter, USstate: USstate});
    }

    render() {
        let getYears = (data) => {
            return _.keys(_.groupBy(data,
                (d) => d.submit_date.getFullYear()))
                .map(Number);
        }

        let getUSStates = (data) => _.sortBy(_.keys(_.groupBy(data, (d) => d.state)));

        return (
            <div>
                <ControlRow data={this.props.data}
                            getToggleNames={getYears}
                            updateDataFilter={this.updateYearFilter}/>
                <ControlRow data={this.props.data}
                            getToggleNames={getUSStates}
                            updateDataFilter={this.updateUSStateFilter}
                            capitalize="true" />
            </div> )
    }
}

export default Controls;
