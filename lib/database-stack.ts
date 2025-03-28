import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class DatabaseStack extends cdk.Stack {
  public readonly usersTable: dynamodb.Table;
  public readonly gamesTable: dynamodb.Table;
  public readonly sessionsTable: dynamodb.Table;
  public readonly playersTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Users Table
    this.usersTable = new dynamodb.Table(this, 'UsersTable', {
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For development only
      pointInTimeRecovery: true,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
    });

    // Games Table
    this.gamesTable = new dynamodb.Table(this, 'GamesTable', {
      partitionKey: { name: 'gameId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'createdAt', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For development only
      pointInTimeRecovery: true,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
    });

    // Game Sessions Table
    this.sessionsTable = new dynamodb.Table(this, 'SessionsTable', {
      partitionKey: { name: 'sessionId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For development only
      pointInTimeRecovery: true,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
    });

    // Players Table
    this.playersTable = new dynamodb.Table(this, 'PlayersTable', {
      partitionKey: { name: 'playerId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'position', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For development only
      pointInTimeRecovery: true,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
    });

    // Add GSIs
    this.gamesTable.addGlobalSecondaryIndex({
      indexName: 'StatusIndex',
      partitionKey: { name: 'status', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'createdAt', type: dynamodb.AttributeType.NUMBER },
    });

    this.sessionsTable.addGlobalSecondaryIndex({
      indexName: 'GameIndex',
      partitionKey: { name: 'gameId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.NUMBER },
    });

    this.playersTable.addGlobalSecondaryIndex({
      indexName: 'GameIndex',
      partitionKey: { name: 'gameId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'position', type: dynamodb.AttributeType.NUMBER },
    });

    this.playersTable.addGlobalSecondaryIndex({
      indexName: 'UserIndex',
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'position', type: dynamodb.AttributeType.NUMBER },
    });

    // Create IAM role for Lambda functions
    const lambdaRole = new iam.Role(this, 'GameLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    // Grant DynamoDB permissions
    this.usersTable.grantReadWriteData(lambdaRole);
    this.gamesTable.grantReadWriteData(lambdaRole);
    this.sessionsTable.grantReadWriteData(lambdaRole);
    this.playersTable.grantReadWriteData(lambdaRole);

    // Grant CloudWatch Logs permissions
    lambdaRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
    );
  }
} 