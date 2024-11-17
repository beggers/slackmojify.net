resource "aws_route53domains_registered_domain" "slackmojifymycoworkerdotnet" {
  domain_name = var.domainName

  # I did something stupid. These are manually copied from the AWS console.
  name_server {
    name = "ns-495.awsdns-61.com"
  }
  name_server {
    name = "ns-884.awsdns-46.net"
  }
  name_server {
    name = "ns-1124.awsdns-12.org"
  }
  name_server {
    name = "ns-1950.awsdns-51.co.uk"
  }
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
