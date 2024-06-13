variable "project_id" {
  type = string
  description = "MongoDB Atlas project ID"
  default = "6659141b3fca7c3744fc6f3f"
}

variable "cluster_name" {
  type = string
  description = "MongoDB Atlas Cluster name"
  default = "my-cluster"
}


variable "cluster_size" {
  type = string
  description = "MongoDB Atlas Cluster size name"
  default = "M0"
}

variable "region" {
  type = string
  description = "MongoDB Atlas Region name"
  default = "US_EAST_1"
}

variable "gcp_project" {
  type = string
  description = "GCP project"
  default = "musicapitest"
}

variable "gcp_region" {
  type = string
  description = "GCP region"
  default = "us-central1"
}

variable "gcp_credentials" {
  type = string
  description = "GCP credentials file"
  default = "musicapitest-cdf49fa3a641.json"
}

variable "docker_image" {
  type = string
  description = "Docker image"
  default = "docker.io/camilopr11/musicapi:prod"
}