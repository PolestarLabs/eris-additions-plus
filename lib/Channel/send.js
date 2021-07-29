module.exports = Eris => {
	Eris.TextChannel.prototype.send = Eris.TextChannel.prototype.createMessage;
	Eris.PrivateChannel.prototype.send = Eris.PrivateChannel.prototype.createMessage;
	Eris.ThreadChannel.prototype.send = Eris.TextChannel.prototype.createMessage;
	Eris.PrivateThreadChannel.prototype.send = Eris.TextChannel.prototype.createMessage;
};
