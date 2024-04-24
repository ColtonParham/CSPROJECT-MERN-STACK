var authToken;
function getCookie(name) {
    return (name = (document.cookie + ';').match(new RegExp(name + '=.*;'))) && name[0].split(/=|;/)[1];
}

// Authenticates the user if not authenticated.
async function auth() {
    if (isAuth()) return true;
    console.log("Authenticating")
    try {
        authToken = JSON.parse(await xmlRequest("GET", "refresh"));
        console.log("Authenticated")
    } catch (err) {
        console.log("Failed authentication");
        console.log(err);
        switch (err.status) {
            case 403:
                alert("Token no longer valid. Please logout and log back in");
                break;
            case 401:
                alert("Invalid or missing refresh token. Please logout and log back in")
                break
            default:
                alert("Unknown authentication error. Issue may be resolved by logging out and back in again.");
                console.log(err.response);
        }
    }
}

// Returns if user is currently authenticated
function isAuth() {
    if (authToken == null)  return false;
    if (authToken.exp < Date.now()) return false;
    return true;
}

// Returns the authToken
async function getAuth() {
    if (!isAuth())
        await auth();
    return authToken.accessToken;
}

// Returns a promise that resolves on a successful xml message, while rejecting when any failure occurs
// Will get authToken for the user if needed
async function xmlRequest(method, path, data = null, auth = false, contentType=null) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials=true;
    xhr.open(method, path);
    if (contentType)
        xhr.setRequestHeader("Content-Type", contentType);
    if (auth)
        xhr.setRequestHeader('Authorization', 'Bearer ' + await getAuth());
    return new Promise((resolve, reject) => {
        // Set promise response for when the request is finished
        xhr.onload = function(){
            if (this.status >=200 && this.status < 300) // Check if any errors have occured.
                resolve(xhr.response);
            else {
                reject({
                    "status" : this.status,
                    "statusText" : this.statusText,
                    "response" : this.response,
                });
            }
        }

        // Deal with xhr errors
        xhr.onerror = function () {
            reject({
                "status" : this.status,
                "statusText" : this.statusText
            });
        }

        // Send the request
        if (data == null)
            xhr.send();
        else
            xhr.send(data);
    });
}