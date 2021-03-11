const app = new Vue({
    el: "#app",
    data: {
        categories: []
    },
    methods: {},
    computed: {},
    mounted: function ()
    {

        this.$http.get('/layout/head').then(function (response)
        {
            document.querySelector('head').insertAdjacentHTML('afterbegin', response.data)
        })

        this.$http.get('/layout/navbar').then(function (response)
        {
            document.body.insertAdjacentHTML('afterbegin', response.data)
            buildNewBar()
        })

    }
})
