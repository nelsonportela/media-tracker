export const getGoogleBook = async (context) => {
  try {
    const { volume_id, item_status } = context.data;
    context.params.item_status = item_status;

    delete context.data.volume_id;
    delete context.data.item_status;

    if (!volume_id) {
      // Not a google book, just a manual entry;
      return context;
    }

    // Make an internal request to the get method of the google_books service
    const book = await context.app.service('google_books').get(volume_id);
   
    if (book) {
      const { id, volumeInfo } = book;
      const {
        title,
        subtitle,
        authors,
        publisher,
        publishedDate,
        description,
        printedPageCount,
        categories,
        imageLinks
      } = volumeInfo || {};

      context.data = {
        ...context.data,
        google_volume_id: id,
        title,
        subtitle,
        authors: JSON.stringify(authors), // Convert authors array to JSON string
        publisher,
        published_date: publishedDate,
        description: description ? description.replace(/'/g, "''") : '', // Escape single quotes in description
        printed_page_count: printedPageCount,
        categories: JSON.stringify(categories), // Convert categories array to JSON string
        thumbnail: imageLinks?.thumbnail,
        preview_link: `https://www.google.co.uk/books/edition/_/${id}`
      };
    }

    return context;
  } catch (error) {
    throw new Error(`Failed to fetch Google Book details: ${error.message}`);
  }
}

export const setUserItem = async (context) => {

  const data = {
    user_id: context.params.user.id,
    item_id: context.result.id,
    item_type_id: 1, // item_type: books
    status_id: context.params.item_status || 5 
  }

  await context.app.service('user_item').create(data);
}