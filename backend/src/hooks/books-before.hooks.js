export const getGoogleBook = async (context) => {
  try {
    const { volumeId } = context.data;
    delete context.data.volumeId;

    if (!volumeId) {
      throw new Error('Volume ID is required');
    }

    // Make an internal request to the get method of the google-books service
    const book = await context.app.service('google-books').get(volumeId);

    if (book) {
      const { id, volumeInfo } = book;
      const {
        title,
        subtitle,
        // authors,
        publisher,
        publishedDate,
        description,
        printedPageCount,
        // categories,
        imageLinks
      } = volumeInfo || {};

      context.data = {
        ...context.data,
        googleVolumeId: id,
        title,
        subtitle,
        // authors: Array.isArray(authors) ? authors : [], // Ensure authors is an array
        authors:'',
        publisher,
        publishedDate,
        description: description ? description.replace(/'/g, "''") : '', // Escape single quotes in description
        printedPageCount,
        categories:'',
        // categories: Array.isArray(categories) ? categories : [], // Ensure categories is an array
        thumbnail: imageLinks?.thumbnail,
        previewLink: `https://www.google.co.uk/books/edition/_/${id}`
      };
    }

    return context;
  } catch (error) {
    console.error('Error fetching book:', error.message);
    throw new Error(`Failed to fetch book with volume ID ${context.data.volumeId}: ${error.message}`);
  }
}