# TWON-Simulation

## Install

```bash
npm install twon-simulation
```

## Usage

```ts
import { Agent } from "twon-simulation";

class TestAgent extends Agent {
  getNotifications() {
    return [];
  }
  getFeed() {
    return [];
  }
}

const testAgent = new TestAgent("test");
console.log(testAgent);

const topic: string = "JavaScript";

testAgent.post(topic).then((post) => {
  console.log(`Write a post about ${topic}:`);
  console.log(post);
});
```
