import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Breadcrumb, BreadcrumbItem, Button} from 'reactstrap';
import {changeTimeline} from "../actions";

class Breadcrumbs extends Component {
    render() {
        const {timeScale, timeKey, superTimeKey, periods, events, changeTimeline} = this.props;
        return (
            <Breadcrumb className='py-0 bg-white my-0'>
                {timeScale === 'Period' &&
                <BreadcrumbItem className='py-0 px-0' active>
                    <Button className='py-0 px-0' color='link' disabled>
                        Overview
                    </Button>
                </BreadcrumbItem>
                }
                {(timeScale === 'Event' || timeScale === 'Scene') &&
                <BreadcrumbItem className='py-0 px-0'>
                    <Button className='py-0 px-0' color='link' onClick={() => {
                        changeTimeline('Period', null, null);

                    }}>
                        Overview
                    </Button>
                </BreadcrumbItem>
                }
                {timeScale === 'Event' &&
                <BreadcrumbItem className='py-0 px-0'>
                    <Button className='py-0 px-0' color='link'
                            disabled>
                        Period: {periods[timeKey].title}
                    </Button>
                </BreadcrumbItem>
                }
                {timeScale === 'Scene' &&
                <BreadcrumbItem className='py-0 px-0'>
                    <Button className='py-0 px-0' color='link' onClick={() => {
                        changeTimeline('Event', superTimeKey, superTimeKey);
                    }}>
                        Period: {periods[superTimeKey].title}
                    </Button>
                </BreadcrumbItem>
                }
                {timeScale === 'Scene' &&
                <BreadcrumbItem className='py-0 px-0'>
                    <Button className='py-0 px-0' color='link' disabled>
                        Event: {events[superTimeKey][timeKey].title}
                    </Button>
                </BreadcrumbItem>
                }
            </Breadcrumb>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        periods: state.periods,
        events: state.events,
        timeScale: state.timeScale,
        timeKey: state.timeKey,
        superTimeKey: state.superTimeKey,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeTimeline}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Breadcrumbs);
