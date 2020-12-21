const router = require('express').Router();

let Answer = require('../models/answer.model');

// POST request to give an answer
router.route('/').post((req, res) => {
    const questionId = req.body.questionId;
    const answer = req.body.answer;

    const newAnswer = new Answer({
        questionId,
        answer,
    });

    newAnswer.save()
        .then(() => res.json('Answer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET request to get all the answers of a question
router.route('/question/:questionId').get((req, res) => {
    const questionId = req.params.questionId;
    Answer.find({questionId: questionId})
        .then(answer => res.json(answer))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET request to get a specific answer, will only be used to edit this answer
router.route('/:id').get((req, res) => {
    Answer.findById(req.params.id)
        .then(answer => res.json(answer))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Answer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Answer deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST request to update an answer
router.route('/update/:id').post((req, res) => {
    Answer.findById(req.params.id)
        .then(answer => {
            answer.answer = req.body.answer;

            answer.save()
                .then(() => res.json('Answer updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
