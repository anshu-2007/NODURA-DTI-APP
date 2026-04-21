targetScope = 'subscriptionLevel'

@description('Name of the resource group')
param resourceGroupName string = 'rg-nodura'

@description('Location for the resources')
param location string = 'eastus'

@description('Name prefix for all resources')
param resourcePrefix string = 'nodura'

@description('Environment name')
param environment string = 'prod'

@description('SKU for Static Web App')
@allowed(['Free', 'Standard'])
param skuName string = 'Free'

var uniqueSuffix = uniqueString(subscription().id, resourceGroupName)
var resourceGroupNameFinal = resourceGroupName
var swaName = '${resourcePrefix}-swa-${environment}-${uniqueSuffix}'

// Create resource group
resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupNameFinal
  location: location
}

// Create Static Web App
module swa 'staticwebapp.bicep' = {
  scope: rg
  name: 'swaDeployment'
  params: {
    name: swaName
    location: location
    skuName: skuName
    appLocation: '/'
    apiLocation: 'api'
    outputLocation: 'out'
  }
}

output swaEndpoint string = swa.outputs.endpoint
output swaId string = swa.outputs.resourceId
output swaName string = swa.outputs.name
