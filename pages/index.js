import React from 'react';
import { connect } from 'react-redux';
import HomePage from 'pages/Home';

const Home = (props) => <HomePage {...props} />
export default connect()(Home);
