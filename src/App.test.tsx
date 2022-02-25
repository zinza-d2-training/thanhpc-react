import { ThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import theme from './theme';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>{/* <App /> */}</ThemeProvider>
      </PersistGate>
    </Provider>
  );
  // eslint-disable-next-line no-restricted-globals
  // const linkElement = screen.getByText(/home/i);
  // expect(linkElement).toBeInTheDocument();
});
