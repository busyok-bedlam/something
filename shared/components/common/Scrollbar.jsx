import React, {Component} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

export default class Scrollbar extends Component {

    scrollToTop() {
        return this.refs.scrollbar.scrollToTop();
    }

    scrollToBottom() {
        return this.refs.scrollbar.scrollToBottom();
    }

    onScrollStop() {
        const data = this.refs.scrollbar.getValues();
        if (data.top === 1 && this.props.onScrollOnBottom) {
            this.props.onScrollOnBottom(data);
        }
    }

    hadlerScroll(e) {
        e.stopPropagation();
    }

    getValues(){
        return this.refs.scrollbar.getValues();
    }

    scrollTo(offset) {
        this.refs.scrollbar.scrollTop(offset);
    }

    render() {
        const verticalThumb = props => {
            return (
                <div
                    {...props}
                    style={{
                        width: '2px',
                        background: '#fff',
                    }}/>
            )
        };

        const verticalTrack = props => {
            return (
                <div
                    {...props}
                    style={{
                        position: 'absolute',
                        width: '2px',
                        right: '4px',
                        bottom: '2px',
                        top: '2px'
                    }}/>
            )

        };

        const view = props => {
            return (
                <div
                    {...props}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        overflowY: 'scroll',
                        paddingRight: '17px',
                        marginRight: '-17px'
                    }}/>
            );
        };

        const horizontalThumb = props => {
            return (
                <div
                    {...props}
                    style={{
                        display: 'none'
                    }}>
                </div>
            );
        };

        return (
            <Scrollbars
                universal
                {...this.props}
                onScroll={this.props.onScroll}
                hideTracksWhenNotNeeded={true}
                onScrollStop={this.onScrollStop.bind(this)}
                renderThumbVertical={verticalThumb}
                renderTrackVertical={verticalTrack}
                renderThumbHorizontal={horizontalThumb}
                renderView={view}
                ref="scrollbar"
            />
        );
    }
}

