const mongoose = require('mongoose')
// const schema = mongoose.Schema;

const QuestionSchema = new mongoose.Schema({
    question_text : {
        type: String,
        required: true
    },

    option_a : {
        type: String,
        required: true
    },
    option_b : {
        type: String,
        required: true
    },
    option_c : {
        type: String,
        required: true
    },
    option_d : {
        type: String,
        required: true
    },
    correction_answer : {
        type: String,
        required: true,
        enum:['option_a', 'option_b', 'option_c', 'option_d']
    },

})

const Question = mongoose.model('Question',QuestionSchema);
module.exports = Question;