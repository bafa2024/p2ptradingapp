# Git Workflow & Branch Protection Guide

This document outlines the Git workflow, branch strategy, and branch protection rules for the OKX Platform project.

## 🌿 Branch Strategy

### Main Branches

#### `main` Branch
- **Purpose**: Production-ready code
- **Protection**: Full protection enabled
- **Merge Policy**: Only via Pull Request with approval
- **Deployment**: Automatic deployment to production

#### `develop` Branch
- **Purpose**: Development integration branch
- **Protection**: Full protection enabled
- **Merge Policy**: Only via Pull Request with approval
- **Deployment**: Automatic deployment to staging

### Feature Branches

#### `feature/*` Branches
- **Naming Convention**: `feature/descriptive-name`
- **Examples**: 
  - `feature/escrow-system`
  - `feature/multi-currency-wallet`
  - `feature/kyc-verification`
- **Purpose**: New feature development
- **Base Branch**: `develop`
- **Merge Policy**: Pull Request to `develop`

#### `hotfix/*` Branches
- **Naming Convention**: `hotfix/issue-description`
- **Examples**:
  - `hotfix/critical-security-patch`
  - `hotfix/database-connection-fix`
- **Purpose**: Critical production fixes
- **Base Branch**: `main`
- **Merge Policy**: Pull Request to both `main` and `develop`

#### `bugfix/*` Branches
- **Naming Convention**: `bugfix/issue-description`
- **Examples**:
  - `bugfix/wallet-balance-calculation`
  - `bugfix/trade-status-update`
- **Purpose**: Bug fixes for development
- **Base Branch**: `develop`
- **Merge Policy**: Pull Request to `develop`

## 🔒 Branch Protection Rules

### Main Branch Protection

#### Required Status Checks
- ✅ Lint and Test
- ✅ Database Tests
- ✅ Security Scan
- ✅ Build and Deploy
- ✅ Code Coverage (minimum 80%)

#### Required Reviews
- **Minimum Reviews**: 2
- **Required Reviewers**: 
  - At least 1 team lead
  - At least 1 senior developer
- **Dismiss Stale Reviews**: Enabled
- **Require Review from Code Owners**: Enabled

#### Restrictions
- **Restrict Pushes**: Enabled
- **Restrict Deletions**: Enabled
- **Require Linear History**: Enabled
- **Require Signed Commits**: Enabled
- **Require Branch to be Up to Date**: Enabled

### Develop Branch Protection

#### Required Status Checks
- ✅ Lint and Test
- ✅ Database Tests
- ✅ Security Scan
- ✅ Build and Deploy

#### Required Reviews
- **Minimum Reviews**: 1
- **Required Reviewers**: 
  - At least 1 senior developer
- **Dismiss Stale Reviews**: Enabled

#### Restrictions
- **Restrict Pushes**: Enabled
- **Restrict Deletions**: Enabled
- **Require Branch to be Up to Date**: Enabled

## 📝 Commit Message Convention

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code formatting
- **refactor**: Code refactoring
- **test**: Test changes
- **chore**: Maintenance tasks

### Scopes
- **api**: API related changes
- **mobile**: Mobile app changes
- **web**: Web app changes
- **admin**: Admin dashboard changes
- **firebase**: Firebase related changes
- **db**: Database changes
- **auth**: Authentication changes
- **trading**: Trading features
- **wallet**: Wallet functionality
- **kyc**: KYC system
- **ui**: User interface changes
- **deps**: Dependency updates

### Examples
```
feat(trading): add escrow system for secure trades

Implements a secure escrow system that holds funds during
trade execution, ensuring both parties are protected.

Closes #123
```

```
fix(wallet): resolve balance calculation issue

Fixes incorrect balance calculation when multiple transactions
occur simultaneously.

Fixes #456
```

## 🔄 Pull Request Process

### Creating a Pull Request

1. **Branch Naming**: Use appropriate branch prefix
2. **Title**: Follow commit message convention
3. **Description**: 
   - Describe the changes
   - Link related issues
   - Include testing steps
   - Add screenshots if UI changes

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] No linting errors

## Related Issues
Closes #123
Related to #456
```

### Review Process

1. **Code Review**: At least one approval required
2. **Status Checks**: All CI checks must pass
3. **Branch Up-to-Date**: Must be up to date with base branch
4. **Merge**: Only after all requirements met

## 🚀 Release Process

### Release Branches

#### `release/*` Branches
- **Naming Convention**: `release/v1.2.3`
- **Purpose**: Prepare release for production
- **Base Branch**: `develop`
- **Merge Policy**: 
  - Merge to `main` (production)
  - Merge back to `develop`

### Release Process

1. **Create Release Branch**: From `develop`
2. **Version Update**: Update version numbers
3. **Final Testing**: Complete testing on release branch
4. **Merge to Main**: Create PR to `main`
5. **Tag Release**: Create Git tag for version
6. **Merge Back**: Merge release branch back to `develop`

## 🧹 Maintenance

### Branch Cleanup

- **Feature Branches**: Delete after merge
- **Hotfix Branches**: Delete after merge
- **Release Branches**: Delete after release
- **Stale Branches**: Automated cleanup after 30 days

### Regular Tasks

- **Weekly**: Review and clean up stale branches
- **Monthly**: Audit branch protection rules
- **Quarterly**: Review and update workflow documentation

## 🛠️ Tools & Automation

### GitHub Actions
- **CI/CD Pipeline**: Automated testing and deployment
- **Security Scanning**: Automated security checks
- **Dependency Updates**: Automated dependency management

### Pre-commit Hooks
- **Linting**: ESLint checks
- **Testing**: Unit test execution
- **Security**: Sensitive file detection

### Branch Protection
- **Automated Checks**: Status checks on all PRs
- **Review Enforcement**: Required reviews
- **History Protection**: Linear history enforcement

## 📚 Resources

- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow Workflow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🆘 Troubleshooting

### Common Issues

#### Branch Protection Blocking Merge
- Ensure all status checks pass
- Get required number of approvals
- Update branch with latest base branch

#### Commit Message Rejected
- Follow commit message convention
- Use appropriate type and scope
- Keep subject line under 50 characters

#### Pre-commit Hook Failed
- Fix linting errors
- Ensure tests pass
- Remove sensitive files from commit

---

**Note**: This workflow ensures code quality, security, and maintainability while enabling efficient collaboration among team members.
