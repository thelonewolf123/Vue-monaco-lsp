const rpc = require('vscode-ws-jsonrpc')
const server = require('vscode-ws-jsonrpc/lib/server')
const lsp = require('vscode-languageserver')

const WebSocket = require('ws');

function createLanguageServer(port) {
  const wss = new WebSocket.Server({
    port: port
  });

  function launch(socket) {
    const reader = new rpc.WebSocketMessageReader(socket)
    const writer = new rpc.WebSocketMessageWriter(socket)
    const socketConnection = server.createConnection(reader, writer, () => socket.dispose())

    console.log("inside launch function")

    const path = '/Users/harish/Projects/Vue-monaco-demo/lang-server/java-lsp/launch_jdt.sh'
    // const path = '/opt/code/java-lsp/launch_jdt.sh'

    const serverConnection = server.createServerProcess('JSON', path, [])
    server.forward(socketConnection, serverConnection, message => {
      console.log(message)
      if (rpc.isRequestMessage(message)) {
        if (message.method === lsp.InitializeRequest.type.method) {
          const initializeParams = message.params
          initializeParams.processId = process.pid
        }
      }
      return message
    })
  }

  wss.on('connection', function connection(ws) {
    const socket = {
      send: (content) => ws.send(content, (error) => {
        if (error) {
          console.log(error)
        }
      }),
      onMessage: (cb) => ws.on('message', cb),
      onError: (cb) => ws.on('error', cb),
      onClose: (cb) => ws.on('close', cb),
      dispose: (cb) => ws.close()
    }
    launch(socket)
  })
}

[9001, 9002, 9003, 9004, 9005, 9006].map(p => createLanguageServer(p))