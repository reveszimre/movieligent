import React, { createContext, PropsWithChildren, useContext } from 'react';
import { EnvironmentVariables } from 'domains';
import { IContext } from './types';

const Context = createContext<IContext | undefined>(undefined);

export const EnvironmentVariablesContext = React.memo(
  ({ children, environmentVariables }: PropsWithChildren<{ environmentVariables: EnvironmentVariables }>) => {
    return <Context.Provider value={environmentVariables}>{children}</Context.Provider>;
  },
);

export const useEnvironmentVariablesContext = (): IContext => {
  const context = useContext(Context);
  if (context === undefined) {
    throw Error('useEnvironmentVariablesContext must be inside EnvironmentVariablesContext');
  }
  return context;
};
