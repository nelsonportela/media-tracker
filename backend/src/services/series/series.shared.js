export const seriesPath = 'series'

export const seriesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const seriesClient = (client) => {
  const connection = client.get('connection')

  client.use(seriesPath, connection.service(seriesPath), {
    methods: seriesMethods
  })
}
