module.exports = Eris => {
  Eris.Message.prototype.reply = function(content, file, ping=false) {
    if(typeof content === 'string'){
      return this.channel.createMessage({content,messageReferenceID:this.id},file);
    }else if (typeof content === 'object'){
      if (typeof file === 'boolean') ping = file;
      content.messageReference ??= { id: this.id };
      content.allowedMentions ??= { repliedUser: ping || false };
      return this.channel.createMessage(content ,file: typeof file === 'object' ? file : null );
    }
  }
}
