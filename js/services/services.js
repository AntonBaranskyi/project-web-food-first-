/*jshint esversion: 11 */
let postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

let getResourse = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url},status:${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getResourse};