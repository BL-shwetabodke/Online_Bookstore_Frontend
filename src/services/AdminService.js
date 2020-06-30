import {post} from "./HttpService";

export default class AdminService {

    addBook(bookData) {
        return (post(bookData, 'admin/book'))
    }

    uploadImage = (formData) => {
        return (post(formData, 'admin/image'))
    }
}
