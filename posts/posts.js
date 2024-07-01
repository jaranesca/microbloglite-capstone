/* Posts Page JavaScript */

"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}

function logout() {
    const loginData = getLoginData();

    // GET /auth/logout
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using finally() so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/");  // redirect back to landing page
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const loginData = getLoginData();
    const header = new Headers();
    header.append('Accept', 'application/json');
    header.append('Authorization', `Bearer ${loginData.token}`);

    const requestOption = {
        method: "GET",
        headers: header,
        redirect: "follow"
    };

    let carts = document.getElementById("cart");
    fetch(apiBaseURL + '/api/posts', requestOption)
        .then(response => response.json())
        .then(data => {
            let cardsHtml = '';
            for (let i = 0; i < data.length; i++) {
                cardsHtml += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Name: ${data[i].username}</h5>
                            <p class="card-text">Post: ${data[i].text}</p>
                            <p class="card-text"><small class="text-muted">Time: ${new Date(data[i].createdAt).toLocaleString()}</small></p>
                        </div>
                    </div>
                `;
            }
            carts.innerHTML = cardsHtml;
        })
        .catch(error => console.error('Error fetching data:', error));
});
