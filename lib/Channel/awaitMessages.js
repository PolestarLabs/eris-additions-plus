const EventEmitter = require("events").EventEmitter;
const collectors = [];

class MessageCollector extends EventEmitter {
	constructor(channel, filter, options = {}) {
		super();
		this.filter = filter;
		this.channel = channel;
		this.options = options;
		this.ended = false;
		this.collected = [];

		collectors.push(this);
		if(options.time) setTimeout(() => this.stop("time"), options.time);
	}

	verify(message) {
		if(this.channel.id !== message.channel.id) return false;
		if(this.filter(message)) {
			this.collected.push(message);

			this.emit("message", message);
			if(this.collected.length >= this.options.maxMatches) this.stop("maxMatches");
			return true;
		}

		return false;
	}

	stop(reason) {
		if(this.ended) return;
		this.ended = true;

		collectors.splice(collectors.indexOf(this), 1);
		this.emit("end", this.collected, reason);
	}
}

let listening = false;
module.exports = Eris => {
	Eris.Channel.prototype.awaitMessages = function (filter, options) {		
		checkListener(this)
		const collector = new MessageCollector(this, filter, options);
		return new Promise(resolve => collector.on("end", resolve));
	};
	Eris.Channel.prototype.createMessageCollector = function(filter, options) {
		checkListener(this)
		return new MessageCollector(this, filter, options);
	}
};

function checkListener(CHANNEL){
	if(!listening) {
		CHANNEL.client.on("messageCreate", message => {
			for(const collector of collectors) collector.verify(message);
		});

		listening = true;
	}
}