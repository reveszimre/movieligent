import React, { useMemo } from 'react';
import { validateEnvironmentVariables } from 'functions';
import { HomePageContext, EnvironmentVariablesContext } from 'contexts';
import Alert from '@mui/material/Alert';
import { Page } from './styles';
import { HomePage } from 'pages';
import { useCallback } from 'react';

export const App = React.memo(() => {
  const envs = useMemo(() => validateEnvironmentVariables(), []);

  const composeErrorMessage = useCallback(
    (error: Record<string, unknown>) =>
      `Invalid environment variable(s): ${Object.keys(error)
        .map((it) => `${it}<${error[it]}>`)
        .join(', ')}`,
    [],
  );

  return (
    <Page>
      {'data' in envs && (
        <EnvironmentVariablesContext environmentVariables={envs.data}>
          <HomePageContext>
            <HomePage />
          </HomePageContext>
        </EnvironmentVariablesContext>
      )}
      {'error' in envs && <Alert severity="error">{composeErrorMessage(envs.error)}</Alert>}
    </Page>
  );
});

export default App;
