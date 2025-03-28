# Game151 Infrastructure

This repository contains the AWS CDK infrastructure code for the Game151 project.

## Project Structure

```
infrastructure/
├── bin/           # CDK app entry point
├── lib/           # CDK stack definitions
├── test/          # Infrastructure tests
└── docs/          # Documentation
    └── architecture.md  # System architecture documentation
```

## Prerequisites

- Node.js 18 or later
- AWS CDK CLI
- AWS Account and configured credentials

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy the stacks:
   ```bash
   npm run cdk deploy
   ```

## Architecture

For detailed information about the system architecture, including:
- System components and their interactions
- Database schema
- Frontend and backend architecture
- Infrastructure stacks

See [architecture documentation](docs/architecture.md).

## Development

- `npm run build` - Build the CDK app
- `npm run test` - Run infrastructure tests
- `npm run cdk deploy` - Deploy all stacks
- `npm run cdk diff` - Show changes to be deployed
- `npm run cdk synth` - Synthesize CloudFormation template

## License

ISC 