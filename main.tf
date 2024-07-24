provider "azurerm" {
  features {}

  subscription_id = "<your-subscription-id>"
  client_id       = "<servicePrincipalId>"
  client_secret   = "<servicePrincipalKey>"
  tenant_id       = "<tenant>"
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

