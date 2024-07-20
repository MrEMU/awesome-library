import { StyleSheet, View, Button } from 'react-native';
import { connect } from 'react-native-awesome-library';
import TcpSocket from 'react-native-tcp-socket';

export default function App() {
  const library = async () => {
    console.log('Connecting...');
    connect('192.168.0.102', 9100);
  };

  const direct = () => {
    console.log('Connecting...');
    let host = '192.168.0.102';
    let port = 9100;
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
  };

  return (
    <View style={styles.container}>
      <Button
        title={'Library'}
        onPress={() => {
          library();
        }}
      />
      <Button
        title={'Direct'}
        onPress={() => {
          direct();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
