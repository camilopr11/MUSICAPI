variable "gcp_project" {}
variable "gcp_region" {}
variable "gcp_credentials" {}
variable "docker_image" {}
variable "mongodb_connection_string_with_credentials" {}

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.31.1"
    }
  }
}

resource "google_cloud_run_service" "default" {
  name     = "my-api-service"
  location = var.gcp_region
  template {
    spec {
      containers {
        image = var.docker_image
        env {
          name  = "MONGODB_URI"
          value = var.mongodb_connection_string_with_credentials
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "noauth" {
  service  = google_cloud_run_service.default.name
  location = google_cloud_run_service.default.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "service_url" {
  value = google_cloud_run_service.default.status[0].url
}
