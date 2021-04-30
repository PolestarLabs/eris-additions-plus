module.exports = Eris => {
  Eris.Message.prototype.reply = function(content, file) {
    if(typeof content === 'string'){
      return this.channel.createMessage({content,messageReferenceID:this.id},file);
    }else if (typeof content === 'object'){
      content.messageReferenceID = this.id;
      return this.channel.createMessage(content ,file);
    }
  }
}
