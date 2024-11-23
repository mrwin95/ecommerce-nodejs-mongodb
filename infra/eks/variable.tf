variable "region" {
  
}

variable "cluster_name" {
  
}

variable "node_instance_type" {
  default = "t3.medium"
}

variable "desired_capacity" {
  default = 1
}

variable "max_size" {
  default = 2
}

variable "min_size" {
  default = 1
}

variable "vpc_id" {
  
}

variable "cluster_version" {
  type = string
}

variable "node_group_name" {
  
}

variable "eks-node-role" {
  
}

variable "private_subnets" {
  type = list(string)
}