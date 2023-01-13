const RPC = require('discord-rpc')

export function discordActivity () {
  let client
  let closed = false

  const assembleClient = (timeout = 5000, old = true) => {
    if (old && client !== null && client.transport.socket !== null) client.destroy()
    client = new RPC.Client({ transport: 'ipc' })
    client.on('error', (err) => console.log(err))
    client.on('ready', () => {
      console.log('Discord rich presence ready')

      client.transport.socket.on('close', () => {
        if (closed) return
        console.log('Discord rich presence reconnect')
        assembleClient()
      })
    })

    setTimeout(async () => {
      try {
        await client.login({ clientId: process.env.DISCORD_CLIENT_ID })
      } catch (e) {
        console.log(e)
        setTimeout(() => {
          console.log('Discord rich presence reconnect')
          assembleClient()
        }, 5000)
      }
    }, timeout)
  }

  assembleClient(1000, false)

  process.on('unhandledRejection', (e) => {
    if (e.message === 'Could not connect') {
      console.log('Discord rich presence: Could not connect ! Retrying...')
      assembleClient()
    } else {
      throw e
    }
  })

  let activity = {}

  const interval = setInterval(() => {
    if (client && client.transport.socket) {
      client.setActivity(activity)
        .then(() => console.log('Discord set activity', activity))
        .catch(err => console.log('Discord set activity error', err))
    }
  }, 2000)

  return {
    setActivity: function (discordPresence) {
      activity = discordPresence
    },
    destroy: () => {
      closed = true
      clearInterval(interval)
      if (client && client.transport.socket) client.destroy()
    }
  }
}
