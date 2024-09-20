export const getTmdbSeries = async (context) => {
    try {
      const { series_id, item_status } = context.data;
      const { type } = context.params.query;
      context.params.item_status = item_status;
  
      delete context.data.series_id;
      delete context.data.item_status;
  
      if (!series_id) {
        // Not a tmdb series, just a manual entry;
        return context;
      }
  
      // Make an internal request to the get method of the tmdb service
      const series = await context.app.service('tmdb').get(series_id, context.params);

      if (series) {
        const {
            id,
            name,
            tagline,
            overview,
            first_air_date,
            last_air_date,
            next_episode_to_air,
            in_production,
            number_of_episodes,
            number_of_seasons,
            poster_path,
            status
        } = series;

        let { created_by, genres, production_companies } = series; 
        
        const genreNames = genres.map(genre => genre.name);
        genres = JSON.stringify(genreNames);

        const productionCompaniesNames = production_companies.map(production_company => production_company.name);
        production_companies = JSON.stringify(productionCompaniesNames);

        const createdByNames = created_by.map(by => by.name);
        created_by = JSON.stringify(createdByNames);
        
        context.data = {
          ...context.data,
          tmdb_id: id,
          name,
          tagline,
          overview: overview ? overview.replace(/'/g, "''") : '', // Escape single quotes in description
          first_air_date,
          last_air_date,
          next_episode_to_air,
          in_production,
          episodes: number_of_episodes,
          seasons: number_of_seasons,
          status,
          production_companies,
          created_by,
          genres,
          poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`,
          tmdb_link: `https://www.themoviedb.org/tv/${id}`
        };
      }
  
      return context;
    } catch (error) {
      throw new Error(`Failed to fetch TMDB Series details: ${error.message}`);
    }
  }
  
  export const setUserItem = async (context) => {
  
    const data = {
      user_id: context.params.user.id,
      item_id: context.result.id,
      item_type_id: 3, // item_type: series
      status_id: context.params.item_status || 5,
    }
  
    await context.app.service('user_item').create(data);
  }