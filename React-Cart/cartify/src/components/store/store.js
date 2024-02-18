// store.js

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.log('Error loading state from localStorage:', error);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (error) {
        console.log('Error saving state to localStorage:', error);
    }
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
    // Add middleware, enhancers, or other configurations here if needed
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
