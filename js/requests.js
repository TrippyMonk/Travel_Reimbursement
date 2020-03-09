// class HttpRequests {
//     //HTTP GET Request
//     async get(url){
//        const response = await fetch(url);

//        const resolveData = await response.json();
//        return resolveData;
//    }

//    async post(url, data) {
//        const response = await fetch(url, {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify(data)
//        });

//        const resolveData = await response.json();
//        return resolveData;
//    }

//    async put(url, data) {
//        const response = await fetch(url, {
//            method: 'PUT',
//            headers: {
//                'Content-type': 'application/json'
//            },
//            body: JSON.stringify(data)
//        });

//        const resolveData = await response.json();
//        return resolveData;
//    }

//    async delete(url) {
//        const response = await fetch(url, {
//            method: 'DELETE',
//            headers: {
//                'Content-type': 'application/json'
//            }
//        });

//        const resolveData = await 'Resource Deleted';
//        return resolveData;
//    }
// }