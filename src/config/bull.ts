import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { rotateQuestions } from 'src/services/questionService';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

const questionQueue = new Queue('questionRotation', { connection });

const worker = new Worker(
  'questionRotation',
  async () => {
    await rotateQuestions();
  },
  { connection },
);

worker.on('completed', (job) => {
  console.log(`Job completed successfully with ID ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`Job failed with ID ${job.id} with error ${err.message}`);
});

export { questionQueue };
