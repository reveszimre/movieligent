# Movieligent

## 1. Requirements

Following environment variables (`.env`) required: REACT_APP_API_KEY, REACT_APP_MOVIE_API_URL

## 2. Development

```
npm i
npm start
```

## 3. Operation

This app uses debounce on input field, not every keyPress indicates data fetching to improve performance

## 4. Production

```
npm run build
```

## 5. Notes

- In the form, the button and the ENTER don't make sense, because the search is automatically triggered by the key press

- finish the type guards under `src/type-guards/movie`
