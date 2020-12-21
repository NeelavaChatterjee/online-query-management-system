const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    questionId: { type: Schema.Types.ObjectId, ref: 'Query', required: true},
    answer: { type: String, required: true},
}, {
    timestamps: true,
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;