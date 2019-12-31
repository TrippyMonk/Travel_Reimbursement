const http = new HttpRequests;

http.get(`http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=GA&locality=Chickamauga&postalCode=30707&addressLine=140%20Lillie%20Drive&key=AqKA56HQW8gWImgy0cCgJJVjLOWQrNjs_rjHOXjsnd_50HMFnyhRc6ofiFdY6wvP`)
    .then(data => console.log(data))
    .catch(err => console.log(err));