resource "aws_route53domains_registered_domain" "slackmojifymycoworkerdotnet" {
  domain_name = var.domainName
}

resource "aws_route53_zone" "main" {
  name = var.domainName
}

resource "aws_route53_record" "ns" {
  zone_id         = aws_route53_zone.main.zone_id
  name            = var.domainName
  type            = "NS"
  ttl             = "86400"
  allow_overwrite = true
  records = flatten([
    for ns in aws_route53domains_registered_domain.slackmojifymycoworkerdotnet.name_server : ns.name
  ])

}

resource "aws_route53_record" "soa" {
  zone_id         = aws_route53_zone.main.zone_id
  name            = var.domainName
  type            = "SOA"
  ttl             = "900"
  allow_overwrite = true
  records = [
    "${aws_route53domains_registered_domain.slackmojifymycoworkerdotnet.name_server[0].name}. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 300"
  ]
}

resource "aws_route53_record" "a" {
  for_each = toset([var.domainName, "www.${var.domainName}"])
  zone_id  = aws_route53_zone.main.zone_id
  name     = each.value
  type     = "A"
  alias {
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "aaaa" {
  for_each = toset([var.domainName, "www.${var.domainName}"])
  zone_id  = aws_route53_zone.main.zone_id
  name     = each.value
  type     = "AAAA"
  alias {
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
    evaluate_target_health = false
  }
}
