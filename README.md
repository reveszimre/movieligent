# Movieligent

## Requirements

Following environment variables required: REACT_APP_MOVIE_API_URL, REACT_APP_API_KEY

## Development

```
npm i
npm start
```

## Operation

This app uses debounce on input field, not every keyPress indicates data fetching to improve performance

## Production

```
npm run build
```

## Note for improvements with more time

```
src\type-guards\movie\is-search-movie.ts
```

Implement this type guard to check data is SearchMovie type
