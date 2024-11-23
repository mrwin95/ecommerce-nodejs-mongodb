module "acm_backend" {
  source = "terraform-aws-modules/acm/aws"
  version = "4.5.0"
  domain_name = "devops.acm.com"
  subject_alternative_names = ["*.devops.acm.com"]

  zone_id = data.aws_route53_zone.main.zone_id
  validation_method = "DNS"
  wait_for_validation = true

  tags = {
    Name = "${local.project}=${local.env}-backend-validation"
  }
}

data "aws_route53_zone" "main" {
  name = "acm.com"
}