import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Question } from '../models/Question';
import { Region } from '../models/Region';
import connectDB from '../config/database';

dotenv.config();

const seedDatabase = async () => {
  await connectDB(); // Connects to MongoDB

  try {
    // Remove existing data (optional)
    await Question.deleteMany({});
    await Region.deleteMany({});

    // Create regions with cycleDuration
    const regionsData = [
      { regionName: 'Singapore', cycleDuration: 7 }, // 7 days cycle
      { regionName: 'US', cycleDuration: 7 },
      { regionName: 'UK', cycleDuration: 7 },
      { regionName: 'Australia', cycleDuration: 7 },
      { regionName: 'India', cycleDuration: 7 },
    ];

    const regionsPromises = regionsData.map((regionData) => new Region(regionData).save());
    const regions = await Promise.all(regionsPromises);

    // Rest of the code remains the same...
    const singaporeQuestions = [
      { questionText: 'What is the capital of Singapore?', cycle: 1, region: regions[0]._id },
      { questionText: 'What is Singapores national flower?', cycle: 2, region: regions[0]._id },
      {
        questionText: 'How many official languages does Singapore have?',
        cycle: 3,
        region: regions[0]._id,
      },
      {
        questionText: 'Which is the tallest building in Singapore?',
        cycle: 4,
        region: regions[0]._id,
      },
      { questionText: 'What is the currency of Singapore?', cycle: 5, region: regions[0]._id },
      {
        questionText: 'Which year did Singapore gain independence?',
        cycle: 6,
        region: regions[0]._id,
      },
      { questionText: 'What is the population of Singapore?', cycle: 7, region: regions[0]._id },
      {
        questionText: 'Which is the largest island in Singapore?',
        cycle: 8,
        region: regions[0]._id,
      },
      {
        questionText: 'Who is the current Prime Minister of Singapore?',
        cycle: 9,
        region: regions[0]._id,
      },
      {
        questionText: 'What is Singapores most famous shopping street?',
        cycle: 10,
        region: regions[0]._id,
      },
    ];

    const usQuestions = [
      {
        questionText: 'What is the capital of the United States?',
        cycle: 1,
        region: regions[1]._id,
      },
      {
        questionText: 'Which is the largest state in the US by area?',
        cycle: 2,
        region: regions[1]._id,
      },
      { questionText: 'What is the national bird of the US?', cycle: 3, region: regions[1]._id },
      { questionText: 'Which city is known as "The Big Apple"?', cycle: 4, region: regions[1]._id },
      { questionText: 'What year did the US gain independence?', cycle: 5, region: regions[1]._id },
      {
        questionText: 'What is the currency of the United States?',
        cycle: 6,
        region: regions[1]._id,
      },
      {
        questionText: 'Who was the first President of the United States?',
        cycle: 7,
        region: regions[1]._id,
      },
      {
        questionText: 'Which is the longest river in the United States?',
        cycle: 8,
        region: regions[1]._id,
      },
      {
        questionText: 'Which US state is known as the "Sunshine State"?',
        cycle: 9,
        region: regions[1]._id,
      },
      {
        questionText: 'What is the tallest mountain in the US?',
        cycle: 10,
        region: regions[1]._id,
      },
    ];

    const ukQuestions = [
      {
        questionText: 'What is the capital of the United Kingdom?',
        cycle: 1,
        region: regions[2]._id,
      },
      {
        questionText: 'What is the national animal of Scotland?',
        cycle: 2,
        region: regions[2]._id,
      },
      {
        questionText: 'Which year did the UK vote to leave the EU?',
        cycle: 3,
        region: regions[2]._id,
      },
      { questionText: 'What is the longest river in the UK?', cycle: 4, region: regions[2]._id },
      {
        questionText: 'Who is the current monarch of the United Kingdom?',
        cycle: 5,
        region: regions[2]._id,
      },
      {
        questionText: 'What is the currency of the United Kingdom?',
        cycle: 6,
        region: regions[2]._id,
      },
      {
        questionText: 'Which is the largest city in the UK by population?',
        cycle: 7,
        region: regions[2]._id,
      },
      {
        questionText: 'What year did the Great Fire of London occur?',
        cycle: 8,
        region: regions[2]._id,
      },
      { questionText: 'What is the national dish of England?', cycle: 9, region: regions[2]._id },
      {
        questionText: 'Which UK city is known for its universities?',
        cycle: 10,
        region: regions[2]._id,
      },
    ];

    const australiaQuestions = [
      { questionText: 'What is the capital of Australia?', cycle: 1, region: regions[3]._id },
      {
        questionText: 'Which animal is on the Australian coat of arms?',
        cycle: 2,
        region: regions[3]._id,
      },
      { questionText: 'What is the largest city in Australia?', cycle: 3, region: regions[3]._id },
      {
        questionText: 'Which reef is located off the coast of Australia?',
        cycle: 4,
        region: regions[3]._id,
      },
      {
        questionText: 'Which is the tallest mountain in Australia?',
        cycle: 5,
        region: regions[3]._id,
      },
      { questionText: 'What is the currency of Australia?', cycle: 6, region: regions[3]._id },
      {
        questionText: 'What year did Australia gain independence?',
        cycle: 7,
        region: regions[3]._id,
      },
      {
        questionText: 'Who is the current Prime Minister of Australia?',
        cycle: 8,
        region: regions[3]._id,
      },
      {
        questionText: 'What is the national language of Australia?',
        cycle: 9,
        region: regions[3]._id,
      },
      {
        questionText: 'Which Australian city is known for its Opera House?',
        cycle: 10,
        region: regions[3]._id,
      },
    ];

    const indiaQuestions = [
      { questionText: 'What is the capital of India?', cycle: 1, region: regions[4]._id },
      { questionText: 'What is the national animal of India?', cycle: 2, region: regions[4]._id },
      { questionText: 'Which year did India gain independence?', cycle: 3, region: regions[4]._id },
      { questionText: 'Which is the longest river in India?', cycle: 4, region: regions[4]._id },
      { questionText: 'What is the currency of India?', cycle: 5, region: regions[4]._id },
      {
        questionText: 'Which is the largest state in India by area?',
        cycle: 6,
        region: regions[4]._id,
      },
      {
        questionText: 'Who is the current Prime Minister of India?',
        cycle: 7,
        region: regions[4]._id,
      },
      {
        questionText: 'Which monument is India most famous for?',
        cycle: 8,
        region: regions[4]._id,
      },
      { questionText: 'What is the national language of India?', cycle: 9, region: regions[4]._id },
      {
        questionText: 'Which Indian city is known as the Silicon Valley of India?',
        cycle: 10,
        region: regions[4]._id,
      },
    ];

    // Insert questions into the database
    const allQuestions = [
      ...singaporeQuestions,
      ...usQuestions,
      ...ukQuestions,
      ...australiaQuestions,
      ...indiaQuestions,
    ];

    await Question.insertMany(allQuestions);

    console.log('Database seeded successfully with regions and questions');

    // Close MongoDB connection after seeding is done.
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error.message);
    mongoose.connection.close();
  }
};

seedDatabase();
