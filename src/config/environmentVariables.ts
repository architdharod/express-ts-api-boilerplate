import * as dotenv from 'dotenv';
import Debug from 'debug';

// Debug configuration
const debug: Debug.IDebugger = Debug('config/index.ts');

// specify the path of the .env file based on the NODE_ENV
let envPath;
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'test') {
  envPath = '.env.test';
} else if (nodeEnv === 'production') {
  envPath = '.env.production';
} else {
  envPath = '.env';
}

dotenv.config({ path: envPath });

// Define your environment variables
const envVar = {
  port: <string>process.env.PORT,
  freshdeskApiUsername: <string>process.env.FRESHDESK_API_USERNAME,
  freshdeskApiPassword: <string>process.env.FRESHDESK_API_PASSWORD,
  // ... add more variables as needed
};

export default envVar;

// Utility function to check if all environment variables exist
function checkEnvVariables(variables: Record<string, string | undefined>) {
  Object.entries(variables).forEach(([key, value]) => {
    if (typeof value === 'undefined' || value === null) {
      debug(`"${key}" environment variable is not defined`);
      process.exit(1); // Exit the process with a "failure" code
    }
  });
}

// Check all environment variables
checkEnvVariables(envVar);
