export const episodesPath = 'episodes'

export const episodesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const episodesClient = (client) => {
  const connection = client.get('connection')

  client.use(episodesPath, connection.service(episodesPath), {
    methods: episodesMethods
  })
}
