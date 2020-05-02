const bcrypt = require('bcryptjs');

module.exports = [
    {
        instructor_id: 2,
        name: 'Wothout with the Assistant Regional Manager',
        type: 'Full body workout',
        start_time: '2020-05-02 07:00',
        location: 'Dunder Mifflin Papper Company',
        intensity: 5,
        price: 10,
        description: 'The best full body workout you can imagine. Content: Intro to parkour, karate, 20 X up and down Dunder Mifflin stairs',
        duration: 180
    },
    {
        instructor_id: 1,
        name: 'Jokes and workout',
        type: 'Cardio',
        start_time: '2020-05-10 10:00',
        location: 'Dunder Mifflin parking lot',
        intensity: 2,
        price: 0,
        description: 'In this class we are going to play a game whitch involves jumping jacks and jokes. An easy way to workout and make friends.'
    },
    {
        instructor_id: 4,
        name: 'Cookies and naps',
        type: 'Yoga',
        start_time: '2020-05-9 15:00',
        location: '1150, Main St - Scranton, PA',
        intensity: 1,
        price: 30,
        description: 'Yoga with cookie breaks every 10min',
        duration: 360
    }
]