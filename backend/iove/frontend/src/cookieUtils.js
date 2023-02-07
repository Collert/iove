export function getCookie(name) {
    let cookieValue = null;
    console.log(document.cookie)
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log(cookieValue)
    return cookieValue;
}

export function generatePayload(csrftoken, body=undefined, method='GET') {
    console.log(csrftoken)
    return {
        // credentials: 'include',
        method: method,
        // mode: 'cors',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(body)
    }
}