const getNameByJob = (crew, job) => {
    const member = crew.find(member => member.job === job);
    return member ? member.name : 'Not Available';
};

export const getTmdbMovie = async (context) => {
    try {
      const { movie_id, item_status } = context.data;
      const { type } = context.params.query;
      context.params.item_status = item_status;
  
      delete context.data.movie_id;
      delete context.data.item_status;
    //   delete context.params.query;
  
      if (!movie_id) {
        // Not a tmdb movie, just a manual entry;
        return context;
      }
  
      // Make an internal request to the get method of the tmdb service
      const movie = await context.app.service('tmdb').get(movie_id, context.params);
     
      if (movie) {
        const {
            id,
            title,
            tagline,
            release_date,
            overview,
            runtime,
            poster_path,
        } = movie;

        let { credits, genres, production_companies } = movie; 
        
        const directorName = getNameByJob(credits.crew, 'Director');
        const producerName = getNameByJob(credits.crew, 'Producer');
        const composerName = getNameByJob(credits.crew, 'Original Music Composer');
        
        credits = JSON.stringify({
          'Director': directorName,
          'Producer': producerName,
          'Original Music Composer': composerName
        });

        const genreNames = genres.map(genre => genre.name);
        genres = JSON.stringify(genreNames);

        const productionCompaniesNames = production_companies.map(production_company => production_company.name);
        production_companies = JSON.stringify(productionCompaniesNames);
        
        context.data = {
          ...context.data,
          tmdb_id: id,
          title,
          tagline,
          credits,
          production_companies,
          release_date,
          overview: overview ? overview.replace(/'/g, "''") : '', // Escape single quotes in description
          runtime,
          genres,
          poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`,
          tmdb_link: `https://www.themoviedb.org/movie/${id}`
        };
      }
  
      return context;
    } catch (error) {
      throw new Error(`Failed to fetch TMDB Movie details: ${error.message}`);
    }
  }
  
  export const setUserItem = async (context) => {
  
    const data = {
      user_id: context.params.user.id,
      item_id: context.result.id,
      item_type_id: 2, // item_type: movies
      status_id: context.params.item_status || 5,
    }
  
    await context.app.service('user_item').create(data);
  }