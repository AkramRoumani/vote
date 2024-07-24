provider "azurerm" {
  features {}

  subscription_id = "229dc9f9-5b23-47e2-8853-f099755e0d70"
  client_id       = "b5a09f06-a808-4e6e-9db5-ddabfbe5b1b9"
  client_secret   = "S9D8Q~sXS3m5P7MkXX0W3nQqkgJizq58NF7YzaM3"
  tenant_id       = "f3c594df-ac31-4c6f-9e7a-b84feed3a6e4"
}

resource "azurerm_resource_group" "rg" {
  name     = "aks-resource-group"
  location = "West Europe"
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-cluster"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "aksdns"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}

output "kube_config" {
  value     = azurerm_kubernetes_cluster.aks.kube_config_raw
  sensitive = true
}

