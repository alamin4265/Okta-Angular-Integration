export const environment = {
    production: true,
    baseUrl: location.origin,
    apiUrl: '/api/v1',
    oktaUrl: '/configurations/okta',
    get fullBaseUrl() {
        return this.baseUrl + this.apiUrl;
    },
    get oktaConfigUrl() {
        return this.baseUrl + this.apiUrl + this.oktaUrl;
    }
};
