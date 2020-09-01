import React from 'react';
import Search from '../components/Search/Search';
import { connect } from 'react-redux';

const SearchContainer = (props) => {
    return (
        <Search accessToken={props.accessToken} />
    );
};

const mapStateToProps = state => {
    return {
        accessToken: state.login
    }
}

export default connect(mapStateToProps, null)(SearchContainer);