import { EnvironmentVariables } from 'domains';
import { isString } from 'type-guards';

export const validateEnvironmentVariables = ():
  | {
      environmentVariables: EnvironmentVariables;
    }
  | { error: Record<string, unknown> } => {
  if (!isString(process.env.REACT_APP_MOVIE_API_URL) || !isString(process.env.REACT_APP_API_KEY)) {
    const error: Record<string, unknown> = {};
    ['REACT_APP_API_KEY', 'REACT_APP_MOVIE_API_URL'].forEach((it) => {
      if (!isString(process.env[it])) {
        error[it] = process.env[it];
      }
    });

    return { error };
  }

  return {
    environmentVariables: { API_KEY: process.env.REACT_APP_API_KEY, MOVIE_API_URL: process.env.REACT_APP_MOVIE_API_URL },
  };
};
