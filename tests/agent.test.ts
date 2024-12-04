import {Agent} from '../src/modules';

class TestAgent extends Agent {
  getFeed(): Array<Object> {
    return [];
  }
  getHistory(): Array<Object> {
    return [];
  }
}

const testAgent = new TestAgent();

test('Agent writing post', async () => {
  const topic = 'JavaScript';

  const post = await testAgent.writePost(topic);
  expect(post).resolves.toContain(topic);
});
