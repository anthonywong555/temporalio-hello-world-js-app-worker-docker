import { Connection, WorkflowClient } from '@temporalio/client';
import { example } from './workflows.js';
import 'dotenv/config';

async function run() {
  const connection = await Connection.connect({
    // // Connect to localhost with default ConnectionOptions.
    // // In production, pass options to the Connection constructor to configure TLS and other settings:
    // The app expects the environment variable TEMPORAL_CLUSTER_HOST, and assumes the port is 7233
    address: `${process.env.TEMPORAL_CLUSTER_HOST}:7233`, // as provisioned
    // tls: {} // as provisioned
  });

  const client = new WorkflowClient({
    connection,
    // namespace: 'default', // change if you have a different namespace
  });

  // Invoke the `example` Workflow, only resolved when the workflow completes
  const result = await client.execute(example, {
    taskQueue: 'hello-javascript',
    workflowId: 'my-business-id',
    args: ['Temporal'],
  });
  console.log(result); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
