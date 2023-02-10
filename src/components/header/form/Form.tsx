import React, { KeyboardEvent, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDebounceHook } from 'hooks';
import { FormElements } from './styles';
import { useHomePageContext } from 'contexts';

export const Form = React.memo(() => {
  const [value, setValue] = useState('');

  const { getData } = useHomePageContext();

  const { debounce, cancelDebounce, isDebouncing } = useDebounceHook();

  const onButtonClick = useCallback(() => {
    if (value.length >= 1 && !isDebouncing) {
      getData({ query: value });
    }
  }, [getData, isDebouncing, value]);

  const onHandleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && value.length >= 1 && !isDebouncing) {
        getData({ query: value });
      }
    },
    [getData, isDebouncing, value],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      if (val.length >= 3) {
        debounce(() => getData({ query: val }));
      } else {
        cancelDebounce();
      }
    },
    [cancelDebounce, debounce, getData],
  );

  return (
    <FormElements>
      <TextField onChange={onChange} onKeyDown={onHandleKeyDown} value={value} variant="outlined" />
      <Button onClick={onButtonClick} variant="contained">
        Search
      </Button>
    </FormElements>
  );
});
