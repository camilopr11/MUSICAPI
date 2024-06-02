variable "project_id" {}
variable "cluster_name" {}
variable "cluster_size" {}
variable "region" {
  default = "US_EAST_1"
}

terraform {
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
      version = "1.16.2"
    }
  }
}

resource "mongodbatlas_cluster" "cluster" {
  project_id   = var.project_id // Your mongodb atlas project id
  name         = var.cluster_name // Desired cluster name
  cluster_type = "REPLICASET" 

  //Provider Settings "block"
  provider_name               = "TENANT" // Could be GCP | AWS | AZURE
  backing_provider_name = "AWS"
  provider_instance_size_name = var.cluster_size // Could be anything above M2. M0 is not supported via this provider
  provider_region_name        = var.region // Desired region
}

resource "mongodbatlas_project_ip_access_list" "test" {
  project_id = var.project_id
  cidr_block = "0.0.0.0/0"
  comment    = "cidr block for tf acc testing"
}

resource "mongodbatlas_database_user" "test" {
  username           = "admin"
  password           = "admin123"
  project_id         = var.project_id
  auth_database_name = "admin"

  roles {
    role_name     = "readWrite"
    database_name = "dbforApp"
  }

  roles {
    role_name     = "readAnyDatabase"
    database_name = "admin"
  }

  roles {
    role_name     = "atlasAdmin"
    database_name = "admin"
  }

  labels {
    key   = "My Key"
    value = "My Value"
  }

  scopes {
    name   = var.cluster_name
    type = "CLUSTER"
  }
}

resource "mongodbatlas_mongo_database" "musicapi" {
  project_id   = var.project_id
  cluster_name = var.cluster_name
  name         = "musicapi"
}

resource "mongodbatlas_mongo_collection" "artists" {
  project_id   = var.project_id
  cluster_name = var.cluster_name
  database_name = mongodbatlas_mongo_database.musicapi.name
  name         = "artists"
}

resource "mongodbatlas_mongo_collection" "songs" {
  project_id   = var.project_id
  cluster_name = var.cluster_name
  database_name = mongodbatlas_mongo_database.musicapi.name
  name         = "songs"
}

output "mongodb_connection_string_with_credentials" {
  value = "mongodb+srv://admin:admin123@${mongodbatlas_cluster.cluster.connection_strings[0].standard}/musicapi"
}