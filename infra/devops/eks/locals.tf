locals {
    environment = terraform.workspace
    project = "devops"
    region = lookup(local.k9s_info, "region")
    k9s_info= "This is a k9s cluster"
    cluster_name = "dev-eks-cluster"    
    vpc_id = "vpc-0be1c89af4619afef"
    cluster_version = "1.31"
    vpc_cidr_block = ""
    public_subnets = ["subnet-05c89d5e0c380d78d", "subnet-0ea944b27799bdbf0"]
    cluster_enabled_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]
    eks_managed_node_groups = ""
    cluster_security_group_additional_rules = ""
    coredns_config = ""
    ecr_names = ""
    prefix = "${local.project}-${local.environment}-${local.region}"
    eks_access_entries = ""
    eks_access_policy = ""

    account_id = "123456789012"
    default_tags = {
        environment = local.environment
        managed_by = "terraform"
        Project = local.project
    }
}