import axios, {
    AxiosError,
    AxiosResponse
} from "../../node_modules/axios/index"

interface IMovie{
    id: number
    title: string
    director: string
    releaseYear: number
    genre: string
    imdbRating: number
    runTime: number
    note: string
}

let baseUrl: string = "https://movie-restful.azurewebsites.net/api/movies";

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        movies: [],
        addData: { title: "", director: "", releaseYear: 0, genre: "", imdbRating: 0, runTime: 0, note: "" },
        addMessage: "",
        updateMessage: "",
        singleMovie: null,
        idToGetBy: -1,
        deleteId: 0,
        deleteMessage: "",
        updateData: { id: 0, title: "", director: "", releaseYear: 0, genre: "", imdbRating: 0, runTime: 0, note: "" }
    },
    methods: {
        getAllMovies(){
            this.helperGetAndShow(baseUrl)
        },
        helperGetAndShow(url: string){
            axios.get<IMovie[]>(url)
            .then((response: AxiosResponse<IMovie[]>) => {
                this.movies = response.data
            })
            .catch((error: AxiosError) => {
                alert(error.message)
            })
        },
        postMovie(){
            axios.post<IMovie>(baseUrl, this.addData)
            .then((response: AxiosResponse) => {
                let message: string = "reponse " + response.status + " " + response.statusText
                this.addMessage = message
            })
            .catch((error: AxiosError) => {
                alert(error.message)
            })
        },
        getById(id: number){
            let url: string = baseUrl + "/" + id
            axios.get<IMovie>(url)
            .then((reponse: AxiosResponse<IMovie>) => {
                this.singleMovie = reponse.data
            })
            .catch ((error: AxiosError) => {
                alert(error.message)
            })
        },
        deleteMovie(deleteId: number){
            let url: string = baseUrl + "/" + deleteId
            axios.delete<void>(url)
            .then ((reponse: AxiosResponse<void>) => {
                this.deleteMessage = reponse.status + " " + reponse.statusText
            })
            .catch((error: AxiosError) => {
                alert(error.message)
            })
        },
        updateMovie(){
            let url: string = baseUrl + "/" + this.updateData.id
            axios.put<IMovie>(url, this.updateData)
            .then((reponse: AxiosResponse) => {
                let message: string = "reponse " + reponse.status + " " + reponse.statusText
                this.updateMessage = message
            })
            .catch((error: AxiosError) => {
                alert(error.message)
            })
        },
        clearAllMovies(){
            this.movies = 0;
            this.singleMovie = 0;
        }
    }
})