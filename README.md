# Game 151 Infrastructure

AWS CDK infrastructure code for the Game 151 card game, managing all AWS resources and deployments.

## Features

- DynamoDB tables for game state and user data
- WebSocket API Gateway for real-time communication
- Lambda functions for game logic
- Cognito for user authentication
- S3 buckets for static assets
- CloudFront distribution for content delivery

## Prerequisites

- Node.js 18 or later
- AWS CDK CLI
- AWS account with appropriate permissions
- AWS credentials configured

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/game151-infrastructure.git
cd game151-infrastructure
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure AWS credentials:
```bash
aws configure
```

4. Deploy the infrastructure:
```bash
npm run cdk deploy
# or
yarn cdk deploy
```

## Project Structure

```
lib/
├── database-stack.ts    # DynamoDB tables
├── api-stack.ts        # API Gateway and WebSocket
├── auth-stack.ts       # Cognito configuration
└── storage-stack.ts    # S3 and CloudFront
```

## Available Stacks

### Database Stack
- Users table
- Games table
- Sessions table
- Players table

### API Stack
- WebSocket API Gateway
- REST API Gateway
- Lambda functions

### Auth Stack
- Cognito User Pool
- Cognito Identity Pool
- IAM roles and policies

### Storage Stack
- S3 buckets for static assets
- CloudFront distribution
- Route53 records

## Development

### Adding New Resources

1. Create a new stack or modify an existing one in the `lib/` directory
2. Update the stack in `bin/151-cdk.ts`
3. Deploy the changes:
```bash
npm run cdk deploy
```

### Testing

```bash
npm test
# or
yarn test
```

## Deployment

The infrastructure is deployed using GitHub Actions. The pipeline:
1. Builds the backend service
2. Builds the frontend applications
3. Deploys the CDK stacks
4. Updates the Lambda functions with new code

## License

MIT License - see LICENSE file for details 