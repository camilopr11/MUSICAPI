terraform {
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
      version = "1.16.2"
    }
    google = {
      source  = "hashicorp/google"
      version = "5.31.1"
    }
  }
}

provider "mongodbatlas" {
  public_key = "azotuqhq"
  private_key  = "98844281-5e65-47cd-bd9c-79386049255e"
}

module "mongocluster" {
  source        = "./modules/cluster"
  region        = var.region
  cluster_name  = var.cluster_name
  cluster_size  = var.cluster_size
  project_id    = var.project_id
}

provider "google" {
  project     = var.gcp_project
  region      = var.gcp_region
  credentials = file(var.gcp_credentials)
}

module "gcp" {
  source          = "./modules/gcp"
  gcp_project     = var.gcp_project
  gcp_region      = var.gcp_region
  gcp_credentials = var.gcp_credentials
  docker_image    = var.docker_image
  mongodb_connection_string_with_credentials = module.mongocluster.mongodb_connection_string_with_credentials
}