import React, { KeyboardEvent, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDebounceHook } from 'hooks';
import { FormElements } from './styles';
import { useHomePageContext } from 'contexts';

export const Form = React.memo(() => {
  const [value, setValue] = useState('');
  const [isValueChanged, setIsValueChanged] = useState(false);

  const { getData } = useHomePageContext();

  const { debounce, cancelDebounce, isDebouncing } = useDebounceHook();

  const fetchData = useCallback(
    (val: string) => {
      getData({ query: val });
      setIsValueChanged(false);
    },
    [getData],
  );

  const onButtonClick = useCallback(() => {
    if (value.length >= 1 && !isDebouncing) {
      fetchData(value);
    }
  }, [fetchData, isDebouncing, value]);

  const onHandleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (isDebouncing) {
        cancelDebounce();
      }
      if (e.key === 'Enter' && value.length >= 1 && isValueChanged) {
        fetchData(value);
      }
    },
    [cancelDebounce, fetchData, isDebouncing, isValueChanged, value],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const val = e.target.value;
      if (val.length >= 3) {
        debounce(() => {
          fetchData(val);
        });
      } else {
        cancelDebounce();
      }
      setValue(val);
      setIsValueChanged(true);
    },
    [cancelDebounce, debounce, fetchData],
  );

  return (
    <FormElements>
      <TextField
        inputProps={{
          'data-testid': 'input-field',
        }}
        onChange={onChange}
        onKeyDown={onHandleKeyDown}
        value={value}
        variant="outlined"
      />
      <Button disabled={!isValueChanged} onClick={onButtonClick} variant="contained">
        Search
      </Button>
    </FormElements>
  );
});
