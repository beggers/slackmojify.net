# Created in the beneggers.com repo
locals {
  oidc_provider_arn = "arn:aws:iam::110322115102:oidc-provider/token.actions.githubusercontent.com"
}

data "aws_iam_policy_document" "github_actions_assume_role" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [local.oidc_provider_arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:slackmojify.net/*"]
    }
  }
}

resource "aws_iam_role" "github_actions" {
  name               = "slackmoji-github-actions"
  assume_role_policy = data.aws_iam_policy_document.github_actions_assume_role.json
}

data "aws_iam_policy_document" "github_actions_policy" {
  statement {
    actions = [
      "acm:*",
      "cloudfront:*",
      "dynamodb:*",
      "iam:*",
      "route53:*",
      "s3:*",
    ]
    effect = "Allow"
    resources = [
      "*",
    ]
  }
}

resource "aws_iam_role_policy" "github_actions" {
  name   = "github-actions-policy"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.github_actions_policy.json
}
