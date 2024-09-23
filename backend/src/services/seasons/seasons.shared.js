export const seasonsPath = 'seasons'

export const seasonsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const seasonsClient = (client) => {
  const connection = client.get('connection')

  client.use(seasonsPath, connection.service(seasonsPath), {
    methods: seasonsMethods
  })
}
