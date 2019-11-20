import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import renderer, { ReactTestRenderer } from 'react-test-renderer';

import Main from '../Main';
import mockedFullStore from 'mocks/redux-stores/full-store';

describe('Test connected Main component', () => {
    let component: ReactTestRenderer;

    beforeEach(() => {
        component = renderer.create(
            <Provider store={mockedFullStore}>
                <Main />
            </Provider>
        );
    });

    it('should render with given state from Redux store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

    /*
    it('should dispatch an action on image click', () => {

    });*/
});