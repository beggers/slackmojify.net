resource "aws_s3_bucket" "main" {
  bucket = var.domainName
  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.main.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "main" {
  bucket = aws_s3_bucket.main.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_ownership_controls" "main" {
  bucket = aws_s3_bucket.main.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
  depends_on = [aws_s3_bucket_public_access_block.main]
}

resource "aws_s3_bucket_acl" "main" {
  bucket     = aws_s3_bucket.main.id
  acl        = "private"
  depends_on = [aws_s3_bucket_ownership_controls.main]
}

resource "aws_s3_bucket_policy" "main" {
  bucket     = aws_s3_bucket.main.id
  policy     = data.aws_iam_policy_document.website_policy.json
  depends_on = [aws_s3_bucket_public_access_block.main]
}

locals {
  mime_types = {
    html = "text/html"
    css  = "text/css"
    js   = "application/javascript"
    png  = "image/png"
    jpg  = "image/jpeg"
    jpeg = "image/jpeg"
    gif  = "image/gif"
  }
}

resource "aws_s3_object" "website_files" {
  for_each = fileset(var.build_directory, "**/*")

  bucket      = aws_s3_bucket.main.bucket
  key         = each.value
  source      = "${var.build_directory}/${each.value}"
  source_hash = filemd5("${var.build_directory}/${each.value}")
  etag        = filemd5("${var.build_directory}/${each.value}")
  acl         = "public-read"
  content_type = lookup(
    local.mime_types,
    element(
      split(".", each.value),
      length(split(".", each.value)) - 1
    ),
    "application/octet-stream"
  )
}
