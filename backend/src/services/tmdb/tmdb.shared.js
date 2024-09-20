export const tmdbPath = 'tmdb'

export const tmdbMethods = ['find', 'get']

export const tmdbClient = (client) => {
  const connection = client.get('connection')

  client.use(tmdbPath, connection.service(tmdbPath), {
    methods: tmdbMethods
  })
}
