module.exports = Eris => {
	Eris.TextChannel.prototype.send = Eris.TextChannel.prototype.createMessage;
	Eris.PrivateChannel.prototype.send = Eris.PrivateChannel.prototype.createMessage;
};
