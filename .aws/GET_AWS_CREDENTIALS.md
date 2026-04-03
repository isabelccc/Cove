# How to Get AWS Access Key ID

## Important Security Note

⚠️ **You cannot retrieve the Secret Access Key after it's created.** AWS doesn't store the secret key for security reasons. If you've lost it, you must create a new access key.

## Method 1: View from AWS CLI Configuration

If you've already configured AWS CLI, your Access Key ID is stored locally:

```bash
# View credentials file
cat ~/.aws/credentials

# Or on Windows:
# type %USERPROFILE%\.aws\credentials
```

**Example output:**
```ini
[default]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**To extract just the Access Key ID:**
```bash
# macOS/Linux
grep aws_access_key_id ~/.aws/credentials | cut -d' ' -f3

# Or using AWS CLI config
aws configure get aws_access_key_id
```

## Method 2: List Access Keys for Current User

```bash
# Get your current user name
aws sts get-caller-identity

# List access keys for the current user
aws iam list-access-keys --user-name YOUR_USERNAME

# Or if you're using the default user
aws iam list-access-keys
```

**Example output:**
```json
{
    "AccessKeyMetadata": [
        {
            "UserName": "github-actions-deploy",
            "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
            "Status": "Active",
            "CreateDate": "2024-01-01T00:00:00Z"
        }
    ]
}
```

**To get just the Access Key ID:**
```bash
aws iam list-access-keys --query 'AccessKeyMetadata[0].AccessKeyId' --output text
```

## Method 3: Create a New Access Key

If you need a new access key (or lost the secret):

```bash
# Create new access key for current user
aws iam create-access-key

# Or for a specific user
aws iam create-access-key --user-name github-actions-deploy
```

**Example output:**
```json
{
    "AccessKey": {
        "UserName": "github-actions-deploy",
        "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
        "Status": "Active",
        "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        "CreateDate": "2024-01-01T00:00:00Z"
    }
}
```

⚠️ **Save the SecretAccessKey immediately** - you won't see it again!

## Method 4: View from Environment Variables

If credentials are set as environment variables:

```bash
# View Access Key ID
echo $AWS_ACCESS_KEY_ID

# View all AWS environment variables
env | grep AWS
```

## Method 5: From AWS Console

1. Go to AWS Console → IAM → Users
2. Click on your user
3. Go to "Security credentials" tab
4. Scroll to "Access keys" section
5. You'll see the Access Key ID (but not the secret)

## Quick Commands Reference

```bash
# Get Access Key ID from local config
aws configure get aws_access_key_id

# Get Secret Access Key from local config (if configured)
aws configure get aws_secret_access_key

# Get current identity (includes account ID)
aws sts get-caller-identity

# List all access keys
aws iam list-access-keys

# Create new access key
aws iam create-access-key

# Delete old access key (after creating new one)
aws iam delete-access-key --access-key-id OLD_KEY_ID
```

## For GitHub Actions

If you need to set up credentials for GitHub Actions:

1. **Get your Access Key ID:**
   ```bash
   aws configure get aws_access_key_id
   ```

2. **If you don't have the Secret Access Key:**
   - Create a new access key pair
   - Save both values securely

3. **Add to GitHub Secrets:**
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add `AWS_ACCESS_KEY_ID` with your Access Key ID
   - Add `AWS_SECRET_ACCESS_KEY` with your Secret Access Key

## Security Best Practices

1. **Never commit credentials to git**
   - Add `~/.aws/credentials` to `.gitignore`
   - Use environment variables or secrets management

2. **Rotate access keys regularly**
   - Create new key
   - Update all places using old key
   - Delete old key

3. **Use IAM roles when possible**
   - For EC2 instances, use IAM roles instead of access keys
   - For ECS tasks, use task roles

4. **Limit permissions**
   - Follow principle of least privilege
   - Only grant necessary permissions

5. **Monitor access**
   - Use CloudTrail to monitor API calls
   - Set up alerts for unusual activity
