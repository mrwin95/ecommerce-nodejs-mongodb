data "aws_vpc" "selected_vpc" {
  id = var.vpc_id
}

module "eks" {
    source = "terraform-aws-modules/eks/aws"
    version = "20.29.0"
    cluster_name = var.cluster_name
    cluster_version = var.cluster_version
    vpc_id = data.aws_vpc.selected_vpc.id
    subnet_ids = var.private_subnets

    # enable_irsa = true

    cluster_addons = {
        vpc_cni = {
            enabled = true
        }

        kube_proxy = {
            enabled = true
        }

        coredns = {
            most_recent = true
            resolve_conflicts_on_create = "Overwrite"
            configuration_values = jsonencode({
                replicaCount = 1
            })
        }

    }

    eks_managed_node_groups = {        
        eks_node_group = {
            node_group_name = var.node_group_name
            desired_capacity = var.desired_capacity
            max_capacity = var.max_size
            min_capacity = var.min_size
            instance_type = var.node_instance_type            
            subnets = var.private_subnets
            tags = {
                Environment = "dev"
            }
        }
    }


    tags = {
        Environment = "dev"
    }    

}

# define node group

resource "aws_iam_role" "eks_node_role" {
  name = var.eks-node-role
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
        {
            Effect = "Allow"
            Principal = {
            Service = "ec2.amazonaws.com"
            }
            Action = "sts:AssumeRole"
        },
        ]
    })
}

# Attach the required policies to the role
resource "aws_iam_role_policy_attachment" "eks_node_AmazonEKSWorkerNodePolicy" {
  role = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy_attachment" "eks_node_AmazonEKS_CNI_Policy" {
  role = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "eks_node_AmazonEC2ContainerRegistryReadOnly" {
    role = aws_iam_role.eks_node_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}
# resource "aws_eks_node_group" "eks_node_groups" {
#   cluster_name = module.eks.cluster_id
#   node_group_name = var.node_group_name
#   node_role_arn = module.eks.node_security_group_arn
#   subnet_ids = data.aws_subnets.private_subnets.ids
#   scaling_config {
#     desired_size = var.desired_capacity
#     max_size = var.max_size
#     min_size = var.min_size
#   }

#   instance_types = [ var.node_instance_type ]
# }