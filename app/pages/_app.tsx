import React from 'react';
import App from 'next/amp';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { ThemeProvider } from '@material-ui/core';
import { themeDark, themeLight } from 'lib/theme';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }, []);

  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
