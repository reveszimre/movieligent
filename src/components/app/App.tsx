import React, { useMemo } from 'react';
import { validateEnvironmentVariables } from 'functions';
import { HomePageContext, EnvironmentVariablesContext } from 'contexts';
import Alert from '@mui/material/Alert';
import { Page } from './styles';
import { HomePage } from 'pages';

export const App = React.memo(() => {
  const envs = useMemo(() => validateEnvironmentVariables(), []);

  return (
    <Page>
      {'data' in envs && (
        <EnvironmentVariablesContext environmentVariables={envs.data}>
          <HomePageContext>
            <HomePage />
          </HomePageContext>
        </EnvironmentVariablesContext>
      )}
      {'error' in envs && (
        <Alert severity="error">
          {`Invalid environment variable(s): ${Object.keys(envs.error)
            .map((it) => `${it}<${envs.error[it]}>`)
            .join(', ')}`}
        </Alert>
      )}
    </Page>
  );
});

export default App;
