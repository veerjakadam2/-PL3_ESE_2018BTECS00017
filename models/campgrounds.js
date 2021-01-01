var mongoose = require("mongoose");
const Comment = require('./comment');

//schema setup
var campgroundSchema = new mongoose.Schema({
	name: String, 
	price: String,
	image: String, 
	imageId: String,
	description: String,
   createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
	    }
	],
	
	likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
	
	reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    rating: {
        type: Number,
        default: 0
    }
});

campgroundSchema.pre('remove', async function() {
	await Comment.remove({
		_id: {
			$in: this.comments
		}
	});
});

//compiling schema into model and exporting
module.exports = mongoose.model("Campground", campgroundSchema);