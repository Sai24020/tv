# Branches

## Overview

This document describes the branch structure and workflow used in this worktree.

## Branch Strategy

We use a branching strategy to organize development work and maintain code quality.

### Main Branches

- **main** - Production-ready code. All releases come from this branch.
- **develop** - Integration branch for features. This is the base for feature development.

### Feature Branches

Feature branches are created from `develop` and follow the naming convention:
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Urgent production fixes

### Branch Naming Conventions

Use descriptive names with forward slashes:
- `feature/user-authentication`
- `bugfix/login-validation`
- `hotfix/critical-security-patch`

## Best Practices

1. Keep branches up-to-date with their parent branch
2. Delete branches after merging
3. Use pull requests for code review
4. Write clear commit messages
5. Keep feature branches focused and short-lived

## Worktree-Specific Information

**Important:** The branches documented here exist within this specific worktree: `worktree-2025-12-27T12-28-16`

This is an isolated Git worktree and should not be confused with branches in the main `tv` folder. Each worktree maintains its own branch state independently.
