export const getTmdbSeries = async (context) => {
    try {
        const { series_id, item_status } = context.data;
        context.params.query = {
            ...context.params.query,
            type: 'tv'
        };
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

export const getTmdbSeason = async (context) => {
    try {
        const { parent_id, series_id, season_number } = context.data;
        delete context.data.parent_id;
        delete context.data.series_id;
        delete context.data.season_number;

        if (!series_id) {
            // Not a tmdb series, just a manual entry;
            return context;
        }

        context.params.query = {
            ...context.params.query,
            type: 'tv',
            season: season_number
        };

        const season = await context.app.service('tmdb').get(series_id, context.params);

        if (season) {
            const {
                id,
                name,
                overview,
                air_date,
                season_number,
                poster_path,
                episodes
            } = season;

            // Store episodes in a namespaced custom property
            context.params._custom = { episodes };

            context.data = {
                ...context.data,
                series_id: parent_id,
                tmdb_id: id,
                tmdb_series_id: series_id,
                name,
                overview: overview ? overview.replace(/'/g, "''") : '', // Escape single quotes in description
                air_date,
                season_number,
                poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`
            };
        }

        return context;
    } catch (error) {
        throw new Error(`Failed to fetch TMDB Series details: ${error.message}`);
    }
};

export const createSeasons = async (context) => {
    const { id, tmdb_id, seasons } = context.result;

    for (let i = 1; i <= seasons; i++) {
        await context.app.service('seasons').create({ parent_id: id, series_id: tmdb_id, season_number: i }, context.params);
    }
}

export const createEpisodes = async (context) => {
    const episodes = context.params._custom?.episodes;
    delete context.params.query;
    
    if (episodes) {
        for (const episode of episodes) {
            await context.app.service('episodes').create({
                series_id: context.result.series_id,
                season_id: context.result.id,
                tmdb_id: episode.id,
                tmdb_series_id: context.result.tmdb_series_id,
                tmdb_season_id: context.result.tmdb_id,
                name: episode.name,
                overview: episode.overview,
                air_date: episode.air_date,
                runtime: episode.runtime,
                episode_number: episode.episode_number,
                season_number: episode.season_number,
                still_path: `https://image.tmdb.org/t/p/w500${episode.still_path}`
            }, context.params);
        }
    }
}

export const setUserItem = (itemTypeId) => {
    return async (context) => {
      const data = {
        user_id: context.params.user.id,
        item_id: context.result.id,
        item_type_id: itemTypeId,
        status_id: context.params.item_status || 5,
      };
  
      await context.app.service('user_item').create(data);
    };
  };