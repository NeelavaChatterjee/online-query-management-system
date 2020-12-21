const router = require('express').Router();
let Query = require('../models/query.model');

// GET request to receive the list of all questions
router.route('/').get((req, res) => {
    Query.find()
        .then(queries => res.json(queries))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST request to add or ask a new question
router.route('/add').post((req, res) => {
    const query = req.body.query;

    const newQuery = new Query({
        query,
    });

    newQuery.save()
        .then(() => res.json('New Question added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET request to get a specific question
router.route('/:id').get((req, res) => {
    Query.findById(req.params.id)
        .then(query => res.json(query))
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE request to delete a question
router.route('/:id').delete((req, res) => {
    Query.findByIdAndDelete(req.params.id)
        .then(() => res.json('Question deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST request to update a question
router.route('/update/:id').post((req, res) => {
    Query.findById(req.params.id)
        .then(query => {
            query.query = req.body.query;

            query.save()
                .then(() => res.json('Question updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
