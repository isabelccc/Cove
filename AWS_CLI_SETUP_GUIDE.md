# AWS CLI Setup Guide

This guide covers installing and configuring AWS CLI for managing your ECS deployment and ECR repositories.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Verification](#verification)
4. [Setting Up for GitHub Actions](#setting-up-for-github-actions)
5. [Common Commands](#common-commands)
6. [Troubleshooting](#troubleshooting)

---

## Installation

### macOS

**Option 1: Using Homebrew (Recommended)**
```bash
brew install awscli
```

**Option 2: Using Installer**
```bash
# Download the installer
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"

# Install
sudo installer -pkg AWSCLIV2.pkg -target /
```

**Option 3: Using pip**
```bash
pip3 install awscli --upgrade
```

### Linux

**Option 1: Using Package Manager**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install awscli

# Amazon Linux/CentOS/RHEL
sudo yum install awscli
```

**Option 2: Using Installer (Latest Version)**
```bash
# Download
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

# Unzip
unzip awscliv2.zip

# Install
sudo ./aws/install
```

### Windows

**Option 1: Using MSI Installer**
1. Download the MSI installer from: https://awscli.amazonaws.com/AWSCLIV2.msi
2. Run the installer and follow the prompts

**Option 2: Using PowerShell**
```powershell
# Download
Invoke-WebRequest -Uri "https://awscli.amazonaws.com/AWSCLIV2.msi" -OutFile "AWSCLIV2.msi"

# Install (run as Administrator)
Start-Process msiexec.exe -Wait -ArgumentList '/I AWSCLIV2.msi /quiet'
```

### Verify Installation

```bash
aws --version
# Should output: aws-cli/2.x.x Python/3.x.x ...
```

---

## Configuration

### Step 1: Get AWS Credentials

You need an AWS Access Key ID and Secret Access Key. You can get these by:

1. **Creating an IAM User (Recommended for CI/CD):**
   - Go to AWS Console → IAM → Users
   - Click "Add users"
   - Username: `github-actions-deploy` (or your preferred name)
   - Select "Programmatic access"
   - Attach policies (see [IAM Permissions](#iam-permissions) below)
   - Save the Access Key ID and Secret Access Key (you won't see the secret again!)

2. **Using Existing IAM User:**
   - Go to IAM → Users → Select user → Security credentials
   - Click "Create access key"
   - Select "Application running outside AWS"
   - Save the credentials

### Step 2: Configure AWS CLI

Run the configure command:

```bash
aws configure
```

You'll be prompted for:

1. **AWS Access Key ID:** `AKIAIOSFODNN7EXAMPLE`
2. **AWS Secret Access Key:** `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
3. **Default region name:** `us-east-1` (or your preferred region)
4. **Default output format:** `json` (recommended) or `yaml`, `text`, `table`

**Example:**
```bash
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

### Step 3: Verify Configuration

Check your configuration:

```bash
# View current configuration
aws configure list

# View credentials file location
cat ~/.aws/credentials

# View config file
cat ~/.aws/config
```

**Configuration files location:**
- **macOS/Linux:** `~/.aws/credentials` and `~/.aws/config`
- **Windows:** `C:\Users\USERNAME\.aws\credentials` and `C:\Users\USERNAME\.aws\config`

---

## Verification

### Test AWS CLI Connection

```bash
# Test basic connection
aws sts get-caller-identity

# Should return:
# {
#     "UserId": "AIDA...",
#     "Account": "123456789012",
#     "Arn": "arn:aws:iam::123456789012:user/github-actions-deploy"
# }
```

### Test ECR Access

```bash
# List ECR repositories
aws ecr describe-repositories --region us-east-1

# Should return your repositories or empty list if none exist
```

### Test ECS Access

```bash
# List ECS clusters
aws ecs list-clusters --region us-east-1

# List ECS services
aws ecs list-services --cluster-name YOUR_CLUSTER_NAME --region us-east-1
```

---

## Setting Up for GitHub Actions

### Step 1: Create IAM User for GitHub Actions

1. **Go to IAM Console:**
   - AWS Console → IAM → Users → Add users

2. **User Details:**
   - Username: `github-actions-deploy`
   - Access type: **Programmatic access only**

3. **Attach Policies:**
   - Click "Attach policies directly"
   - Create a custom policy with these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:PutImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:RegisterTaskDefinition",
        "ecs:DescribeTaskDefinition",
        "ecs:UpdateService",
        "ecs:DescribeServices",
        "ecs:ListTasks",
        "ecs:DescribeTasks"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:PassRole"
      ],
      "Resource": [
        "arn:aws:iam::YOUR_ACCOUNT_ID:role/ecsTaskExecutionRole",
        "arn:aws:iam::YOUR_ACCOUNT_ID:role/ecsTaskRole"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

4. **Save Credentials:**
   - Copy the **Access Key ID** and **Secret Access Key**
   - ⚠️ **Important:** Save these securely - you won't see the secret again!

### Step 2: Add Secrets to GitHub

1. **Go to GitHub Repository:**
   - Your repo → Settings → Secrets and variables → Actions

2. **Add Secrets:**
   - Click "New repository secret"
   - Add these secrets:
     - **Name:** `AWS_ACCESS_KEY_ID`
     - **Value:** Your IAM user's Access Key ID
   
   - **Name:** `AWS_SECRET_ACCESS_KEY`
   - **Value:** Your IAM user's Secret Access Key

3. **Optional Secrets (for client build):**
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://api.yourdomain.com`
   
   - **Name:** `REACT_APP_GOOGLE_CLIENT_ID`
   - **Value:** Your Google OAuth client ID

### Step 3: Verify GitHub Actions Can Access AWS

After pushing your workflow, check the GitHub Actions logs to ensure:
- ✅ ECR login succeeds
- ✅ Images are pushed successfully
- ✅ Task definition is updated
- ✅ ECS service is updated

---

## Common Commands

### ECR (Elastic Container Registry)

```bash
# List repositories
aws ecr describe-repositories --region us-east-1

# Create repository
aws ecr create-repository \
  --repository-name mern-memories-api \
  --region us-east-1

# Delete repository (⚠️ deletes all images)
aws ecr delete-repository \
  --repository-name mern-memories-api \
  --force \
  --region us-east-1

# List images in repository
aws ecr list-images \
  --repository-name mern-memories-api \
  --region us-east-1

# Get login token (for docker login)
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
```

### ECS (Elastic Container Service)

```bash
# List clusters
aws ecs list-clusters --region us-east-1

# Describe cluster
aws ecs describe-clusters \
  --clusters mern-memories-cluster \
  --region us-east-1

# List services
aws ecs list-services \
  --cluster mern-memories-cluster \
  --region us-east-1

# Describe service
aws ecs describe-services \
  --cluster mern-memories-cluster \
  --services mern-memories-service \
  --region us-east-1

# List tasks
aws ecs list-tasks \
  --cluster mern-memories-cluster \
  --region us-east-1

# Register task definition
aws ecs register-task-definition \
  --cli-input-json file://.aws/task-definition.json \
  --region us-east-1

# Update service
aws ecs update-service \
  --cluster mern-memories-cluster \
  --service mern-memories-service \
  --task-definition mern-memories:10 \
  --region us-east-1
```

### IAM

```bash
# Get current user identity
aws sts get-caller-identity

# List IAM users
aws iam list-users

# Get user details
aws iam get-user --user-name github-actions-deploy
```

### Secrets Manager (for storing secrets)

```bash
# Create secret
aws secretsmanager create-secret \
  --name mern-memories/database-url \
  --secret-string "postgresql://user:pass@host:5432/db" \
  --region us-east-1

# Get secret value
aws secretsmanager get-secret-value \
  --secret-id mern-memories/database-url \
  --region us-east-1

# Update secret
aws secretsmanager update-secret \
  --secret-id mern-memories/database-url \
  --secret-string "postgresql://user:newpass@host:5432/db" \
  --region us-east-1
```

---

## IAM Permissions

### Minimum Required Permissions for GitHub Actions

Your IAM user needs these permissions:

**1. ECR Permissions:**
- `ecr:GetAuthorizationToken` - Get Docker login token
- `ecr:BatchCheckLayerAvailability` - Check if image layers exist
- `ecr:GetDownloadUrlForLayer` - Download image layers
- `ecr:BatchGetImage` - Get image manifests
- `ecr:PutImage` - Push images
- `ecr:InitiateLayerUpload` - Start uploading layers
- `ecr:UploadLayerPart` - Upload layer parts
- `ecr:CompleteLayerUpload` - Complete layer upload

**2. ECS Permissions:**
- `ecs:RegisterTaskDefinition` - Register new task definitions
- `ecs:DescribeTaskDefinition` - Read task definitions
- `ecs:UpdateService` - Update ECS service
- `ecs:DescribeServices` - Get service status
- `ecs:ListTasks` - List running tasks
- `ecs:DescribeTasks` - Get task details

**3. IAM Permissions:**
- `iam:PassRole` - Pass execution role to ECS tasks
  - Resource: `arn:aws:iam::ACCOUNT_ID:role/ecsTaskExecutionRole`

**4. CloudWatch Logs (Optional but recommended):**
- `logs:CreateLogGroup` - Create log groups
- `logs:CreateLogStream` - Create log streams
- `logs:PutLogEvents` - Write log events

### Creating IAM Policy

1. **Go to IAM Console:**
   - IAM → Policies → Create policy

2. **Use JSON editor:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "ecr:*",
           "ecs:RegisterTaskDefinition",
           "ecs:DescribeTaskDefinition",
           "ecs:UpdateService",
           "ecs:DescribeServices",
           "ecs:ListTasks",
           "ecs:DescribeTasks",
           "iam:PassRole",
           "logs:CreateLogGroup",
           "logs:CreateLogStream",
           "logs:PutLogEvents"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

3. **Name the policy:**
   - Policy name: `GitHubActionsECRDeploy`

4. **Attach to user:**
   - IAM → Users → Select user → Add permissions → Attach policies directly
   - Select `GitHubActionsECRDeploy`

---

## Troubleshooting

### Error: Unable to locate credentials

**Problem:** AWS CLI can't find credentials

**Solutions:**
```bash
# Check if credentials file exists
ls -la ~/.aws/credentials

# Reconfigure
aws configure

# Or set environment variables
export AWS_ACCESS_KEY_ID=your-key
export AWS_SECRET_ACCESS_KEY=your-secret
export AWS_DEFAULT_REGION=us-east-1
```

### Error: Access Denied

**Problem:** IAM user doesn't have required permissions

**Solutions:**
1. Check IAM user policies
2. Verify the policy includes all required actions
3. Check if resource ARNs are correct (for PassRole)

### Error: Region not specified

**Problem:** Default region not set

**Solutions:**
```bash
# Set default region
aws configure set region us-east-1

# Or specify in command
aws ecr describe-repositories --region us-east-1
```

### Error: Invalid credentials

**Problem:** Access key or secret is incorrect

**Solutions:**
1. Verify credentials in GitHub Secrets
2. Check IAM user still exists and is active
3. Regenerate access key if needed

### Error: Cannot connect to AWS

**Problem:** Network or proxy issues

**Solutions:**
```bash
# Test connectivity
ping ecr.us-east-1.amazonaws.com

# Check proxy settings
aws configure set proxy.http http://proxy.example.com:8080
aws configure set proxy.https https://proxy.example.com:8080
```

### Error: ECR repository not found

**Problem:** Repository doesn't exist or wrong name

**Solutions:**
```bash
# List all repositories
aws ecr describe-repositories --region us-east-1

# Create if missing
aws ecr create-repository --repository-name mern-memories-api --region us-east-1
```

### Error: Task execution role not found

**Problem:** ECS task execution role doesn't exist

**Solutions:**
1. Create the role in IAM:
   ```bash
   # Use AWS Console or create via CloudFormation/Terraform
   # Role name: ecsTaskExecutionRole
   # Attach policy: AmazonECSTaskExecutionRolePolicy
   ```

2. Update task definition to use correct role ARN

---

## Best Practices

1. **Use IAM Users (not root account)** for programmatic access
2. **Follow principle of least privilege** - only grant necessary permissions
3. **Rotate access keys regularly** (every 90 days)
4. **Use separate IAM users** for different purposes (dev, staging, prod)
5. **Enable MFA** for AWS Console access
6. **Use AWS Secrets Manager** for sensitive data (not hardcoded)
7. **Monitor access** using CloudTrail
8. **Use named profiles** for multiple AWS accounts:
   ```bash
   aws configure --profile production
   aws configure --profile development
   
   # Use profile
   aws ecr describe-repositories --profile production
   ```

---

## Quick Reference

### Configuration Files

**macOS/Linux:**
- Credentials: `~/.aws/credentials`
- Config: `~/.aws/config`

**Windows:**
- Credentials: `C:\Users\USERNAME\.aws\credentials`
- Config: `C:\Users\USERNAME\.aws\config`

### Environment Variables

```bash
export AWS_ACCESS_KEY_ID=your-key
export AWS_SECRET_ACCESS_KEY=your-secret
export AWS_DEFAULT_REGION=us-east-1
```

### Useful Commands

```bash
# Check current identity
aws sts get-caller-identity

# List all regions
aws ec2 describe-regions

# View configuration
aws configure list

# Get help
aws help
aws ecr help
aws ecs help
```

---

## Next Steps

After setting up AWS CLI:

1. ✅ Create ECR repositories (see `AWS_ECS_DEPLOYMENT_GUIDE.md`)
2. ✅ Create ECS cluster and service
3. ✅ Create task definition
4. ✅ Configure GitHub Actions secrets
5. ✅ Test deployment workflow

For detailed ECS deployment instructions, see `AWS_ECS_DEPLOYMENT_GUIDE.md`.
