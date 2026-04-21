@description('Name of the Static Web App')
param name string

@description('Location of the resource')
param location string

@description('SKU of the Static Web App')
param skuName string

@description('Application location')
param appLocation string = '/'

@description('API location')
param apiLocation string = ''

@description('Output location')
param outputLocation string = 'out'

resource staticWebApp 'Microsoft.Web/staticSites@2022-09-01' = {
  name: name
  location: location
  sku: {
    name: skuName
    tier: skuName
  }
  properties: {
    provider: 'GitHub'
    repositoryUrl: ''
    branch: 'main'
    buildProperties: {
      appLocation: appLocation
      apiLocation: apiLocation
      outputLocation: outputLocation
    }
  }
}

output endpoint string = 'https://${staticWebApp.properties.defaultHostname}'
output resourceId string = staticWebApp.id
output name string = staticWebApp.name
