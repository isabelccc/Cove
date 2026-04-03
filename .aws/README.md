# AWS Task Definition Setup

## Before Registering Task Definition

You need to update `task-definition.json` with your actual AWS values:

### 1. Replace Placeholders

**Find and replace:**
- `YOUR_ACCOUNT_ID` - Your AWS account ID (12 digits)
- `YOUR_REGION` - Your AWS region (e.g., `us-east-1`)

**In the file:**
- `executionRoleArn`: Replace `YOUR_ACCOUNT_ID` with your account ID
- `taskRoleArn`: Replace `YOUR_ACCOUNT_ID` with your account ID
- `image` (both containers): Replace `YOUR_ACCOUNT_ID` and `YOUR_REGION`
- `secrets` → `valueFrom`: Replace `YOUR_REGION` and `YOUR_ACCOUNT_ID`
- `awslogs-region`: Update to your region (currently `us-east-1`)

### 2. Get Your AWS Account ID

**Method 1: Using AWS CLI (Recommended)**
```bash
aws sts get-caller-identity --query Account --output text
```

This will output just the 12-digit account ID, for example: `123456789012`

**Method 2: Get Full Identity Info**
```bash
aws sts get-caller-identity
```

This returns JSON with Account ID, User ID, and ARN:
```json
{
    "UserId": "AIDA...",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/your-username"
}
```

**Method 3: From AWS Console**
1. Log in to AWS Console: https://console.aws.amazon.com
2. Click on your username in the top-right corner
3. Your Account ID is displayed in the dropdown menu (12-digit number)

**Method 4: From Support Center**
1. Go to AWS Console → Support → Support Center
2. Your Account ID is shown in the top-right corner

### 3. Create Required IAM Roles

**Execution Role (`ecsTaskExecutionRole`):**
```bash
# Create the role (or use AWS Console)
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "ecs-tasks.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

# Attach the policy
aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
```

**Task Role (`ecsTaskRole`):**
```bash
# Create the role
aws iam create-role \
  --role-name ecsTaskRole \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "ecs-tasks.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'
```

### 4. Create CloudWatch Log Groups

```bash
# Create log group for API
aws logs create-log-group --log-group-name /ecs/mern-memories-api --region us-east-1

# Create log group for Client
aws logs create-log-group --log-group-name /ecs/mern-memories-client --region us-east-1
```

### 5. Create Secrets in AWS Secrets Manager (Optional but Recommended)

```bash
# Database URL
aws secretsmanager create-secret \
  --name mern-memories/database-url \
  --secret-string "postgresql://user:password@host:5432/database" \
  --region us-east-1

# JWT Secret
aws secretsmanager create-secret \
  --name mern-memories/jwt-secret \
  --secret-string "your-super-secret-jwt-key" \
  --region us-east-1
```

**Note:** If you don't use Secrets Manager, remove the `secrets` section from the task definition and use `environment` instead.

### 6. Update ECR Image URLs

Make sure your ECR repositories exist and update the image URLs:

```bash
# List your ECR repositories
aws ecr describe-repositories --region us-east-1

# The image URL format is:
# ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/REPOSITORY_NAME:tag
```

### 7. Register Task Definition

Once you've updated all the placeholders:

```bash
# From project root
cd /Users/linl/mern-memories
aws ecs register-task-definition \
  --cli-input-json file://.aws/task-definition.json \
  --region us-east-1
```

**Or if you're in the .aws directory:**
```bash
cd /Users/linl/mern-memories/.aws
aws ecs register-task-definition \
  --cli-input-json file://task-definition.json \
  --region us-east-1
```

## Quick Checklist

Before registering, make sure you've:

- [ ] Replaced `YOUR_ACCOUNT_ID` with your actual account ID
- [ ] Replaced `YOUR_REGION` with your AWS region
- [ ] Created `ecsTaskExecutionRole` IAM role
- [ ] Created `ecsTaskRole` IAM role (optional)
- [ ] Created CloudWatch log groups
- [ ] Created ECR repositories
- [ ] Updated image URLs with correct ECR registry
- [ ] Created secrets in Secrets Manager (or removed secrets section)
- [ ] Updated `awslogs-region` to match your region

## Alternative: Use Environment Variables Instead of Secrets

If you don't want to use Secrets Manager, replace the `secrets` section with `environment`:

```json
"environment": [
  {
    "name": "DATABASE_URL",
    "value": "postgresql://user:pass@host:5432/db"
  },
  {
    "name": "JWT_SECRET",
    "value": "your-secret-key"
  }
]
```

**⚠️ Security Note:** Using environment variables is less secure than Secrets Manager, but simpler for development/testing.
