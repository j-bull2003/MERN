// Importing mongoose and SchemaType
const mongoose = require('mongoose')
const { STRING_REQUIRED_TRIM, STRING_REQUIRED, STRING, CREATED_DATE, BOOLEAN_DEFAULT, REF_OBJECT_ID, NUMBER_REQUIRED, ARRAY, BOOLEAN_DEFAULT_TRUE, NUMBER } = require('./SchemaType')

// Creating a photoSchema using mongoose
const photoSchema = new mongoose.Schema({
    imageName: STRING,
    imageUrl: STRING,
    userId: REF_OBJECT_ID('user'),
    isDeleted: BOOLEAN_DEFAULT,
    created: CREATED_DATE
})

// Creating a Photo model based on photoSchema
const Photo = mongoose.model('photo', photoSchema)

// Exporting Photo model
module.exports = Photo