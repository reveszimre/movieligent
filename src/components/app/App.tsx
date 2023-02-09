import React, { useMemo } from 'react';
import { validateEnvironmentVariables } from 'functions';
import { HomePageContext, EnvironmentVariablesContext } from 'contexts';
import Alert from '@mui/material/Alert';
import { Page } from './styles';
import { HomePage } from 'pages';

export const App = React.memo(() => {
  const data = useMemo(() => validateEnvironmentVariables(), []);

  return (
    <Page>
      {'environmentVariables' in data && (
        <EnvironmentVariablesContext environmentVariables={data.environmentVariables}>
          <HomePageContext>
            <HomePage />
          </HomePageContext>
        </EnvironmentVariablesContext>
      )}
      {'error' in data && (
        <Alert severity="error">
          {`Invalid environment variable(s): ${Object.keys(data.error)
            .map((it) => `${it}<${data.error[it]}>`)
            .join(', ')}`}
        </Alert>
      )}
    </Page>
  );
});

export default App;
