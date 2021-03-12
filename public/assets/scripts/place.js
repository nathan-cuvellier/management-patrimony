const app = new Vue({
    el: "#app",
    data: {
        places: []
    },
    methods: {
        handleRemovePlace: function(event) {
            if(event.target.matches('.remove-place')) {
                let idCat = event.target.parentNode.getAttribute('id')

                this.$http.get('/place/delete/' + idCat).then((response) => {
                    if(response.bodyText !== 'ok') {
                        alert('Error lors de la suppression')
                        return false
                    }

                    event.target.parentNode.remove()
                })
            }

        }
    },
    computed: {},
    mounted: function ()
    {
        this.$http.get('/place/list').then(function (response)
        {
            this.places = response.data
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
