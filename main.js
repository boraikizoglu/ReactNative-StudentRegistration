import React, { Component } from 'react';
import { Text, View, AppRegistry } from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import reducers from './src/reducers'

import Login from './src/pages/login';

export default class App extends Component {

    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyAhjgdw5fsG1uewpfwh-iAOgzZ1CKqO4To",
            authDomain: "bolumsec.firebaseapp.com",
            databaseURL: "https://bolumsec.firebaseio.com",
            projectId: "bolumsec",
            storageBucket: "bolumsec.appspot.com",
            messagingSenderId: "129624109602"
        }
        );
    }
    
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)); 
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <Login />
                </View>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('main', () => App)