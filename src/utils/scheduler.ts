import cron from 'node-cron';
import { questionQueue } from '../config/bull';

// Schedule the task to run every Monday at 7 PM SGT.
cron.schedule('0 19 * * MON', async () => {
  await questionQueue.add('rotateQuestions', {});
  console.log('Scheduled job for rotating questions every Monday at 7 PM SGT');
});
