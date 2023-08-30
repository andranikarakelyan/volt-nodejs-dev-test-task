import {DbClient} from "../db/DbClient";
import {UserModel} from "../db/models/User.model";
import {faker} from "@faker-js/faker";
import {CommentModel} from "../db/models/Comment.model";
import {PostModel} from "../db/models/Post.model";

const config = {
  users_cnt: {
    min: 100,
    max: 101,
  },
  posts_cnt: {
    min: 1000,
    max: 1100
  },
  comments_cnt: {
    min: 1000,
    max: 1100,
  },
  date: {
    from: Date.now() - 7 * 60 * 60 * 1000,
    to: Date.now(),
  }
};

async function generateReport() {
  console.log('generateReport starting...');

  await DbClient.connect(true);

  console.log('Filling database with fake data ....');
  const users_cnt = randomInt(config.users_cnt.max, config.users_cnt.min);
  const posts_cnt = randomInt(config.posts_cnt.max, config.posts_cnt.min);
  const comments_cnt = randomInt(config.comments_cnt.max, config.comments_cnt.min);

  const user_ids = (await UserModel.bulkCreate(
    new Array(users_cnt).fill(0).map(() => ({
      nickname: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }))
  )).map(u => u.id);

  const post_ids = (await PostModel.bulkCreate(
    new Array(posts_cnt).fill(0).map(() => ({
      title: faker.lorem.word(),
      body: faker.lorem.sentence(),
      published_at: new Date(randomInt(config.date.to, config.date.from)),
      author_id: user_ids[randomInt(user_ids.length)],
    }))
  )).map(p => p.id);

  await CommentModel.bulkCreate(
    new Array(comments_cnt).fill(0).map(() => ({
      post_id: post_ids[randomInt(post_ids.length)],
      author_id: user_ids[randomInt(user_ids.length)],
      body: faker.lorem.sentence(),
      published_at: new Date(randomInt(config.date.to, config.date.from)),
    }))
  );


}

generateReport()
  .then(() => {
    console.log('generateReport completed');
    process.exit(0);
  })
  .catch(err => {
    console.error('generateReport error', err);
    process.exit(1);
  });

function randomInt(max: number, min: number = 0) {
  return Math.floor((max - min) * Math.random() + min);
}