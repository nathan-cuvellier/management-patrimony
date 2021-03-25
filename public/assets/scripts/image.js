const app = new Vue({
    el: "#app",
    data: {
        images: [],
        place: {}
    },
    methods: {
        sendFiles: function() {
            console.log(document.querySelector('#input-images'))
            let data = new FormData();
            let inputFiles = document.querySelector('#input-images')

            for(const file of inputFiles.files) {
                data.append('files[]', file)
            }

            for (var value of data.values()) {
                console.log(value);
            }

            this.$http.post('/place/image/add', {
                files: data,
                place_id: this.place.id
            }).then(function() {
                //window.location.reload()
            })
        }
    },
    computed: {},
    mounted: function ()
    {
        let urlSplit = window.location.pathname.split('/')
        let idPlace = urlSplit[urlSplit.length-1]

        this.$http.get('/place/image/list/' + idPlace).then(function (response)
        {
            this.images = response.data
        })

        this.$http.get('/place/read/' + idPlace).then(function (response)
        {
            this.place = response.data
        })

        this.$http.get('/layout/head').then(function (response)
        {
            document.querySelector('head').insertAdjacentHTML('afterbegin', response.data)
        })

        this.$http.get('/layout/navbar').then(function (response)
        {
            document.body.insertAdjacentHTML('afterbegin', response.data)
            buildNewBar()
        })

        this.$http.get('/layout/footer').then(function (response)
        {
            document.body.insertAdjacentHTML('beforeend', response.data)
        })

    }
})
