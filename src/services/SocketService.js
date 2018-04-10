import io from 'socket.io-client';

export default class SocketService {
  constructor() {
    this.base = window.location.hostname === 'localhost' ?
      'http://localhost:3080' :
      'https://block-dev.herokuapp.com';

    this.socket = io.connect(this.base);

    this.bindings = [];

    let _this = this;
    this.socket.on('connect', function(data) {
      console.log('CONNECTED: ' + data);
      _this.socket.emit('join', 'Hello World from client');
    });

    this.socket.on('Message:AttemptDelivery', message => {
      this.fireBinding('Message:AttemptDelivery', message);
      this.socket.emit('Message:AttemptDeliverySuccessful', message);
    });
    this.socket.on('Message:AttemptDeliveryConfirmation', message => {
      console.log('DeliveryAttemptedConfirmation', message)
    });
  }

  addBinding(event, callback) {
    this.bindings.push({ event, callback });
  }

  fireBinding(event, data) {
    let binding = this.bindings.find( b => b.event === event);
    binding.callback(data);
  }

  sendMessage(message) {
    this.socket.emit('Message:Send', message);
  }

  attemptDelivery(message) {
    this.fireBinding('Message:AttemptDelivery', message);
    this.socket.emit('Message:AttemptDeliverySuccessful', message);
  }

  attemptDeliveryConfirmation(message) {
    console.log('DeliveryAttemptedConfirmation', message)
  }
}