import { Question } from '../models/Question';
import { Region } from '../models/Region';
import { User } from '../models/User';
import redisClient from '../config/redis';

export const getAssignedQuestion = async (userId: string) => {
  console.log('userId', { userId });

  const user = await User.findById(userId).populate('assignedQuestion');
  if (!user) throw new Error('User not found');

  // Check if the specific question fields are cached in Redis
  const cachedQuestion = await redisClient.get(`user:${userId}:assignedQuestion`);
  if (cachedQuestion) {
    // Parse the cached question object and return it
    return JSON.parse(cachedQuestion);
  }

  // Assuming user.region contains the region name (e.g., "US")
  const region = await Region.findOne({ regionName: user.region });
  if (!region) throw new Error('Region not found');

  const currentCycle = await getCurrentCycle(region.regionName);

  // Use the region's _id for querying the Question model
  const question = await Question.findOne({ region: region._id, cycle: currentCycle });

  if (!question) throw new Error('No question found for this cycle');

  // Create an object with the fields you want to cache (cycle, region, questionText)
  const questionData = {
    questionText: question.questionText,
    cycle: question.cycle,
    region: question.region,
  };

  // Cache this specific object in Redis
  await redisClient.set(`user:${userId}:assignedQuestion`, JSON.stringify(questionData));

  return questionData;
};

// Fetches the current cycle based on region and duration.
const getCurrentCycle = async (regionName: string): Promise<number> => {
  const region = await Region.findOne({ regionName });
  if (!region) throw new Error('Region not found');

  // Calculate the current cycle based on the configurable cycle duration.
  const daysSinceEpoch = Math.floor(
    (Date.now() - new Date('2024-09-23').getTime()) / (1000 * 60 * 60 * 24),
  );

  return Math.floor(daysSinceEpoch / region.cycleDuration);
};

// Rotate questions to the next cycle.
export const rotateQuestions = async () => {
  try {
    const regions = await Region.find();

    for (const region of regions) {
      const currentCycle = await getCurrentCycle(region.regionName);
      const currentQuestion = await Question.findOne({
        region: region.regionName,
        cycleNumber: currentCycle,
      });

      if (currentQuestion) {
        // Batch update users in the region to assign them the current question.
        await User.updateMany(
          { region: region.regionName },
          { $set: { assignedQuestion: currentQuestion._id } },
        );

        console.log(
          `Successfully rotated questions for region ${region.regionName}. Assigned question ${currentQuestion.questionText}.`,
        );
      } else {
        console.warn(`No question found for cycle ${currentCycle} in region ${region.regionName}.`);
      }
    }
  } catch (error) {
    console.error('Error rotating questions:', error.message);
  }
};
