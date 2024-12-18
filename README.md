# TWON-Actor

## Install

```bash
npm install twon-actor
```

## Usage

```ts
import { Agent } from "twon-actor";

class TestAgent extends Agent {
    getNotifications() {
      return [];
    }
    getFeed() {
      return [];
    }
  }

const testAgent = new TestAgent("test")
console.log(testAgent)

const topic: string = "JavaScript"

testAgent.post(topic).then((post) => {
  console.log(`Write a post about ${topic}:`)
  console.log(post)
})
```
