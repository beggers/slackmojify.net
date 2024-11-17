terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = "slackmojifymycoworkerdotnet-terraform-state"
    key    = "slackmojifymycoworkerdotnet.com/terraform.tfstate"
    region = "us-west-1"
  }
}

provider "aws" {
  region                   = "us-west-1"
  shared_credentials_files = ["~/.aws/credentials"]
}

provider "aws" {
  alias                    = "acm_provider"
  region                   = "us-east-1"
  shared_credentials_files = ["~/.aws/credentials"]
}
