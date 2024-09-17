// src/hooks/search.hooks.js
export const searchHook = async (context) => {
  const { query } = context.params;

  if (context.id === 'search') {
    if (query && query.title) {
      // Handle the search query
      const searchResult = `Search result for: ${query.title}`;
      context.result = { result: searchResult };
    } else {
      context.result = { result: 'This is a custom string' };
    }
  }
  return context;
};