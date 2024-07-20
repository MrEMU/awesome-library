import TcpSocket from 'react-native-tcp-socket';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export function connect(host: string, port: number) {
  const networkConnection = TcpSocket.createConnection({ host, port }, () => {
    console.log('Connected!');
    networkConnection?.destroy();
  });
  networkConnection.setTimeout(3000);

  networkConnection.on('error', (error: any) => {
    console.error('Printer network connection error:', error);
    if (networkConnection) networkConnection.destroy();
  });

  networkConnection.on('timeout', () => {
    console.error('Printer network connection timeout.');
    if (networkConnection) networkConnection.destroy();
  });
}
