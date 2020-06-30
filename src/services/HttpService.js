import Axios from "axios";
import BASEURL from '../config/urlConstants'

function post(bookData, url) {
    return Axios({
        method: 'post',
        url: `${BASEURL.appUrl}${url}`,
        data: bookData,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}

function get(url) {
    return Axios({
        method: 'get',
        url: `${BASEURL.appUrl}${url}`,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}

function update(url) {
    return Axios({
        method: 'put', //you can set what request you want to be
        url: `${BASEURL.appUrl}${url}`,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}

function deleteData(url) {
    return Axios({
        method: 'delete',
        url: `${BASEURL.appUrl}${url}`,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}

export {post, get, update, deleteData}
