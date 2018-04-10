var UserModel = require('./models/UserModel.js');

class SocketService {
  constructor(io) {
    this.io = io;
    this.processMessageSend = this.processMessageSend.bind(this);

    this.io.sockets.on('connection', socket => {
      socket.on('join', data => {
        console.log('CONNECTED: ' + data);
      });
  
      socket.on('Message:Send', this.processMessageSend)
      socket.on('Message:AttemptDeliverySuccessful', this.processMessageSend)
    });
  }

  processMessageSend(message) {
    message.ProcessedByServer = new Date();
    let fromId = message.From._id;
    let toId = message.To._id;

    UserModel.findOneAndUpdate({_id: toId}, {$push: {Messages: message}})
      .exec((err, User) => {
        if (err) { console.log(error) }
        // let lastMessage = User.Messages.sort((a,b) => new Date(a.ProcessedByServer) - new Date(b.ProcessedByServer)).pop();
        // message._id = lastMessage._id;
        // delete message.ConversationId;
        console.log('TO: ', message)
        if (message.To.SocketId) {
          this.io.to(message.To.SocketId).emit('Message:AttemptDelivery', message);
        }
      });
    UserModel.findOneAndUpdate({_id: fromId}, {$push: {Messages: message}})
      .exec((err, User) => {
        if (err) { console.log(error) }
        // let lastMessage = User.Messages.sort((a,b) => new Date(a.ProcessedByServer) - new Date(b.ProcessedByServer)).pop();
        // message._id = lastMessage._id;
        // delete message.ConversationId;
        console.log('FROM: ', message)
        if (message.From.SocketId) {
          this.io.to(message.From.SocketId).emit('Message:AttemptDeliveryConfirmation', message);
        }
      });
  }

  processAttemptDeliverySuccessful(message) {
    // message.Delivered = new Date();
    // let fromId = message.From._id;
    // let toId = message.To._id;

    // let _this = this;

    // UserModel.update({'Messages.$.From' }, {$push: {Messages: message}})
    //   .exec(function(err) {
    //     if (err) { console.log(error) }
    //     if (message.To.SocketId) {
    //       _this.io.to(message.To.SocketId).emit('Message:AttemptDelivery', message);
    //     }
    //   });
  }
}

module.exports = SocketService
