export const moviesPath = 'movies'

export const moviesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const moviesClient = (client) => {
  const connection = client.get('connection')

  client.use(moviesPath, connection.service(moviesPath), {
    methods: moviesMethods
  })
}
