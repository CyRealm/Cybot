const Canvas = require("canvas");

const background = "https://imgur.com/a/Xr3yYZm";

const dim = {
	width: 2560,
	height: 1600,
	margin: 50
}

const av = {
	size: 256
}

const generateImage = async (member) => {
	let username = member.user.username;
	let discrim = member.user.discriminator;
	let avatarURL = member.user.displayAvatarURL({
		format: "png", 
		dynamic: false, 
		size: av.size
	});

	const canvas = Canvas.createCanvas(dim.width, dim.height);
	const ctx = canvas.getContext("2d");

	const backimg = await Canvas.loadImage(background);
	ctx.drawImage(backimg, 0, 0);

	ctx.fillStyle = "rgba(0,0,0,0.8)";
	ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin); // Black Tinted Box

	const avimg = await Canvas.loadImage(avatarURL);
	ctx.save();
}